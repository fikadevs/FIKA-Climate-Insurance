from pydantic import BaseModel

class IncomeRequest(BaseModel):
    weekly_income: float
    weather_severity: float
    aqi: int

class IncomeResponse(BaseModel):
    predicted_loss: float