document.addEventListener('DOMContentLoaded', () => {
  // PRELOADER
  window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      preloader.style.transition = 'opacity 0.5s ease';

      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });

  const sidebar = document.querySelector('.sidebar');
  const menuLinks = document.querySelectorAll('.sidebar-menu a.menu-link');
  const sections = document.querySelectorAll('main section');
  const menuToggle = document.querySelector('.menu-toggle');

  // Scroll suave ao clicar no menu lateral
  menuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (!targetSection) return;

      window.scrollTo({
        top: targetSection.offsetTop - 65, // Offset para header fixo
        behavior: 'smooth',
      });

      // Fechar sidebar no mobile após clique
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('active');
      }
    });
  });

  // Função para detectar qual seção está ativa (visível)
  function activateSectionOnScroll() {
    const scrollPosition = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
      const offsetTop = section.offsetTop - 70;
      const offsetBottom = offsetTop + section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
        section.classList.add('active');
        // Atualiza menu ativo
        menuLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      } else {
        section.classList.remove('active');
      }
    });
  }

  // Inicializa a ativação no scroll
  window.addEventListener('scroll', activateSectionOnScroll);
  activateSectionOnScroll();

  // Expande sidebar ao passar o mouse (desktop)
  sidebar.addEventListener('mouseenter', () => {
    if (window.innerWidth > 768) {
      sidebar.classList.add('expanded');
    }
  });
  sidebar.addEventListener('mouseleave', () => {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('expanded');
    }
  });

  // Toggle sidebar no mobile
  if(menuToggle){
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
    });
  }

  // CARROSSEL DE TESTIMONIALS

  const track = document.querySelector('.carousel-track');
  if (!track) return;

  const slides = Array.from(track.children);
  const prevButton = document.querySelector('.carousel-button.prev');
  const nextButton = document.querySelector('.carousel-button.next');

  // Atualizar slideWidth ao redimensionar
  let slideWidth = slides[0].getBoundingClientRect().width;

  function setSlidePositions() {
    slides.forEach((slide, index) => {
      slide.style.left = slideWidth * index + 'px';
    });
  }
  setSlidePositions();

  window.addEventListener('resize', () => {
    slideWidth = slides[0].getBoundingClientRect().width;
    setSlidePositions();
    moveToSlide(currentIndex); // mantém o slide atual na tela após resize
  });

  let currentIndex = 0;

  function moveToSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    track.style.transform = 'translateX(-' + slides[index].style.left + ')';
    currentIndex = index;
  }

  prevButton.addEventListener('click', () => {
    moveToSlide(currentIndex - 1);
  });

  nextButton.addEventListener('click', () => {
    moveToSlide(currentIndex + 1);
  });

  // -------------------
  // TYPING EFFECT LOOP - DIGITAÇÃO COM APAGAR E REPETIR
  // -------------------

  function typeWriterLoop(element, text, speed = 50, pause = 1000) {
    let i = 0;
    let isDeleting = false;

    function type() {
      if (!isDeleting) {
        element.textContent = text.substring(0, i + 1);
        i++;

        if (i === text.length) {
          setTimeout(() => {
            isDeleting = true;
            type();
          }, pause);
          return;
        }
      } else {
        element.textContent = text.substring(0, i - 1);
        i--;

        if (i === 0) {
          isDeleting = false;
        }
      }
      setTimeout(type, speed);
    }

    type();
  }

  const typingElement = document.getElementById('typing-text');
  const fullText = "Automating today, for a faster tomorrow.";

  if (typingElement) {
    typeWriterLoop(typingElement, fullText, 50, 1000);
  }
});
