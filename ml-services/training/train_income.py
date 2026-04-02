import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib
import os

# Ensure models folder exists
os.makedirs("../models", exist_ok=True)

data = pd.DataFrame({
    "weekly_income": [5000, 6000, 7000, 8000],
    "weather_severity": [1, 2, 3, 4],
    "aqi": [1, 2, 3, 4],
    "loss": [500, 1000, 1500, 2000]
})

X = data[["weekly_income", "weather_severity", "aqi"]]
y = data["loss"]

model = LinearRegression()
model.fit(X, y)

#  Correct path
joblib.dump(model, "../models/income_model.pkl")

print(" Income model trained & saved")