import { useState } from 'react';
import Canvas from './Canvas';
import './App.css';

function App() {

  const [lineColor, setLineColor] = useState('#000000');
  const [lineWidth, setLineWidth] = useState('5');

  return (
    <div className="App">
      <h1>Number Guesser</h1>
      <h2>Instructions: Use canvas, press button, success</h2>
      <Canvas width="300px" height="200px"/>
    </div>
  );
}

export default App;
