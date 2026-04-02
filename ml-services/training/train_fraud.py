import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

# Ensure models folder exists
os.makedirs("../models", exist_ok=True)

# Dummy dataset
data = pd.DataFrame({
    "claim_amount": [1000, 5000, 2000, 10000],
    "frequency": [1, 5, 2, 10],
    "location_risk": [0.1, 0.9, 0.2, 0.95],
    "fraud": [0, 1, 0, 1]
})

X = data[["claim_amount", "frequency", "location_risk"]]
y = data["fraud"]

model = RandomForestClassifier()
model.fit(X, y)

#  Correct path
joblib.dump(model, "../models/fraud_model.pkl")

print(" Fraud model trained & saved")