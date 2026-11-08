# AR Flight Studios — Pages CMS Upgrade

This is a **CMS-enabled replacement package** for the existing `ifamericadosul/ar-flight-studios` GitHub Pages site (branch `main`).

It adds Pages CMS configuration and moves editable website content into JSON files. The website fetches those JSON files at runtime, so edits saved by Pages CMS appear on the live site after GitHub Pages finishes deploying.

## Important: upload this as an upgrade, not as a nested folder

1. Download and extract this ZIP.
2. Open your existing GitHub repository: https://github.com/ifamericadosul/ar-flight-studios
3. Confirm branch `main`.
4. Upload the **contents** of this extracted folder into the repository root (not the enclosing folder).
5. Allow GitHub to replace `index.html`, `styles.css`, and `script.js`, and add `.pages.yml`, `content/`, and `media/`.
6. Commit the changes to `main`.
7. Wait for the GitHub Pages deployment to finish.

The upgrade does not require GitHub Pro. Keep a copy of your current repository first if you want an easy rollback.

## Open the CMS

1. Visit https://app.pagescms.org/
2. Sign in with the GitHub account that owns `ifamericadosul/ar-flight-studios`.
3. Install/authorize the **Pages CMS GitHub App** for that repository only (recommended).
4. Select repository `ifamericadosul/ar-flight-studios`, branch `main`.
5. Pages CMS reads `.pages.yml` from the repository root.
6. You should see the content groups described below.

Pages CMS edits the repository files and commits the changes to GitHub. GitHub Pages then deploys the updated static website. There is no separate admin password or private `/admin` page hosted by this static site: authentication is handled by GitHub OAuth and the Pages CMS app. Never put a GitHub personal access token in website JavaScript or public files.

## What can be edited

- **Website & Homepage** — hero headings, descriptions, buttons, URLs, hero and feature images, about text, Discord invite, footer and copyright.
- **Products, Mods & Liveries** — create/edit/delete products, category, product copy, cover image, version, update date, file size, download URL, uploaded ZIP/file, installation notes, featured and published toggles.
- **Category tiles** — labels, title, category filter key, background image, visibility.
- **News & Updates** — create/edit/delete update cards.
- **Navigation links** — menu labels, URLs, visibility.
- **Custom Pages** — create editable text pages. Their URL is `https://ifamericadosul.github.io/ar-flight-studios/?page=your-slug`. Set `Show in navigation` to add them to the side menu.

## Uploading images and downloadable mods

Pages CMS has two media locations (configured with the `/ar-flight-studios/` project-site prefix so uploaded media resolves correctly on your current GitHub Pages URL):
- `media/images/` for cover art and page images.
- `media/files/` for downloadable ZIPs and other project files.

For large mods/liveries, GitHub Releases is often a better place to host the download. Paste the direct release asset URL into **External download URL**. GitHub has file-size limits for ordinary repository files; do not commit very large packages to the website repository.

## Notes and limitations

- This is a static website + Git-backed CMS, not a drag-and-drop visual page builder. Text, links, images, products, news, categories, navigation and simple custom text pages are editable in the CMS.
- Changing the layout, CSS, adding brand-new component types, or inventing complex page sections still requires a code change.
- `Custom Pages` currently supports title, intro, optional image and plain text body. It does not provide arbitrary drag-and-drop blocks.
- The Discord URL is intentionally a placeholder until you provide your invite.
- After each CMS save, wait for the GitHub Pages deployment before checking the public URL. Browser caching may require a hard refresh.

## Files

- `.pages.yml` — Pages CMS editor schema
- `content/*.json` — editable site content
- `index.html`, `styles.css`, `script.js` — CMS-enabled frontend
- `media/images/`, `media/files/` — CMS upload destinations
