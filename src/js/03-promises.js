import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', handlerSubmit);

let delayMs = null;
let step = null;
let amount = null;

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
  delayMs = Number(formEl.delay.value);
  step = Number(formEl.step.value);
  amount = Number(formEl.amount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayMs)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
  formEl.reset();
}
