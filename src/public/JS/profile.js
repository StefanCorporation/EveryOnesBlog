document.documentElement.classList.add('js-profile-loading'); // сразу скрываем

document.addEventListener("DOMContentLoaded", () => {
  const bannerImg = document.querySelector('.card-img-bottom');
  if (!bannerImg) {
    document.documentElement.classList.remove('js-profile-loading');
    return;
  }

  const avatarCard = document.querySelector('.card.mx-auto');
  const profileRow = document.querySelector('.container .row');
  const oldBannerContainer = document.querySelector('.col-8 .card.mb-3');

  // Защита от повторного запуска
  if (document.querySelector('.universal-banner-wrapper')) {
    document.documentElement.classList.remove('js-profile-loading');
    return;
  }



  // Создаём новый баннер
  const bannerWrapper = document.createElement('div');
  bannerWrapper.className = 'universal-banner-wrapper';

  const blurLayer = document.createElement('div');
  blurLayer.className = 'universal-banner-blur';
  blurLayer.style.backgroundImage = `url(${bannerImg.src})`;

  const mainLayer = document.createElement('div');
  mainLayer.className = 'universal-banner';
  mainLayer.style.backgroundImage = `url(${bannerImg.src})`;

  bannerWrapper.appendChild(blurLayer);
  bannerWrapper.appendChild(mainLayer);
  profileRow.parentNode.insertBefore(bannerWrapper, profileRow);

  // Делаем аватарку плавающей
  avatarCard.classList.add('universal-avatar-floating');

  
  document.documentElement.classList.remove('js-profile-loading');
  document.documentElement.classList.add('js-profile-ready');

  // === АНИМАЦИИ (теперь без мигания!) ===
  gsap.fromTo(bannerWrapper, 
    { y: -540, opacity: 0 },
    { y: 0, opacity: 1, duration: 2.5, ease: "power3.out" }
  );

  gsap.fromTo(avatarCard, 
    { y: 160, opacity: 0, scale: 0.8 },
    { y: 0, opacity: 1, scale: 1, duration: 1.2, delay: 0.4, ease: "back.out(1.7)" }
  );

  // Параллакс
  gsap.to(blurLayer, { yPercent: 40, ease: "none", scrollTrigger: { trigger: bannerWrapper, start: "top top", end: "bottom top", scrub: 1.3 } });
  gsap.to(mainLayer,  { yPercent: 18, ease: "none", scrollTrigger: { trigger: bannerWrapper, start: "top top", end: "bottom top", scrub: 1 } });
});

