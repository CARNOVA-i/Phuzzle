# Phuzzle Rebuild

Phuzzle is a browser puzzle game where you swap tiles to restore the original photo.

## Run locally

Use Python's built-in static server from this project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## GitHub Pages reminder

When deploying to GitHub Pages:

- Use relative asset paths.
- Do not start paths with a leading slash (`/`), or links can break when hosted under a repository subpath.
