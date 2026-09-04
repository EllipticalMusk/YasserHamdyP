const navButton = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav nav');
navButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navButton.setAttribute('aria-expanded', open);
});

const filterButtons = document.querySelectorAll('.filters button');
const projects = document.querySelectorAll('.project');
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  projects.forEach(project => project.classList.toggle('hidden', button.dataset.filter !== 'all' && project.dataset.category !== button.dataset.filter));
}));

const modal = document.querySelector('#caseModal');
projects.forEach(project => project.addEventListener('click', () => {
  modal.querySelector('h2').textContent = project.dataset.title;
  modal.querySelector('strong').textContent = project.dataset.result;
  modal.querySelector('p').textContent = project.dataset.description;
  modal.showModal();
}));
modal.querySelector('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => { if (event.target === modal) modal.close(); });

const metrics = document.querySelector('.metrics');
let counted = false;
const observer = new IntersectionObserver(entries => {
  if (!entries[0].isIntersecting || counted) return;
  counted = true;
  document.querySelectorAll('[data-count]').forEach(el => {
    const end = Number(el.dataset.count); const start = performance.now();
    const tick = now => { const p = Math.min((now - start) / 1200, 1); const value = end * (1 - Math.pow(1 - p, 3)); el.textContent = (end % 1 ? value.toFixed(1) : Math.floor(value)) + el.dataset.suffix; if (p < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
}, {threshold:.45});
observer.observe(metrics);
