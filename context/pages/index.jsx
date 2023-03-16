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
      <h1>SQLite3 in Next.js application</h1>
      <p>Example:</p>
      <code>
      CREATE TABLE IF NOT EXISTS u(a,b);<br/>

      insert into u(a,b) values ('a','b');<br/>
      insert into u(a,b) values ('c','d');<br/>
      insert into u(a,b) values ('e','f');<br/>

      select count(*) from u;<br/>

      </code>
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
