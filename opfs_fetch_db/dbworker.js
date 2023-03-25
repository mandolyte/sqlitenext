import sqlite3InitModule from "./sqlite3-bundler-friendly.mjs";

// function copy(src)  {
//   var dst = new ArrayBuffer(src.length);
//   new Uint8Array(dst).set(new Uint8Array(src));
//   return dst;
// }

async function readWriteDB(fileURL) {
  const root = await navigator.storage.getDirectory();
  const dbHandle = await root.getFileHandle("an-opfs-sqlite.db", { create: true });
  // Get sync access handle
  const accessHandle = await dbHandle.createSyncAccessHandle();
  const response = await fetch(fileURL);
  const content = await response.blob();
  const bindata = await content.arrayBuffer();
  const dataview = new DataView(bindata);
  const writeBuffer = accessHandle.write(dataview);
  accessHandle.flush();

  // Always close FileSystemSyncAccessHandle if done.
  accessHandle.close();
  return true
}

// const db = new sqlite3.oo1.OpfsDb("my-db.db");

var db
sqlite3InitModule().then( async (sqlite3) => {
  let start = Date.now();

  // read and write the database
  const URL = "https://raw.githubusercontent.com/mandolyte/sqlitenext/master/opfs_fetch_db/an-opfs-sqlite.db"

  const dbWriteDone = await readWriteDB(URL).then( (data) => {return data})
  const timeToFetchDump = Date.now() - start;
  console.log(`Time to write db file ${timeToFetchDump}ms`)


  console.log(`DB Init start at ${start}`)
  const capi = sqlite3.capi /*C-style API*/,
    oo = sqlite3.oo1; /*high-level OO API*/

  if ( oo ) {
    start = Date.now()
    console.log(
      "sqlite3 version",
      capi.sqlite3_libversion(),
      capi.sqlite3_sourceid()
    );
    db = new oo.OpfsDb("an-opfs-sqlite.db");
    const timeToInit = Date.now() - start;
    console.log(`Time to initialize ${timeToInit}ms`)

    postMessage("dbready")
  }   
});

onmessage = (e) => {
  // console.log('onmessage(): Message received from main script:',e);
  try {
    let rows = [];
    db.exec({
      sql: e.data,
      rowMode: 'object',
      resultRows: rows,
    });
    const results = JSON.stringify(rows,null,2)
    // console.log("onmessage(): Result rows:\n"+JSON.stringify(rows,null,2));
    postMessage(results)
  } catch(err) {
    postMessage(err)
  }

}

/* code graveyard

async function readWriteDB(fileURL) {
  const root = await navigator.storage.getDirectory();
  const dbHandle = await root.getFileHandle("an-opfs-sqlite.db", { create: true });
  // Get sync access handle
  const accessHandle = await dbHandle.createSyncAccessHandle();
  const response = await fetch(fileURL);
  const reader = response.body.getReader();
  let position = 0;
  while ( true ) {
    const { value: chunk, done: readerDone } = await reader.read();
  // const writeBuffer = accessHandle.write(copy(chunk));
    if ( readerDone ) {
      break
    } else {
      console.log("typeof chuck:", typeof chunk, chunk)
      const dataView = new DataView(chunk.buffer);
      const writeBuffer = accessHandle.write(dataView, { at: position });
      position += dataView.byteLength
    }
  }
  // Persist changes to disk.
  accessHandle.flush();

  // Always close FileSystemSyncAccessHandle if done.
  accessHandle.close();
  return true
}

*/