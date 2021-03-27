import { useEffect, useState } from "react";
import { useCanvasContext } from "../canvas/canvas-context";
import { useTesseractWorker } from "./tesseract-context";

export default function TextRecognize() {
  const {
    imageData,
    canvasRef
  } = useCanvasContext();

  const {
    worker
  } = useTesseractWorker();

  const [text, setText] = useState(undefined);

  useEffect(() => {
    async function work() {
      if (worker) {
        const result = await worker.recognize(canvasRef.current);
        setText(result?.data?.text);
      }
    }
    work();    
  }, [imageData, worker, canvasRef]);

  return (
    <div className="textRecognizer">{text}</div>
  );
}
