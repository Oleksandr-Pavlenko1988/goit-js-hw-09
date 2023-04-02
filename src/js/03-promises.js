import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handlerSubmit);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;  

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, (delayMs += step));
  });
}

function handlerSubmit(e) {
  e.preventDefault();
  delayMs = Number(e.target.delay.value);
  step = Number(e.target.step.value);
  amount = Number(e.target.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayMs)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  e.target.reset();
}
