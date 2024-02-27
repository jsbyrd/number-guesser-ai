# Number Predictor
### Demo
https://www.youtube.com/watch?v=6vRSQqcMslo

### Description
A number predictor applicaton capable of guessing digits from 0-9. The prediction algorithm is based on a CNN created using TensorFlow and
trained on the MNIST dataset. The model weights are stored in a simple Flask API to make predictions accessible to other applications.
In addition, there is a simple HTML/CSS/JavaScript frontend to allow users to draw their own numbers to have them guessed. 

### Compilation Instructions
If you would like to run this application yourself
1) Install Python 3.10.12
2) Download the code
3) To run the frontend I suggets using VSCode's Live Server extension
   * Right click `index.html` in `./client` and select `Open with Live Server` to get it running.
   * If you do not have VSCode, install it.
   * If you do not have the Live Server extension, go to VSCode's extension tab, look up Live Server from Ritwick Dey, and install it.
5) To run the backend
  1) Open your terminal of choice
  2) Navigate to `./server`
  3) Now run `flask run`
7) If both the frontend and backend are running with no issue, you should now be able to draw numbers and get them guessed!
