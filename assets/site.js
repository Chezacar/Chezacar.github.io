(() => {
  const root = document.getElementById('zixing-agentic-research');
  if (!root) return;
  const filters = root.querySelectorAll('[data-agentic-filter]');
  const papers = root.querySelectorAll('[data-agentic-tags]');
  const latestPapers = root.querySelectorAll('.agentic-latest-grid [data-agentic-tags]');
  const morePapers = root.querySelectorAll('[data-agentic-more-panel] [data-agentic-tags]');
  const count = root.querySelector('[data-agentic-count]');
  const more = root.querySelector('[data-agentic-more]');
  const moreToggle = root.querySelector('[data-agentic-more-toggle]');
  const morePanel = root.querySelector('[data-agentic-more-panel]');
  const moreLabel = root.querySelector('[data-agentic-more-label]');
  const moreCount = root.querySelector('[data-agentic-more-count]');

  const publicationLabel = (value) => `${value} publication${value === 1 ? '' : 's'}`;

  const setMoreOpen = (open) => {
    if (!moreToggle || !morePanel) return;
    moreToggle.setAttribute('aria-expanded', String(open));
    morePanel.hidden = !open;
    if (moreLabel) moreLabel.textContent = open ? 'Hide additional research' : 'More research';
  };

  if (moreToggle) {
    moreToggle.addEventListener('click', () => {
      setMoreOpen(moreToggle.getAttribute('aria-expanded') !== 'true');
    });
  }

  filters.forEach((filter) => {
    filter.addEventListener('click', () => {
      const selected = filter.dataset.agenticFilter;
      let visible = 0;

      filters.forEach((item) => item.setAttribute('aria-pressed', String(item === filter)));
      papers.forEach((paper) => {
        const tags = paper.dataset.agenticTags.split(',');
        const show = selected === 'all' || tags.includes(selected);
        paper.hidden = !show;
        if (show) visible += 1;
      });

      const visibleLatest = [...latestPapers].filter((paper) => !paper.hidden).length;
      const visibleMore = [...morePapers].filter((paper) => !paper.hidden).length;

      count.textContent = selected === 'all'
        ? `${visibleLatest} latest · ${visible} total`
        : publicationLabel(visible);
      if (moreCount) moreCount.textContent = publicationLabel(visibleMore);
      if (more) more.hidden = visibleMore === 0;
      setMoreOpen(selected !== 'all' && visibleMore > 0);
      root.querySelector('#agentic-publications').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
