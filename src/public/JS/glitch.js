gsap.registerPlugin(ScrambleTextPlugin);


document.querySelectorAll(".glitchText").forEach((el, i) => {
  gsap.to(el, {
    duration: 1,
    scrambleText: {
      text: el.dataset.target || el.innerText, 
      chars: "01ABCD!@#",
      revealDelay: 0.2 + i*0.1, 
      speed: 0.2
    },
    ease: "none"
  });
});