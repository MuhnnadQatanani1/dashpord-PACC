export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.7 Tahoma, 'Segoe UI', Arial, sans-serif; background: #ffffff; color: #1b2430; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; background: #fbf8f1; border: 1px solid #e6d3ac; border-right: 6px solid #132f56; border-radius: 10px; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; color: #132f56; }
      p { color: #7a6a4a; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #132f56; color: #fff; }
      .primary:hover { background: #0c2038; }
      .secondary { background: #c5a06c; color: #132f56; border-color: #c5a06c; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
