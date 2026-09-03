const tabs = document.querySelectorAll('.method-tab');
const panels = document.querySelectorAll('.method-panel');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    tabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('active', selected);
      item.setAttribute('aria-selected', String(selected));
    });
    panels.forEach((panel) => {
      const selected = panel.dataset.panel === target;
      panel.classList.toggle('active', selected);
      panel.hidden = !selected;
    });
  });
});

const video = document.querySelector('#demo-video');
const videoTitle = document.querySelector('#demo-title');
const videoIndex = document.querySelector('#demo-index');
const videoOptions = document.querySelectorAll('.video-option');

videoOptions.forEach((option) => {
  option.addEventListener('click', () => {
    if (option.classList.contains('active')) return;
    video.pause();
    video.src = option.dataset.video;
    video.poster = option.dataset.poster;
    videoTitle.textContent = option.dataset.title;
    videoIndex.textContent = option.dataset.index;
    videoOptions.forEach((item) => item.classList.toggle('active', item === option));
    video.load();
    video.play().catch(() => {});
  });
});

const copyButton = document.querySelector('#copy-citation');
copyButton.addEventListener('click', async () => {
  const text = document.querySelector('#citation-code').textContent;
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = 'Copied';
    window.setTimeout(() => { copyButton.textContent = 'Copy citation'; }, 1800);
  } catch {
    copyButton.textContent = 'Select & copy';
  }
});

const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach((el) => observer.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('visible'));
}
