
// Variables
const GRID_SIZE = 28;
const CLEAN_PREDICTION = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let isMouseDown = false;

const getClassName = (index) => {
  let className = 'square';
  if (index < 28) className += ' border-top';
  if (index % 28 === 27) className += ' border-right';
  if (index > 755) className += ' border-bottom';
  if (index % 28 === 0) className += ' border-left';
  return className;
}


// Chart Creation
const ctx = document.getElementById('myChart');
let chart;
const createChart = (prediction) => {
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      datasets: [{
        label: 'Model Confidence',
        data: prediction,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Fill grid upon loading page
window.addEventListener('load', (e) => {
  const grid = document.getElementById('grid');
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    let className = getClassName(i);
    let cell = document.createElement('div');
    cell.className = className;
    cell.id = `square_${i}`;
    cell.addEventListener("mouseover", () => {
        if (isMouseDown) cell.style.backgroundColor = 'black';
    });
    grid.appendChild(cell);
  }
  const cells = document.getElementsByClassName('square');
  for (let cell of cells) {
    cell.style.backgroundColor = 'white';
  }
  createChart(CLEAN_PREDICTION);
});

// Clear image
const clearBtn = document.getElementById('clearBtn');
clearBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log('click');
  const cells = document.getElementsByClassName('square');
  for (let cell of cells) {
    cell.style.backgroundColor = 'white';
  }
});

// Drawing
window.addEventListener('mousedown', () => {
  isMouseDown = true;
});
window.addEventListener('mouseup', () => {
  isMouseDown = false;
});

const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  makePrediction();
})


const makePrediction = async () => {
  // Create 28x28 array
  const picture = new Array(28);
  for (let i = 0; i < picture.length; i++) {
    picture[i] = new Array(28);
  }
  const cells = document.getElementsByClassName('square');
  let idx = 0;
  let doesDrawingExist = false;
  for (let cell of cells) {
    const y = Math.floor(idx / 28);
    const x = idx % 28;
    const val = (cell.style.backgroundColor === 'black') ? 255 : 0;
    if (val === 255) doesDrawingExist = true;
    picture[y][x] = val;
    idx++;
  }

  // if (!doesDrawingExist) return;

  const req = {
    image: picture
  };

  // TODO: CHANGE LATER
  const url = 'http://localhost:5000/predict';

  try {
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req), // body data type must match "Content-Type" header
    });
    const prediction = await response.json();
    // Update chart with prediction
    chart.destroy();
    createChart(prediction);
  } catch (err) {
    alert("Prediction failed");
    console.log(err);
  }

};
