import sqlite3InitModule from "./sqlite3-bundler-friendly.mjs";

async function* makeTextFileLineIterator(fileURL) {
  const utf8Decoder = new TextDecoder("utf-8");
  const response = await fetch(fileURL);
  const reader = response.body.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk) : "";

  const newline = /\r?\n/gm;
  let startIndex = 0;
  let result;

  while (true) {
    const result = newline.exec(chunk);
    if (!result) {
      if (readerDone) break;
      const remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "");
      startIndex = newline.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = newline.lastIndex;
  }

  if (startIndex < chunk.length) {
    // Last line didn't end in a newline char
    yield chunk.substr(startIndex);
  }
}

async function buildString(urlOfFile) {
  let dumpFileAsString = "";
  for await (const line of makeTextFileLineIterator(urlOfFile)) {
    // processLine(line);
    dumpFileAsString = dumpFileAsString + line;
  }
  return dumpFileAsString;
}



var db
sqlite3InitModule().then( async (sqlite3) => {
  let start = Date.now();
  console.log(`DB Init start at ${start}`)
  const capi = sqlite3.capi /*C-style API*/,
    oo = sqlite3.oo1; /*high-level OO API*/

  if ( oo ) {
    console.log(
      "sqlite3 version",
      capi.sqlite3_libversion(),
      capi.sqlite3_sourceid()
    );
    db = new sqlite3.oo1.DB();
    const timeToInit = Date.now() - start;
    console.log(`Time to initialize ${timeToInit}ms`)
    // fetch the startup dump file
    // fetch("https://raw.githubusercontent.com/mandolyte/sqlitenext/master/import_dump/twl_tbl_dump.sql")
    //   .then((response) => response.json())
    //   .then((data) => console.log(data))
    // ;
    const URL = "https://raw.githubusercontent.com/mandolyte/sqlitenext/master/import_dump/twl_tbl_dump.sql"
    start = Date.now()
    const dumpString = await buildString(URL).then( (data) => {return data})
    const timeToFetchDump = Date.now() - start;
    console.log(`Time to fetch dump file ${timeToFetchDump}ms`)
    // console.log("dumpfile:\n",dumpString)
    start = Date.now()
    // db.exec(dumpString)

    let rows = [];
    db.exec({
      sql: dumpString,
      rowMode: 'object',
      resultRows: rows,
    });


    const timeToImportDump = Date.now() - start;
    console.log(`Time to import dump ${timeToImportDump}ms`) 
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

/*
    // db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");
    // let i;
    // for( i = 20; i <= 25; ++i ){
    //   db.exec({
    //     sql: "insert into t(a,b) values (?,?)",
    //     // bind by parameter index...
    //     bind: [i, i*2]
    //   });
    //   db.exec({
    //     sql: "insert into t(a,b) values ($a,$b)",
    //     // bind by parameter name...
    //     bind: {$a: i * 10, $b: i * 20}
    //   });
    // }   

*/

/*
    db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");
    try {
      console.log("Create a table...\n");
      db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");
      //Equivalent:
      db.exec({
        sql:"CREATE TABLE IF NOT EXISTS t(a,b)"
        // ... numerous other options ... 
      });
      // SQL can be either a string or a byte array
      // or an array of strings which get concatenated
      // together as-is (so be sure to end each statement
      // with a semicolon).

      console.log("Insert some data using exec()...\n");
      let i;
      for( i = 20; i <= 25; ++i ){
        db.exec({
          sql: "insert into t(a,b) values (?,?)",
          // bind by parameter index...
          bind: [i, i*2]
        });
        db.exec({
          sql: "insert into t(a,b) values ($a,$b)",
          // bind by parameter name...
          bind: {$a: i * 10, $b: i * 20}
        });
      }    
      console.log("Query data with exec() without a callback...\n");
      // eslint-disable-next-line prefer-const
      let rows = [];
      db.exec({
        sql: "select a, b from t order by a limit 3",
        rowMode: 'object',
        resultRows: rows,
      });
      console.log("Result rows:\n"+JSON.stringify(rows,null,2));
    }catch(e){
      // if(e instanceof sqlite3.SQLite3Error){
      //   log("Got expected exception from db.transaction():",e.message);
      //   log("count(*) from t =",db.selectValue("select count(*) from t"));
      // }else{
      //   throw e;
      // }
      console.log("error is:", e)
      throw e
    }

  } else {
    console.log("capi not defined")
  }
*/