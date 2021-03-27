import { useLayoutEffect } from "react";
import { useCanvasContext } from "./canvas-context";

export default function Canvas() {
  const {
    canvasRef,
    initializeCanvas,
    uninitializeCanvas,
    mouseDown,
    mouseUp,
    mouseMove
  } = useCanvasContext();

  useLayoutEffect(() => {
    initializeCanvas();
    return () => uninitializeCanvas();
  }, [initializeCanvas, uninitializeCanvas]);

  return (
    <canvas 
      ref={canvasRef} 
      id="canvas" 
      className="canvas"
      
      onMouseDown={mouseDown}
      onTouchStart={mouseDown}

      onMouseUp={mouseUp}
      onTouchEnd={mouseUp}
      onTouchCancel={mouseUp}

      onMouseMove={mouseMove}
      onTouchMove={mouseMove}
    />
  )
}
