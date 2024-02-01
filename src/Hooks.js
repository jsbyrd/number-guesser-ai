import { useRef } from 'react';

export function useOnDraw(onDraw) {

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  const mouseMoveListenerRef = useRef(null);
  const mouseDownListenerRef = useRef(null);
  const mouseUpListenerRef = useRef(null);

  const prevPointRef = useRef(null);

  const setCanvasRef = (ref) => {
    if (!ref) return;
    if (canvasRef.current) {
      canvasRef.current.removeEventListener("mousedown", mouseDownListenerRef.current);
    }
    canvasRef.current = ref;
    initMouseMoveListener();
    initMouseDownListener();
    initMouseUpListener();
  }

  const computePointInCanvas = (clientX, clientY) => {
    if (!canvasRef.current) return null;
    const boundingRect = canvasRef.current.getBoundingClientRect();
    return {
      x: clientX - boundingRect.left,
      y: clientY - boundingRect.top
    }
  }

  const initMouseDownListener = () => {
    if (!canvasRef.current) return;
    const listener = () => {
      isDrawingRef.current = true;
    }
    mouseDownListenerRef.current = listener;
    canvasRef.current.addEventListener("mousedown", listener);
  }

  const initMouseUpListener = () => {
    if (!canvasRef.current) return;
    const listener = () => {
      isDrawingRef.current = false;
      prevPointRef.current = null;
    }
    mouseUpListenerRef.current = listener;
    window.addEventListener("mouseup", listener);
  }

  const initMouseMoveListener = () => {
    const mouseMoveListener = (e) => {
      if (isDrawingRef.current) {
        const point = computePointInCanvas(e.clientX, e.clientY);
        const contextObj = canvasRef.current.getContext('2d');
        if (onDraw) onDraw(contextObj, point, prevPointRef.current);
        prevPointRef.current = point;
      }
    }
    mouseMoveListenerRef.current = mouseMoveListener;
    window.addEventListener("mousemove", mouseMoveListener);
  }

  return setCanvasRef;
}