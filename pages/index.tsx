import { useEffect, useState } from "react";
import sqlite3InitModule from "./sqlite3-bundler-friendly.mjs";

export default function Home() {
  const [db, setDb] = useState<any>(null)
  const [lines, setLines] = useState<any>("")
  let needsSetup = true

  useEffect( () => {
    async function setupDB () {
      const sqliteDB = await sqlite3InitModule().then((sqlite3 :any) => {
        //const opfsDb = new sqlite3.opfs.OpfsDb("my-db", "c");
        // or in-memory ...
        const _db = new sqlite3.oo1.DB();
        console.log("sqlite3 instance created:",sqlite3);
        console.log("DB instance created is:", _db)  
        setDb(_db);
        return sqlite3;
      });
      console.log("sqliteDB:", sqliteDB);
    }

    if ( !db && needsSetup ) {
      needsSetup = false
      console.log("useEffect()/setupDB()")
      setupDB()
    }
  }, []);

  useEffect(() => {
    const log = (msg:string) => {
      let _lines = lines
      _lines = _lines + msg
      setLines(_lines)
    }

    if ( db !== null && lines === "" ) {
      db.exec("CREATE TABLE IF NOT EXISTS t(a,b)");
      try {
        log("Create a table...\n");
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
  
        log("Insert some data using exec()...\n");
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
        log("Query data with exec() without a callback...\n");
        // eslint-disable-next-line prefer-const
        let rows :any = [];
        db.exec({
          sql: "select a, b from t order by a limit 3",
          rowMode: 'object',
          resultRows: rows,
        });
        log("Result rows:\n"+JSON.stringify(rows,null,2));
      }catch(e){
        // if(e instanceof sqlite3.SQLite3Error){
        //   log("Got expected exception from db.transaction():",e.message);
        //   log("count(*) from t =",db.selectValue("select count(*) from t"));
        // }else{
        //   throw e;
        // }
        log("error is:"+ e)
        throw e
      }   
    }
  }, [db]);


  return (<div>
    <h1>SQLite3 in Next.js application</h1>
    <pre>{lines}</pre>
    </div>
  );
}
