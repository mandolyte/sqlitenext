# Demo of Using Sqlite3 with Next.js

Setup credit belongs to this forum article:
https://sqlite.org/forum/forumpost/91af6788de

Steps:
- Install packages `yarn install`
- Run server `yarn dev`

- Messages are being passed to worker and results received and shown on screen.
- When the database is ready, the worker posts a message that it is ready for queries.

Example using blob urls:
https://plainenglish.io/blog/web-worker-in-react

Example on stackblitz:
https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-web-worker?file=pages%2Findex.tsx
(this one uses a Ref)

To Do:
- do an example with the setup in an app context
- add an input box where I can enter the SQL to use
- do an example where the worker code is passed as a blob url (see above); this might get me passed the problem of enabling OPFS... but not sure


