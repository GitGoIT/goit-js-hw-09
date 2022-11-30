import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';


const startBtn = document.querySelector('button[data-start]') // отримуємо доступ до кнопки Start
const dataDays = document.querySelector('span[data-days]') // отримуємо доступ до лычильника днів
const dataHours = document.querySelector('span[data-hours]') // отримуємо доступ до лычильника годин
const dataMinutes = document.querySelector('span[data-minutes]') // отримуємо доступ до лычильника хвилин
const dataSeconds = document.querySelector('span[data-seconds]') // отримуємо доступ до лычильника секунд
const text = document.querySelector('#datetime-picker')


const options = { // налаштування бібліотеки flatpickr
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) { // встановлюємо умову вибрана дата повинна бути пізніше поточної
      Notiflix.Notify.failure('Please choose a date in the future'); // ініціалізуємо нотифікацію бібліотеки notiflix
      startBtn.disabled = true; // блокуємо кнопку в разі вибору невірної дати, встановлюємо disabled в HTML 
    } else {
      startBtn.disabled = false; // розблоковуємо кнопку в разі вибору вірної дати 
    }
  },
};


flatpickr(text, options) //ініцілізація бібліотеки на input


const timer = {
    isActive: false, // (опціонально) встановлюємо значення по замовчуванню, виключаємо можливість повторного запуску таймера
    start() {        // (опціонально) робимо перевірку, якщо таймер включений тоді return, якщо виключений тоді код продовжується, можна замінити блокуванням кнопки startBtn
        if (this.isActive) {
            return
        };
        const setTime = new Date(text.value); // встановлюэмо обраний час
        this.isActive = true;

        setInterval(() => { // запускаємо інтервал таймера
            const currentTime = Date.now(); // встановлюємо поточний час
            const deltaTime = setTime - currentTime; // отримаємо різницю між поточним та встановленим часом
            if (deltaTime >= 0) { // встановлюємо умову роботи таймера в діапазоні дати більше 0
            const timeObject = convertMs(deltaTime); // деструктуризуємо, передаємо в функцію к-сть мілісекунд яка конвертує їх у формат
            dataDays.textContent = addLeadingZero(timeObject.days); // пушимо в лічильник, огортаємо в padStart щоб отримати 2-х значний формат
            dataHours.textContent = addLeadingZero(timeObject.hours); // пушимо в лічильник, огортаємо в padStart щоб отримати 2-х значний формат
            dataMinutes.textContent = addLeadingZero(timeObject.minutes); // пушимо в лічильник, огортаємо в padStart щоб отримати 2-х значний формат
            dataSeconds.textContent = addLeadingZero(timeObject.seconds);// пушимо в лічильник, огортаємо в padStart щоб отримати 2-х значний формат
            } else {
            clearInterval(timer); // зупиняємо таймер коли він доходить до 0
            }
        }, 1000);      
    }
}


function onClickStart(evt) { // функція обробки кліка на кнопку Start
    timer.start(); // запускаємо таймер
    startBtn.setAttribute('disabled', true); // блокуємо кнопку Stop щоб виключити повторний запуск таймера
}


startBtn.addEventListener('click', onClickStart); // слухач для Start



function addLeadingZero(value) {   // метод що додає на початку строки до двух символів '0'
    return String(value).padStart(2, '0');
}

function convertMs(ms) {  // функція що конвертує к-сть мілісекунд в формат дати XX:XX:XX;XX
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = (Math.floor(ms / day)); // огортаємо в pad щоб отримати 2-х значний формат
  // Remaining hours
  const hours = (Math.floor((ms % day) / hour)); // огортаємо в pad щоб отримати 2-х значний формат
  // Remaining minutes
  const minutes = (Math.floor(((ms % day) % hour) / minute)); // огортаємо в pad щоб отримати 2-х значний формат
  // Remaining seconds
  const seconds = (Math.floor((((ms % day) % hour) % minute) / second)); // огортаємо в pad щоб отримати 2-х значний формат

  return { days, hours, minutes, seconds }; // повертаємо результат функції
}