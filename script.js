(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');
    const menuItems = menu.querySelectorAll('a');

    // Toggle the menu when clicking the menu toggle button
    menuToggle.addEventListener('click', function () {
      menu.classList.toggle('open');
    });

    // Close the menu when any menu item is clicked
    menuItems.forEach(function (item) {
      item.addEventListener('click', function () {
        menu.classList.remove('open');
      });
    });
  });

  // Smooth scrolling functionality for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // Prevent the default anchor action

      const targetElement = document.querySelector(this.getAttribute('href'));
      const headerHeight = document.querySelector('header').offsetHeight; // Ajusta el selector según tu encabezado
      const targetPosition = targetElement.offsetTop - headerHeight;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 400; // Duration in milliseconds (2 seconds)
      let startTime = null; // Ensure to use a unique name for the start variable

      window.requestAnimationFrame(function step(timestamp) {
        if (!startTime) startTime = timestamp; // Initialize the start time
        const progress = timestamp - startTime;
        const progressPercentage = Math.min(progress / duration, 1);
        window.scrollTo(0, startPosition + distance * progressPercentage);

        // Keep animating until the duration is met
        if (progress < duration) {
          window.requestAnimationFrame(step);
        }
      });
    });
  });
})();




(function () {

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


const track = document.querySelector('.carouselTrack');
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

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Animar las barras de progreso
      const progressBars = entry.target.querySelectorAll('.progress');
      progressBars.forEach(bar => {
        const percentage = bar.getAttribute('data-percentage');
        bar.style.width = percentage + '%';
      });
    }
  });
}, {
  threshold: 0.1
});

// Observar todas las secciones
document.querySelectorAll('.skills-section').forEach(section => {
  observer.observe(section);
});


document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  // Reemplaza con tus credenciales de EmailJS
  const serviceID = "service_4qg18tj";
  const templateID = "template_952udl7";
  const userID = "5v2HyQ_2TvaYr7Fsy";

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita que se recargue la página

    // Muestra el indicador de carga
    const loadingIndicator = contactForm.querySelector(".loading");
    loadingIndicator.style.display = "inline-block";

    // Obtén los valores del formulario
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
      // Llama a EmailJS para enviar el correo
      const response = await emailjs.send(serviceID, templateID, {
        email: email,
        message: message,
      }, userID);

      // Muestra un mensaje de éxito
      formMessage.textContent = "¡Mensaje enviado con éxito!";
      formMessage.style.color = "green";
      contactForm.reset();
    } catch (error) {
      // Muestra un mensaje de error
      formMessage.textContent = "Hubo un error al enviar el mensaje. Por favor, inténtalo nuevamente.";
      formMessage.style.color = "red";
      console.error("Error al enviar el mensaje:", error);
    } finally {
      // Oculta el indicador de carga
      loadingIndicator.style.display = "none";
    }
  });
});



