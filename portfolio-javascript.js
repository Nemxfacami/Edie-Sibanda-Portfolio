

const container = document.querySelector('.card-list');
const dots = document.querySelectorAll('.dot');

container.addEventListener('scroll', () => {
  const scrollLeft = container.scrollLeft;
  const cardWidth = container.offsetWidth;

  const index = Math.round(scrollLeft / cardWidth);

  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[index]) {
    dots[index].classList.add('active');
  }
});


const projectContainer = document.querySelector('.scroll-container');
const projectDots = document.querySelectorAll('.project-dot');

projectContainer.addEventListener('scroll', () => {
  const scrollLeft = projectContainer.scrollLeft;
  const cardWidth = projectContainer.offsetWidth;

  const index = Math.round(scrollLeft / cardWidth);

  projectDots.forEach(projectDots => projectDots.classList.remove('active'));
  if (projectDots[index]) {
    projectDots[index].classList.add('active');
  }
});


const writeupContainer = document.querySelector('.writeup-js');
const writedots = document.querySelectorAll('.write-dot');

writeupContainer.addEventListener('scroll', () => {
  const scrollLeft = writeupContainer.scrollLeft;
  const cardWidth = writeupContainer.offsetWidth;

  const index = Math.round(scrollLeft / cardWidth);

  writedots.forEach(writedots => writedots.classList.remove('active'));
  if (writedots[index]) {
    writedots[index].classList.add('active');
  }
});