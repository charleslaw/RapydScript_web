RapydScript II Web
==================

This is a version of RapydScript that runs in the browser.  It has a UI (built on top of codemirror) that lets you put in code in 1 text area, and compiles it to another text area.

## Repo Contents

This contains a few files that are noteable:

- index.html: codemirror page with UI for testing RapydScript
- demo.html: page that minimally runs RapydScript (no UI)
- lib & src folders with RapydScript code
- 0001-...-.patch file to patch RapydScript importing
- importer.js file to run imports for the browser


## Updating to the latest RapydScript

The only thing changed in RapydScript is the way imports are done.  You can get the latest RapydScript code and apply a patch to it. First test the patch:

    git apply --check 0001-attempt-at-getting-latest-rapydscript-to-work.patch

then apply it

    git apply 0001-attempt-at-getting-latest-rapydscript-to-work.patch

It will patch lib/parse.js

