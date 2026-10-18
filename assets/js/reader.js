
(() => {
  const pages = [...document.querySelectorAll('.page')];
  const previous = document.getElementById('prev');
  const next = document.getElementById('next');
  const count = document.getElementById('count');
  let current = 0;
  function showPage(index) {
    current = Math.max(0, Math.min(index, pages.length - 1));
    pages.forEach((page,i) => { page.hidden = i !== current; });
    previous.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    count.textContent = `Page ${current + 1} of ${pages.length}`;
    document.getElementById('reader').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'});
  }
  previous.addEventListener('click', () => showPage(current - 1));
  next.addEventListener('click', () => showPage(current + 1));
  document.addEventListener('keydown', e => {
    if (e.altKey && !e.ctrlKey && !e.metaKey && e.key.toLowerCase() === 'w') {
      e.preventDefault();
      document.getElementById('reader').scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    if (['INPUT','TEXTAREA','BUTTON'].includes(document.activeElement.tagName)) return;
    if (e.key === 'ArrowRight' && current < pages.length - 1) showPage(current + 1);
    if (e.key === 'ArrowLeft' && current > 0) showPage(current - 1);
  });
})();
