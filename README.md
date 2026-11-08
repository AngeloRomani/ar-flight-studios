# AR Flight Studios — Aerofly FS Community Website

A responsive static storefront for community-created Aerofly Flight Simulator aircraft mods, liveries, scenery and utilities. Built with plain HTML, CSS and JavaScript for GitHub Pages.

## Included
- Premium dark aviation-inspired responsive design
- Left slide-out navigation drawer
- Category browsing, live search and filters
- Download cards and individual project detail dialogs
- Latest updates/news section
- Discord community call-to-action and footer
- Editable project catalogue in `script.js`

## Before going live
This package contains **sample content**. Replace the example entries and links before publishing.

### 1. Add your real downloads
Edit the `projects` array near the top of `script.js`. For each project, update:
- `title`, `category` (`Aircraft`, `Liveries`, `Scenery`, `Utilities`)
- `tag`, `description`, `version`, `updated`, `size`
- `image` (a public image URL)
- `download` (direct file link or GitHub Releases page)
- `install` (installation instructions)

For larger files, create a release in GitHub and attach the ZIP file as a release asset. Use the asset's direct download URL in `download`.

### 2. Add your Discord invite
In `index.html`, search for `https://discord.com/` and replace each occurrence with your permanent Discord invite URL, for example `https://discord.gg/your-invite`. The current URL is only a placeholder.

### 3. Publish using GitHub Pages
1. Create a **public** GitHub repository, for example `ar-flight-studios`.
2. Upload `index.html`, `styles.css`, `script.js`, `.nojekyll` and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then click **Save**.
6. Wait for deployment. GitHub displays your published URL in the Pages settings.

Typical URL: `https://YOUR-USERNAME.github.io/ar-flight-studios/`.

## Customisation
- Brand, copyright and page metadata: `index.html`
- Colours, layout and imagery: `styles.css`
- Download catalogue and installation notes: `script.js`
- Discord invite: replace `https://discord.com/` in `index.html`

## Important
GitHub Pages is static hosting. This website has no user accounts, server-side upload system or private admin dashboard. You update the catalogue by editing `script.js` and pushing the changes to GitHub.

AR Flight Studios is an independent community project and is not affiliated with, endorsed by or sponsored by IPACS or Aerofly FS. Only distribute files and imagery that you own or are authorised to share.
