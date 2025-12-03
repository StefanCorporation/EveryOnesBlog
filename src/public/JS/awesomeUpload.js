// Elements
const btn = document.getElementById('btn');
const input = document.getElementById('fileInput');
const previewWrap = document.getElementById('preview');
const previewImg = document.getElementById('previewImg');
const bars = btn.querySelectorAll('.glitch-bar');

// GSAP timelines
const hoverTl = gsap.timeline({ paused:true });
// slight organic sway + raise
hoverTl.to(btn, { y: -6, duration: 0.45, ease: "power2.out" }, 0);
hoverTl.to(btn, { rotation: 0.6, duration: 0.6, ease: "sine.inOut" }, 0);
// subtle scale pulse
hoverTl.to(btn, { scale: 1.01, duration: 0.6, ease: "sine.inOut" }, 0);

// continuous micro-sway on hover using repeat yoyo
const sway = gsap.to(btn, { rotation: 0.6, duration: 1.8, ease: "sine.inOut", repeat: -1, yoyo: true, paused: true });

// glitch bars master timeline (plays when hover or click)
function playGlitchOnce(){
// randomize positions & opacities a bit for organic result
bars.forEach((b,i) => {
    gsap.set(b, { opacity: 0.0, y: gsap.utils.random(-6,6) });
});

const tl = gsap.timeline();
// small flickers, translate & fade
tl.to(bars[0], { x: '8%', opacity: 0.08, duration: 0.12, ease: "circ.out" }, 0);
tl.to(bars[1], { x: '-6%', opacity: 0.12, duration: 0.08 }, 0.03);
tl.to(bars[2], { x: '-10%', opacity: 0.06, duration: 0.14 }, 0.06);
tl.to(bars, { y: '+=3', duration: 0.9, ease: "sine.inOut" }, 0);
tl.to(bars, { opacity: 0, duration: 0.8, delay: 0.12 }, 0.25);
}

// on hover in
btn.addEventListener('mouseenter', e => {
hoverTl.play();
sway.play();
// gentle shimmering glitch
bars.forEach((b,i) => {
    gsap.to(b, { opacity: gsap.utils.random(0.02,0.07), duration: gsap.utils.random(0.2,0.5), yoyo:true, repeat:-1, ease: "sine.inOut" });
});
});

// on hover out
btn.addEventListener('mouseleave', e => {
hoverTl.reverse();
sway.pause();
// fade bars out
gsap.to(bars, { opacity:0, x:0, duration:0.4, ease:"power1.out" });
});

// keyboard accessibility (enter/space activates)
btn.addEventListener('keydown', e => {
if(e.key === 'Enter' || e.key === ' '){
    e.preventDefault();
    input.click();
    playGlitchOnce();
}
});

// click opens file chooser (and plays bigger glitch)
btn.addEventListener('click', () => {
input.click();
// more pronounced glitch on click
playGlitchOnce();
gsap.fromTo(btn, { scale: 1.02 }, { scale: 0.995, duration: 0.12, yoyo:true, repeat:1, ease:"power1.inOut" });
});

// file chosen -> preview
input.addEventListener('change', e => {
const file = input.files && input.files[0];
if(!file) return;

const maxMB = 5;
if(file.size > maxMB * 1024 * 1024){
    alert('File too large. Max ' + maxMB + 'MB.');
    input.value = '';
    return;
}

const url = URL.createObjectURL(file);
previewImg.src = url;
previewWrap.style.display = 'block';

// a tiny celebratory animation
gsap.fromTo(previewWrap, { y: 8, opacity: 0 }, { y:0, opacity:1, duration:0.5, ease:"power2.out" });
// play micro-glitch
playGlitchOnce();
});

// optional: clear preview on double-click
previewWrap.addEventListener('dblclick', () => {
previewImg.src = '';
previewWrap.style.display = 'none';
input.value = '';
gsap.to(btn, { scale:1, duration:0.2 });
});

// small idle flicker of button meta for atmosphere
gsap.to('.meta', { opacity: 0.55, duration: 1.8, repeat:-1, yoyo:true, ease:"sine.inOut" });
