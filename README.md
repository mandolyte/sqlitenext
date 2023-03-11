# Demo of Using Sqlite3 with Next.js

Setup credit belongs to this forum article:
https://sqlite.org/forum/forumpost/91af6788de

Steps:
- Install packages `npm i`
- Run server `npm run dev`

Finally have something working using this snapshot (as of 2023-03-11)
https://sqlite.org/wasm/uv/snapshot.html


This isn't very interesting yet; here are some remarks on what to look for:

- The dbWork is running twice... not sure why.
- The page doesn't show any; all the action is in the console
- The Worker is doing all the work right now to keep it simple
- OPFS isn't working; this is the message in the console:
```
sqlite3-bundler-friendly.mjs?0aee:11568 
Ignoring inability to install OPFS sqlite3_vfs: 
Cannot install OPFS: 
Missing SharedArrayBuffer and/or Atomics. 
The server must emit the COOP/COEP response headers to enable those. 
See https://sqlite.org/wasm/doc/trunk/persistence.md#coop-coep
```

To do:
- learn how to use Workers 
- learn how make OPFS work
