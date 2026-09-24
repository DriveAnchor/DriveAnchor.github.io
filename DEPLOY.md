# Anonymous GitHub Pages Deployment

Target URL: `https://driveanchor.github.io/`

That URL requires a GitHub **organization** (or user) named exactly `DriveAnchor`
and, inside it, a repository named exactly `DriveAnchor.github.io`. As of
2026-09-23 the name `DriveAnchor` was still free on GitHub. A repository under a
personal account would be served at `https://<username>.github.io/DriveAnchor/`
instead, and the username in that URL identifies an author, so it must not be
used during double-blind review.

## 1. Create the anonymous account and organization

1. Create a GitHub account with a new project-only email address and a neutral
   username. Keep the profile name, location, company, bio, and social links
   empty. In email settings, enable **Keep my email addresses private** and
   **Block command line pushes that expose my email**.
2. From that account, create a free organization named `DriveAnchor`
   (**Settings > Organizations > New organization**). Leave the organization
   profile empty. In **People**, keep your membership set to **Private** so the
   organization page lists no members.
3. Inside the organization, create an empty public repository named
   `DriveAnchor.github.io`. Do not initialize it with a README, license, or
   `.gitignore`.
4. Install and authenticate GitHub CLI with the anonymous account:

   ```bash
   brew install gh
   gh auth login
   gh api user --jq .login
   ```

   Verify that the last command prints only the anonymous username.

## 2. Upload the 41-minute video as a Release asset

GitHub rejects repository files above 100 MB, and `full-deployment.mp4` is about
1 GB, so it is ignored by Git and published as a Release asset instead. From this
directory, run:

```bash
gh release create media-v1 assets/videos/full-deployment.mp4 \
  --repo DriveAnchor/DriveAnchor.github.io \
  --title "Real-vehicle deployment recording" \
  --notes "Complete anonymized 41-minute on-road recording."
```

The stable video URL will be:

```text
https://github.com/DriveAnchor/DriveAnchor.github.io/releases/download/media-v1/full-deployment.mp4
```

In `index.html`, replace `assets/videos/full-deployment.mp4` with that URL. It
appears once, in the featured block below the Real-vehicle Deployment grid.

The nine short clips are also attached to the same `media-v1` Release and are
listed as the first `<source>` of each `<video>`, with the repository copy as
the second `<source>` fallback. Release assets are served from a different CDN
than GitHub Pages and loaded noticeably faster in testing. To refresh a clip:

```bash
gh release upload media-v1 assets/videos/<clip>.mp4 \
  --repo DriveAnchor/DriveAnchor.github.io --clobber
```

The clips in `assets/videos/` are H.264 at about 1.8 Mbps with the MP4 index
at the front (streamable). Untouched originals are kept outside the repository
in `../video_originals/`.

## 3. Publish the site

Configure Git to use GitHub's anonymous noreply address, then push:

```bash
git init -b main
git config user.name "DriveAnchor"
git config user.email "ANONYMOUS_USER@users.noreply.github.com"
git add .
git commit -m "Publish anonymous DriveAnchor project page"
git remote add origin https://github.com/DriveAnchor/DriveAnchor.github.io.git
git push -u origin main
```

Open **Settings > Pages** in the repository. Under **Build and deployment**,
choose **Deploy from a branch**, select `main` and `/ (root)`, and save. Because
the repository is named `DriveAnchor.github.io`, the site is served at the
organization root:

```text
https://driveanchor.github.io/
```

The `.nojekyll` file in this directory tells Pages to publish the files as they
are, without a Jekyll build.

## 4. Final anonymity checks

- Open the site in a private browser window and test all videos and the PDF.
- Check the repository commit author, the organization page, and the account
  profile for identity leakage.
- Keep GitHub Issues, Discussions, and social previews disabled unless needed.
- Do not add analytics, trackers, personal domains, author names, local paths,
  acknowledgements, or non-anonymous code links during double-blind review.
- The Code button points to the anonymous repository
  `https://anonymous.4open.science/r/700a25db-5742-4001-845c-6858d5c86459/`.
  Replace it only with another anonymous URL during review.
- After the review period, the organization can be renamed or transferred; the
  Pages URL follows the organization name.
