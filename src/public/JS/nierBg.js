const vantaEffect = VANTA.BIRDS({
  el: "html",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 1000.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 10.00,
  backgroundColor: 0xa79e8d,
  color1: 0xa23838,
  color2: 0xffffff,
  colorMode: "lerp"
})


// === FIX: Обновление высоты ===
function resizeVanta() {
  if (vantaEffect && vantaEffect.resize) {
    vantaEffect.resize();
  }
}

window.addEventListener("resize", resizeVanta);
window.addEventListener("scroll", resizeVanta);

// Первый вызов
setTimeout(resizeVanta, 500);


