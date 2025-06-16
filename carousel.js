const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
const slideWidth = slides[0].getBoundingClientRect().width;

let currentIndex = 0;

// Posiciona os slides lado a lado
slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
});

function moveToSlide(track, current, target, index) {
  track.style.transform = `translateX(-${slideWidth * index}px)`; // Uso correto de template string
  current.classList.remove('current-slide');
  target.classList.add('current-slide');
  currentIndex = index; // Atualiza o índice global
}

prevButton.addEventListener('click', () => {
  const currentSlide = slides[currentIndex];
  const prevIndex = currentIndex === 0 ? slides.length - 1 : currentIndex - 1;
  const prevSlide = slides[prevIndex];
  moveToSlide(track, currentSlide, prevSlide, prevIndex);
});

nextButton.addEventListener('click', () => {
  const currentSlide = slides[currentIndex];
  const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
  const nextSlide = slides[nextIndex];
  moveToSlide(track, currentSlide, nextSlide, nextIndex);
});

// Inicializa o primeiro slide como ativo
slides[0].classList.add('current-slide');
track.style.transform = 'translateX(0)';

const toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});
