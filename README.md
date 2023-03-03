# Demo of Using Sqlite3 with Next.js

Setup credit belongs to this forum article:
https://sqlite.org/forum/forumpost/91af6788de

Steps:
- Install packages `npm i`
- Run server `npm run dev`

**NOTE**
At present this does not work. In the console are 
these errors:

```
Uncaught Error: Expecting self.sqlite3InitModule to be defined by the Emscripten build.
    at eval (sqlite3.js?f311:10052:11)
    at eval (sqlite3.js?f311:10119:1)
    at ./lib/sqlite3.js (lib_dbWorker_js.js:41:1)
    at options.factory (lib_dbWorker_js.js:608:31)
    at __webpack_require__ (lib_dbWorker_js.js:81:33)
    at fn (lib_dbWorker_js.js:263:21)
    at eval (dbWorker.js:2:69)
    at ./lib/dbWorker.js (lib_dbWorker_js.js:30:1)
    at options.factory (lib_dbWorker_js.js:608:31)
    at __webpack_require__ (lib_dbWorker_js.js:81:33)
```