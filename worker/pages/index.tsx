import { useEffect, useState } from "react";

export default function Home() {
  const [db,setDb] = useState<any>(null)
  let needsSetup = true

  useEffect( () => {
    if ( !db && needsSetup ) {
      needsSetup = false
      const dbWorker = new Worker(new URL("../pages/dbworker.js", import.meta.url));
      setDb(db)
    }
  }, []);


  return (<div>
    <h1>SQLite3 in Next.js application</h1>
    {/* <pre>{lines}</pre> */}
    </div>
  );
}
