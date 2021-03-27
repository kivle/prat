import './App.css';
import Canvas from './canvas/canvas';
import CanvasContextProvider from './canvas/canvas-context';

function App() {
  return (
    <div className="App">
      <CanvasContextProvider>
        <Canvas />
      </CanvasContextProvider>
    </div>
  );
}

export default App;
