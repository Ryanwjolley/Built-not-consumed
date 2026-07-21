# Built Not Consumed

Source for builtnotconsumed.com — an [Eleventy](https://www.11ty.dev/) static site.

## Project structure

```
src/
  _includes/
    base.njk      <- shared header/nav/footer, wraps every page
    lesson.njk     <- layout used by every lesson markdown file
  css/
    style.css      <- all site styles, one file
  index.njk         <- homepage
  lessons/
    index.njk       <- auto-generated list of every lesson
    reps-vs-shortcuts.md   <- an example lesson (delete or keep)
.eleventy.js          <- config (collections, filters, output folder)
netlify.toml           <- tells Netlify how to build the site
```

## Adding a new lesson

Add a new file to `src/lessons/`, e.g. `src/lessons/my-new-lesson.md`:

```markdown
---
layout: lesson.njk
title: "Your Lesson Title"
date: 2026-08-01
summary: "One sentence that shows up on the lessons list."
---

Write the lesson here in plain markdown. Headings, lists, links,
bold — all of it works.

## A subheading

More content.
```

Save it, and it automatically shows up on `/lessons/`, newest first. No other
file needs to change.

## Running it locally

```bash
npm install       # first time only
npm start          # serves the site at localhost:8080, live-reloads on save
npm run build       # builds the production version into _site/
```

## Deploying (one-time setup)

1. **Push this folder to a new GitHub repo.**
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   gh repo create builtnotconsumed --private --source=. --push
   ```
   (No `gh` CLI? Create the repo manually on github.com, then:
   `git remote add origin <your-repo-url>` and `git push -u origin main`.)

2. **Connect Netlify to the repo.**
   Netlify → Add new site → Import an existing project → GitHub → pick the
   repo. It will auto-detect `netlify.toml` (build command and publish
   folder are already set). Deploy.

3. **Point your domain at it.**
   Site settings → Domain management → Add a domain → `builtnotconsumed.com`.
   Netlify will give you nameservers to set at GoDaddy (My Products → domain
   → DNS → Nameservers → Change → paste Netlify's four values). HTTPS is
   automatic once DNS propagates.

4. **Turn on form notifications.**
   Site settings → Forms → add your email so every signup on `/#signup`
   notifies you.

From here on, **every `git push` to `main` automatically rebuilds and
republishes the live site.** No manual uploads, ever.

## Ongoing updates with Claude Code

Once this is a GitHub repo, point Claude Code at the local folder and just
describe what you want:

- "Add a new lesson about using AI to practice a skill instead of skipping it."
- "Change the hero headline to X."
- "Add a photo to the new lesson."

Claude Code edits the files directly, you review the diff, then:

```bash
git add .
git commit -m "describe the change"
git push
```

Netlify picks it up and the live site updates within about a minute.
