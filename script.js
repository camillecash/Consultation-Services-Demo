const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.site-nav');

menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('open', !open);
});

nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuButton?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}));

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 }) : null;

document.querySelectorAll('.reveal').forEach(el => observer ? observer.observe(el) : el.classList.add('visible'));

document.querySelector('#consult-form')?.addEventListener('submit', event => {
  event.preventDefault();
  const note = document.querySelector('#form-note');
  note.textContent = 'Thanks — this demo is working! Connect the final form to Kenneth’s calendar or CRM to receive requests.';
  note.classList.add('success');
});

document.querySelectorAll('.fake-play').forEach(button => button.addEventListener('click', () => {
  const wasPlaying = button.classList.toggle('playing');
  button.innerHTML = wasPlaying ? '<i>■</i> Topic preview coming soon' : '<i>▶</i> Preview topic';
}));

const marqueeTrack = document.querySelector('.podcast-marquee-track');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (marqueeTrack && !reduceMotion.matches) {
  let offset = 0;
  let previousTime;
  const speed = 42;

  const moveMarquee = time => {
    if (previousTime === undefined) previousTime = time;
    const elapsed = Math.min(time - previousTime, 50);
    previousTime = time;
    offset -= speed * elapsed / 1000;

    const firstGroup = marqueeTrack.firstElementChild;
    const groupWidth = firstGroup.getBoundingClientRect().width;

    if (-offset >= groupWidth) {
      offset += groupWidth;
      marqueeTrack.append(firstGroup);
    }

    marqueeTrack.style.transform = `translate3d(${offset}px, 0, 0)`;
    requestAnimationFrame(moveMarquee);
  };

  document.addEventListener('visibilitychange', () => {
    previousTime = undefined;
  });

  requestAnimationFrame(moveMarquee);
}
