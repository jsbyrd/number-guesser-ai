from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import make_prediction

app = Flask(__name__)
CORS(app)


@app.route("/")
def hello_world():
    return "<p>Hello World<p>"


@app.route("/predict", methods=["POST"])
def predict():
    req = request.get_json()
    image = req['image']
    predictions = make_prediction(image)[0].tolist()
    return jsonify(predictions)
