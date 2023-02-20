// your-worker.js
import sqlite3InitModule from "sqlite-wasm-esm";
var db
sqlite3InitModule().then((sqlite3) => {
  // const opfsDb = new sqlite3.opfs.OpfsDb("my-db", "c");
  // or in-memory ...
  db = new sqlite3.DB();
  console.log("db created:", db)
});

