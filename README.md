# Page & Pixel 📖

A small, static books-and-learning website hosted with GitHub Pages.

## Live website

https://chekenorg.github.io/

## What is included?

- An animated homepage with a searchable bookshelf and coding links.
- **The Last Light at Willow Pier**, an original five-page fictional story, with page navigation.
- A **reference library** containing three short, original factual explainers about lighthouses, estuaries, and maritime signal flags.
- Links to the original Wikipedia topics for anyone who wants to learn more.
- A browser-based Math Lab with answer checking and a score counter.
- Keyboard shortcut **Alt + W** for the story (when the browser permits it).

## Folder structure

```text
index.html                  Homepage
willow-pier.html            Five-page original story
references/                 Reference hub and three topic pages
assets/css/                 Separate stylesheets
assets/js/                  Homepage, story, quiz, and keyboard scripts
assets/img/                 Site favicon
 data/references.json       Reference metadata
docs/                       Site map, editorial notes
```

## How to publish

Upload **all files and folders** from this project to the root of your `chekenorg.github.io` repository. Do not upload the ZIP file itself or put everything inside an extra folder. In **Settings → Pages**, publish from the `main` branch at `/(root)`.

## Credits and content policy

The Willow Pier story and the on-site guide text are original fiction and original educational summaries. The factual guides link to Wikipedia as a starting point for further reading. They are not copied Wikipedia articles. The fictional events are not presented as historical facts. See `docs/credits.md`.

No Node.js, paid hosting, build commands, or third-party JavaScript libraries are required.
