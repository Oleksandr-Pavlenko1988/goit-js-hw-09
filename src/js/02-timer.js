import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectDate = null;
let timerID = null;
let timeMS = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectDate = selectedDates[0];
    checkValidDate();
  },
};

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

refs.startBtn.addEventListener('click', startTimer);

flatpickr('#datetime-picker', options);

function checkValidDate() {
  const currentData = Date.now();
  if (selectDate > currentData) {
    refs.startBtn.disabled = false;
  } else {
    refs.startBtn.disabled = true;
    Notify.failure('Please choose a date in the future');
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function startTimer() {
  if (timerID === null) {
    timerID = setInterval(timerHandler, 1000);
    refs.startBtn.textContent = 'Stop';
  } else {
    clearInterval(timerID);
    timerID = null;
    refs.startBtn.textContent = 'Start';
  }
}

function timerHandler() {
  timeMS = selectDate - Date.now();
  if (timeMS <= 0) {
    clearInterval(timerID);
    timerID = null;
    refs.startBtn.disabled = true;
    refs.startBtn.textContent = 'Start';
    return;
  }
  timeRender();
}

function timeRender () {
  const timer = convertMs(timeMS);
  refs.days.textContent = addLeadingZero(timer.days);
  refs.hours.textContent = addLeadingZero(timer.hours);
  refs.minutes.textContent = addLeadingZero(timer.minutes);
  refs.seconds.textContent = addLeadingZero(timer.seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
