import { useEffect } from "react";

export default function Home() {
  // This runs code only in the browser.
  useEffect(() => {
    const dbWorker = new Worker(new URL("../lib/dbWorker", import.meta.url));
  }, []);
  return null;
}
