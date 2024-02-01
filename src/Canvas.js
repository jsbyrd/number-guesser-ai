import React from 'react';
import {useOnDraw} from './Hooks'

const Canvas = (props) => {

  const {width, height} = props;

  const onDraw = (contextObj, point, prevPoint) => {
    drawLine(prevPoint, point, contextObj, '#000000', 5);
  }

  const drawLine = (start, end, contextObj, color, width) => {
    start = start ?? end;
    contextObj.beginPath();
    contextObj.lineWidth = width;
    contextObj.strokeStyle = color;
    contextObj.moveTo(start.x, start.y);
    contextObj.lineTo(end.x, end.y);
    contextObj.stroke();

   contextObj.fillStyle = color;
   contextObj.beginPath();
   contextObj.arc(start.x, start.y, 2, 0, 2 * Math.PI);
   contextObj.fill(); 
  }


  const setCanvasRef = useOnDraw(onDraw);

  const canvasStyle = {
    border: '1px solid black'
  }

  

  return (
    <canvas 
      width={width} 
      height={height}
      style={canvasStyle}
      ref={setCanvasRef}       
     />
  )
}

export default Canvas;