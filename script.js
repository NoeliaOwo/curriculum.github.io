document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetElement = document.querySelector(this.getAttribute('href'));
    const targetPosition = targetElement.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 400; // Duración en milisegundos (2 segundos)
    let start = null;

    window.requestAnimationFrame(function step(timestamp) {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const progressPercentage = Math.min(progress / duration, 1);
      window.scrollTo(0, startPosition + distance * progressPercentage);
      if (progress < duration) {
        window.requestAnimationFrame(step);
      }
    });
  });
});

(function() {

    'use strict';
  
    // define variables
    var items = document.querySelectorAll(".timeline li");
  
    // check if an element is in viewport
    // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }
  
    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  
  })();
  

  const track = document.querySelector('.carousel__track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel__button--right');
  const prevButton = document.querySelector('.carousel__button--left');
  const slideWidth = slides[0].getBoundingClientRect().width;
  
  let currentIndex = 0;
  
  // Coloca cada slide al lado del anterior
  const setSlidePosition = (slide, index) => {
      slide.style.left = slideWidth * index + 'px';
  }
  
  slides.forEach(setSlidePosition);
  
  // Mueve a la siguiente slide
  const moveToSlide = (track, currentSlide, targetSlide) => {
      track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
      currentIndex = slides.indexOf(targetSlide);
  }
  
  // Maneja el botón siguiente
  nextButton.addEventListener('click', () => {
      const currentSlide = slides[currentIndex];
      const nextSlide = slides[(currentIndex + 1) % slides.length];
      moveToSlide(track, currentSlide, nextSlide);
  });
  
  // Maneja el botón anterior
  prevButton.addEventListener('click', () => {
      const currentSlide = slides[currentIndex];
      const prevSlide = slides[(currentIndex - 1 + slides.length) % slides.length];
      moveToSlide(track, currentSlide, prevSlide);
  });
  