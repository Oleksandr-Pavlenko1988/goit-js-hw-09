const refs = {
    body: document.querySelector('body'),
    start: document.querySelector('button[data-start]'),
    stop: document.querySelector('button[data-stop]'),
  };

  refs.start.addEventListener('click', handleStartBtn);
  refs.stop.addEventListener('click', handleStopBtn);

  let intervalId = null;

  function handleStartBtn () {
    refs.start.disabled = true;
      intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
      }, 1000);
  };

  function handleStopBtn () {
      refs.start.disabled = false;
      clearInterval(intervalId);
  };
  
  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, 0)}`;
  }
  
