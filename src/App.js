import './App.css';
import Canvas from './canvas/canvas';
import CanvasContextProvider from './canvas/canvas-context';
import TesseractProvider from './text-recognizer/tesseract-context';
import TextRecognize from './text-recognizer/text-recognizer';

function App() {
  return (
    <div className="App">
      <CanvasContextProvider>
        <TesseractProvider language="nor">
          <TextRecognize />
          <Canvas />
        </TesseractProvider>
      </CanvasContextProvider>
    </div>
  );
}

export default App;
