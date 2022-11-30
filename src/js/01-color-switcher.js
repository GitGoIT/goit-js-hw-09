

const startBtn = document.querySelector('button[data-start]') // отримуємо доступ до кнопки Start
const stopBtn = document.querySelector('button[data-stop]') // отримуємо доступ до кнопки Stop
let timerId = null; // оголошуємо змінну таймера

function getRandomHexColor() { // функція генерування випадкового кольору (з ДЗ)
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function colorChange() { // функція прив'язки беграундколору до випадкової генерації
    document.body.style.backgroundColor = getRandomHexColor()
}

function onClickStart(evt) { // функція обробки кліка на кнопку Start
    timerId = setInterval(colorChange, 1000); // встановлюємо інтервал з повторенням в 1с
    startBtn.setAttribute('disabled', true); // блокуємо кнопку Stop
    stopBtn.removeAttribute('disabled'); // знімаємо блок попередньо встановлений в html
}

function onClickStop(evt) { // функція обробки кліка на кнопку Stop
    clearInterval(timerId); // прибираємо інтервал повторення
    startBtn.removeAttribute('disabled'); // знімаємо з кнопки Start блок 
    stopBtn.setAttribute('disabled', true); // блокуємо кнопку Stop
}

startBtn.addEventListener('click', onClickStart); // слухач для Start
stopBtn.addEventListener('click', onClickStop); // слухач для Stop