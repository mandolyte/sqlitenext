import { useEffect, useState, useContext } from "react";
import { useRouter } from 'next/router'
import { AppContext } from "../src/context/AppContext"

export default function Secondary() {
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

  async function onMainPageClick () {
    router.push('/')
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
      <h1>This is the secondary page!</h1>

      <br/>
      <textarea onInput={
        (e) => {
          // console.log((e.target).value)
          setQuery((e.target).value)
        }
      }/>
      <pre>{lines}</pre>
      <button onClick={onMainPageClick}>Go to main page!</button>
    </div>
  );
}
