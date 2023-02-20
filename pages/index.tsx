import { useEffect, useRef, useCallback } from 'react'

export default function Home() {
  const workerRef = useRef<Worker>()

  // This runs code only in the browser.
  useEffect(() => {
    workerRef.current = new Worker(new URL('../my-worker.js', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`)
    return () => {
      workerRef.current?.terminate()
    }
  }, []);
  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage(100000)
  }, [])

  return (
    <>
      <p>Do work in a WebWorker!</p>
      <button onClick={handleWork}>Calculate PI</button>
    </>
  )
}


/*
new URL("../lib/dbWorker", import.meta.url));

try this:
https://stackblitz.com/github/vercel/next.js/tree/canary/examples/with-web-worker?file=pages%2Findex.tsx
*/