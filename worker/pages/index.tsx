import { useEffect, useState } from "react";

export default function Home() {
  const [lines, setLines] = useState("")
  const [dbWorker,setDbWorker] = useState<any>(null)
  let needsSetup = true

  useEffect( () => {
    if ( !dbWorker && needsSetup ) {
      needsSetup = false
      const _dbWorker = new Worker(new URL("../pages/dbworker.js", import.meta.url));
      _dbWorker.onmessage = (e :any) => {
        console.log('_dbWorker.onmessage() Message received from worker:', e);
        if ( e.data === 'dbready') {
          setDbWorker(_dbWorker);
        }
      }
    }
  }, []);

  useEffect( () => {

    if (dbWorker) {
      console.log("Posting a message")
      dbWorker.postMessage("select a, b from t order by a limit 3")
    }
  
  }, [dbWorker])

  useEffect( () => {
    if (dbWorker) {
      dbWorker.onmessage = (e :any) => {
        setLines(lines + "\n" + e.data);
        console.log('dbWorker.onmessage() Message received from worker:', e);
      }
    }
  }, [dbWorker])

  // dbWorker.onmessage = (e :any) => {
  //   setLines(e.data);
  //   console.log('dbWorker.onmessage() Message received from worker:', e);
  // }

  return (<div>
    <h1>SQLite3 in Next.js application</h1>
    <pre>{lines}</pre>
    </div>
  );
}
