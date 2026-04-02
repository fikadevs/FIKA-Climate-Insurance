from pydantic import BaseModel

class FraudRequest(BaseModel):
    claim_amount: float
    frequency: int
    location_risk: float

class FraudResponse(BaseModel):
    fraud: bool
    risk_score: float