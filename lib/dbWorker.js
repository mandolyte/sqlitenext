import sqlite3 from "./sqlite3.js";

sqlite3().then((sqlite3) => {
  const capi = sqlite3.capi /*C-style API*/,
    oo = sqlite3.oo1; /*high-level OO API*/
  // console.log(
  //   "sqlite3 version",
  //   capi.sqlite3_libversion(),
  //   capi.sqlite3_sourceid()
  // );
});
