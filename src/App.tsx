import { useEffect, useRef } from "react";

const btnStyle = {
  background: 'none',
  border: '2px solid black',
  borderRadius: '3px',
  padding: '5px',
  margin: '5px',
  fontWeight: 'bold'
} as const;

export const App = () => {
  const workerRef = useRef<Worker | null>(null);

  const handleCalculation = () => {
    workerRef.current.postMessage('calc')
  };

  const handleChangeBG = () => {
    let bodyBG = document.body.style.background;
    document.body.style.background = bodyBG === 'red' ? 'white' : 'red';
  };

  useEffect(() => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })
    workerRef.current = worker;

    worker.onmessage = (message: MessageEvent<number>) => {
      alert(message.data)
    }

    return () => worker.terminate()
  }, [])

  return (
    <>
      <button type="button" style={btnStyle} onClick={handleCalculation}>Expencive Func</button>
      <button type="button" style={btnStyle} onClick={handleChangeBG}>Change BG Func</button>
    </>
  )
}

