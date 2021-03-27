import * as React from 'react';
import { createWorker } from 'tesseract.js';

const TesseractContext = React.createContext(undefined);

export default function TesseractProvider({
  language = 'eng', children
}) {
  const [worker, setWorker] = React.useState(undefined);

  React.useEffect(() => {
    async function load() {
      setWorker(undefined);
      const newWorker = createWorker({
        logger: m => console.log(m)
      });
      await newWorker.load();
      await newWorker.loadLanguage(language);
      await newWorker.initialize(language);
      setWorker(newWorker);
    }
    load();
  }, [language]);

  return (
    <TesseractContext.Provider value={{
      worker
    }}>
      {children}
    </TesseractContext.Provider>
  );
}

export function useTesseractWorker() {
  return React.useContext(TesseractContext);
}
