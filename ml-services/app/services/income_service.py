import joblib
import numpy as np
import os

# Correct path to model
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "income_model.pkl")

model = joblib.load(MODEL_PATH)

def predict_income(data):
    features = np.array([[
        data.weekly_income,
        data.weather_severity,
        data.aqi
    ]])

    prediction = model.predict(features)[0]

    return {
        "predicted_loss": float(prediction)
    }