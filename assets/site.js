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
  const paperDialog = root.querySelector('[data-agentic-paper-dialog]');
  const dialogClose = root.querySelector('[data-agentic-dialog-close]');
  const dialogTags = root.querySelector('[data-agentic-dialog-tags]');
  const dialogYear = root.querySelector('[data-agentic-dialog-year]');
  const dialogTitle = root.querySelector('[data-agentic-dialog-title]');
  const dialogAuthors = root.querySelector('[data-agentic-dialog-authors]');
  const dialogAbstract = root.querySelector('[data-agentic-dialog-abstract]');
  const dialogLink = root.querySelector('[data-agentic-dialog-link]');
  let lastDialogTrigger = null;

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

  if (paperDialog && typeof paperDialog.showModal === 'function') {
    papers.forEach((paper) => {
      const heading = paper.querySelector('h3');
      const tags = paper.querySelector('.agentic-paper-tags');
      const year = paper.querySelector('.agentic-paper-year');
      const authors = paper.querySelector('.agentic-authors');
      const abstract = paper.querySelector('.agentic-abstract');
      const link = paper.querySelector('.agentic-paper-link');
      if (!heading || !authors || !abstract || !link) return;

      const title = heading.textContent.trim();
      const trigger = document.createElement('button');
      trigger.className = 'agentic-paper-title-trigger';
      trigger.type = 'button';
      trigger.setAttribute('aria-haspopup', 'dialog');
      trigger.setAttribute('aria-label', `Open details for ${title}`);
      trigger.textContent = title;
      heading.textContent = '';
      heading.append(trigger);

      trigger.addEventListener('click', () => {
        lastDialogTrigger = trigger;
        dialogTags.innerHTML = tags ? tags.innerHTML : '';
        dialogYear.textContent = year ? year.textContent : '';
        dialogTitle.textContent = title;
        dialogAuthors.innerHTML = authors.innerHTML;
        dialogAbstract.textContent = abstract.textContent;
        dialogLink.href = link.href;
        document.documentElement.classList.add('agentic-dialog-open');
        paperDialog.showModal();
      });
    });

    dialogClose.addEventListener('click', () => paperDialog.close());
    paperDialog.addEventListener('click', (event) => {
      if (event.target === paperDialog) paperDialog.close();
    });
    paperDialog.addEventListener('close', () => {
      document.documentElement.classList.remove('agentic-dialog-open');
      if (lastDialogTrigger) lastDialogTrigger.focus({ preventScroll: true });
    });
    root.classList.add('agentic-modal-ready');
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
