import joblib
import numpy as np
import os

# Correct path handling
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
MODEL_PATH = os.path.join(BASE_DIR, "models", "fraud_model.pkl")

model = joblib.load(MODEL_PATH)

def predict_fraud(data):
    features = np.array([[
        data.claim_amount,
        data.frequency,
        data.location_risk
    ]])

    prediction = model.predict(features)[0]
    probability = model.predict_proba(features)[0][1]

    return {
        "fraud": bool(prediction),
        "risk_score": float(probability)
    }