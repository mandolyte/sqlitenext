import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const AppContext = React.createContext({});


export default function AppContextProvider({
  children,
}) {
  const [lines, setLines] = useState("")
  const [dbWorker,setDbWorker] = useState(null)
  // const [query, setQuery] = useState<any>("")
  let needsSetup = true

  useEffect( () => {
    if ( !dbWorker && needsSetup ) {
      needsSetup = false
      const _dbWorker = new Worker(new URL("dbworker.js", import.meta.url));
      _dbWorker.onmessage = (e) => {
        console.log('AppContext()/useEffect() _dbWorker.onmessage() Message received from worker:', e);
        if ( e.data === 'dbready') {
          setDbWorker(_dbWorker);
          console.log('AppContext()/useEffect() db is ready:');
        }
      }
    }
  }, []);

  // useEffect( () => {

  //   if (dbWorker && query && query !== "") {
  //     console.log("Posting a message")
  //     dbWorker.postMessage(query)
  //   }
  
  // }, [dbWorker, query])

  // useEffect( () => {
  //   if (dbWorker) {
  //     dbWorker.onmessage = (e) => {
  //       setLines(lines + "\n" + e.data);
  //       console.log('dbWorker.onmessage() Message received from worker:', e);
  //     }
  //   }
  // }, [dbWorker])


  // create the value for the context provider
  const context = {
    state: {
      dbWorker,
    },
    actions: {
    }
  };

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  /** Children to render inside of Provider */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
