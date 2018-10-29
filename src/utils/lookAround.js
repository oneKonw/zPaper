let timerLookAround = setInterval(null, null);

function myLookAround(view, flags) {
  console.log('时间1', timerLookAround);
  if (flags) {
    timerLookAround = setInterval(() => {
      const camera = view.camera.clone();
      camera.heading += 1;
      view.goTo(camera);
    }, 100);
  } else {
    console.log('时间2', timerLookAround);
    clearInterval(timerLookAround);
  }
}

export { myLookAround };
