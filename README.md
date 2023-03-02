# Demo of Using Sqlite3 with Next.js

Setup credit belongs to this forum article:
https://sqlite.org/forum/forumpost/91af6788de

Steps:
- Install packages `npm i`
- Run server `npm run dev`


*Update:* 
The example does not work! In the console, you will observe this error:

```
sqlite3.js?26c8:142 Not allowed to load local resource: file:///_next/static/media/sqlite3.a7b2ff92.wasm
wfetch @ sqlite3.js?26c8:142
sqlite3.js?26c8:142          Uncaught (in promise) TypeError: Failed to fetch
    at wfetch (sqlite3.js?26c8:142:1)
    at eval (sqlite3.js?26c8:145:1)
    at Object.callee [as instantiateWasm] (sqlite3.js?26c8:154:1)
    at createWasm (sqlite3.js?26c8:947:1)
    at eval (sqlite3.js?26c8:4514:1)
    at self.sqlite3InitModule (sqlite3.js?26c8:13971:1)
    at init (sqlite3-wrapper.js?bb51:7:1)
    at eval (my-worker.js?b814:4:18)
    at ./my-worker.js (my-worker_js.js:30:1)
    at options.factory (my-worker_js.js:644:31)
```

This version of the example is trying to use the NPM package `sqlite-wasm-esm`. 

This package works, at least for in-memory, using the Qwik City framework.



As of this writing, it doesn't do anything visible... next to work on that.

For example:
- create an in-memory database
- insert some rows
- query the rows
- display results

