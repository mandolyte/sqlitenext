import { useEffect, useState } from "react";

export default function Home() {
  const [dbWorker, setDbWorker] = useState<any>(null)
  // This runs code only in the browser.
  useEffect(() => {
    if (dbWorker === null) {
      const _dbWorker = new Worker(new URL("../lib/dbWorker", import.meta.url));
      setDbWorker(_dbWorker)
      console.log("_dbWorker:", _dbWorker)
    }
  }, []);
  return (
    <h1>SQLite3 in Next.js application</h1>
  );
}
