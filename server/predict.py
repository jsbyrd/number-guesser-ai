# Testing my keras model
import tensorflow as tf
import numpy as np


def make_prediction(image):
    model = tf.keras.models.load_model("model.keras")
    image = np.expand_dims(image, axis=0)
    pred_y = model.predict(image)
    return pred_y
