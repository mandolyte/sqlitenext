import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router'
import { AppContext } from "../src/context/AppContext"

export default function Home() {
  const router = useRouter()
  // app context
  const {
    state: {
      dbWorker,
    }, 
    actions: {

    }
  } = useContext(AppContext)


  const [lines, setLines] = useState("")
  const [query, setQuery] = useState("")

  async function onSecondayPageClick () {
    router.push('/secondary')
  }

  useEffect( () => {

    if (dbWorker && query && query !== "") {
      // console.log("Posting a message")
      dbWorker.postMessage(query)
    }
  
  }, [dbWorker, query])

  useEffect( () => {
    if (dbWorker) {
      dbWorker.onmessage = (e) => {
        let msg = "";
        if ( typeof e.data === 'object' ) {
          msg = e.data.message; // + "\n" + e.data.stack;
        } else {
          msg = e.data
        }
        setLines(msg);
        // console.log('dbWorker.onmessage() Message received from worker:', e);
      }
    }
  }, [dbWorker])

  return (<div>
      <h1>Test Import of a Large Dump File</h1>
      <p>
        This will use the web worker to import a 
        large dump file. The file has nearly 99K rows.

        This will be done in the web worker at startup.

      </p>
      <p>Test 1 did not return after several minutes.</p>
      <p>Test 2 will reduce the number of rows to about 10K.
        Results show that it runs at about 1s per 1000 rows for this situation.
      </p>
      
      <p>Here are the timings:</p>
      <pre>
      Time to initialize 2ms.<br/>
      Time to fetch dump file 657ms<br/>
      Time to import dump 9949ms<br/>
      </pre>
      
      <p>Try these two queries:</p>
      <pre>
      select * from sqlite_schema;<br/>
      select count(*) from twl;<br/>
      </pre>
      <br/>
      <textarea onInput={
        (e) => {
          // console.log((e.target).value)
          setQuery((e.target).value)
        }
      }/>
      <pre>{lines}</pre>
      <button onClick={onSecondayPageClick}>Go to other page!</button>
    </div>
  );
}
