import sqlite3 from "./sqlite3-bundler-friendly.mjs";

sqlite3().then((sqlite3) => {
  const capi = sqlite3.capi /*C-style API*/,
    oo = sqlite3.oo1; /*high-level OO API*/
  
  if ( capi ) {
    console.log(
      "sqlite3 version",
      capi.sqlite3_libversion(),
      capi.sqlite3_sourceid()
    );
    const db = new sqlite3.oo1.DB();
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
});
