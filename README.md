# Zixing Lei — Personal Research Website

A static research website hosted with GitHub Pages. The homepage focuses on three research directions: Recursive Self-Improvement (RSI), Reinforcement Learning (RL), and Embodied AI.

## Local preview

Run a static server from the repository root:

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000/`.

## Structure

- `index.html` — homepage content and publication metadata
- `assets/site.css` — responsive visual design
- `assets/site.js` — publication tag filtering
- `.github/workflows/pages.yml` — GitHub Pages deployment
- Legacy `publication/`, `post/`, and `talk/` pages are retained for backward-compatible links.

## Updating publications

Add or edit an `<article class="agentic-paper">` block in `index.html`. Use a comma-separated `data-agentic-tags` value containing one or more of:

- `RSI`
- `RL`
- `Embodied AI`

Keep the visible tag elements in sync with `data-agentic-tags` so filtering and labels agree.

## Deployment

Pushing to `main` triggers the GitHub Pages workflow. The repository’s Pages source must be set to **GitHub Actions** in GitHub settings.
