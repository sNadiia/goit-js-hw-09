import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.getElementById('datetime-picker'),
  start: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

let timerId = 0;
let selectedDate;
let timeDifMs;
refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    const currentDate = options.defaultDate.getTime();
    selectedDate = selectedDates[0].getTime();

    if (currentDate > selectedDate) {
      alert('Please choose a date in the future');
    }
    if (currentDate < selectedDate) {
      refs.start.disabled = false;
      return selectedDate;
    }
  },
};

flatpickr(refs.input, options);

const onClickBtn = () => {
  refs.start.disabled = true;
  timerId = setInterval(timerRender, 1000);
};

refs.start.addEventListener('click', onClickBtn);

function timerRender() {
  const currentDate = new Date().getTime();
  timeDifMs = selectedDate - currentDate;
  if (timeDifMs <= '0') {
    clearInterval(timerId);
    refs.start.disabled = false;
  } else {
    timeRender(convertMs(timeDifMs));
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

function timeRender({ days, hours, minutes, seconds }) {
  refs.days.textContent =  addLeadingZero(days);
  refs.hours.textContent =  addLeadingZero(hours);
  refs.minutes.textContent =  addLeadingZero(minutes);
  refs.seconds.textContent =  addLeadingZero(seconds);
}


function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
