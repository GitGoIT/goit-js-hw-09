import Notiflix from 'notiflix';

const delay = document.querySelector('input[name="delay"]') // отримуємо доступ до поля First delay
const step = document.querySelector('input[name="step"]') // отримуємо доступ до поля Delay step
const amount = document.querySelector('input[name="amount"]') // отримуємо доступ до поля Amount
const createBtn = document.querySelector('button[type="submit"]') // отримуємо доступ до кнопки Create promises


function createPromise(position, delay) {
   const promise = new Promise((resolve, reject) => {   // рефактиримо функцію, створюємо новий проміс
    setTimeout(() => {                                  // додаємо таймер
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({ position, delay });                       // доповнюємо статичним методом resolve
  } else {
    reject({ position, delay });                        // доповнюємо статичним методом reject
  }
}, delay);
  });
  return promise;                                        // повертаємо результат
}


function onClickCreate(evt) { // функція обробки кліка на кнопку Create promises
      evt.preventDefault();   // знімаємо перезавантаження сторінки при роботі з формою
      let firstDelay = Number(delay.value);     //змінна для введеного значення в First delay передана числом
      let delayStep = Number(step.value);       //змінна для введеного значення в Delay step передана числом
  for (let i = 0; i < amount.value; i++) {      // перебираємо порядок
    createPromise(1 + i, firstDelay + i * delayStep) // передаємо аргументи порядку в position та delay
      .then(({ position, delay }) => {       // виводимо результат обробки
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {     // ловимо помилку та виводимо результат обробки
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
};

createBtn.addEventListener('click', onClickCreate); // слухач для кнопки Create promises
