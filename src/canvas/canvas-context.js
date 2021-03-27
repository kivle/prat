import React, { useContext, useRef, useCallback, useState } from 'react';

const CanvasContext = React.createContext(undefined);

export default function CanvasContextProvider({
  children
}) {

  const canvasRef = useRef(undefined);
  const canvasContextRef = useRef(undefined);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [imageData, setImageData] = useState(undefined);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvasContextRef.current = canvas.getContext('2d');
    canvasContextRef.current.lineCap = "round";
    canvasContextRef.current.strokeStyle = "black";
    canvasContextRef.current.lineWidth = 3;
  }, []);

  const initializeCanvas = useCallback(() => {
    window.addEventListener('resize', resize);
    resize();
  }, [resize]);

  const uninitializeCanvas = useCallback(() => {
    window.removeEventListener('resize', resize);
  }, [resize]);

  const mouseDown = useCallback(({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    canvasContextRef.current.beginPath();
    canvasContextRef.current.moveTo(offsetX, offsetY);
    setIsMouseDown(true);
  }, []);

  const mouseUp = useCallback(() => {
    const canvas = canvasRef.current;
    canvasContextRef.current.closePath();
    setIsMouseDown(false);
    setImageData(canvasContextRef.current.getImageData(0, 0, canvas.width, canvas.height));
  }, []);

  const mouseMove = useCallback(({ nativeEvent }) => {
    if (!isMouseDown) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    canvasContextRef.current.lineTo(offsetX, offsetY);
    canvasContextRef.current.stroke();
  }, [isMouseDown]);

  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    canvasContextRef.current.fillStyle = "white"
    canvasContextRef.current.fillRect(0, 0, canvas.width, canvas.height)
  }, []);

  return (
    <CanvasContext.Provider value={{
      canvasRef,
      canvasContextRef,
      initializeCanvas,
      uninitializeCanvas,
      mouseDown,
      mouseUp,
      mouseMove,
      clear,
      imageData
    }}>
      {children}
    </CanvasContext.Provider>
  );
}

export function useCanvasContext() {
  return useContext(CanvasContext);
}
