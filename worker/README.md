# Demo of Using Sqlite3 with Next.js

Setup credit belongs to this forum article:
https://sqlite.org/forum/forumpost/91af6788de

Steps:
- Install packages `yarn install`
- Run server `yarn dev`

## 2023-03-11 (part 3) 

With it running in the main thread, I then tried to send the 
special headers (see info the `next.config.js` file). But now
I see this:

```
sqlite3-bundler-friendly.mjs?607f:11568 Ignoring inability to install OPFS sqlite3_vfs: The OPFS sqlite3_vfs cannot run in the main thread because it requires Atomics.wait().
```

Which means I need to go back to using a worker. Sigh.

## 2023-03-11 (part 2)

- Have it working without using a worker; using hooks instead.
- Using a hack to make sure it only runs once
- Results of db tests are now shown on the page
- Still limited to in-memory

**NOTE** had to fix line 11639 `sqlite3-bundler-friendly.mjs`.
Was:
```
    moduleScript: self?.document?.currentScript,
```
Should be: 
```
    moduleScript: globalThis?.document?.currentScript,
```
Since "self" is not a recognized variable in this environment.


## 2023-03-11 (part 1)

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
