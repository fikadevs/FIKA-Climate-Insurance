from fastapi import APIRouter
from app.schemas.fraud_schema import FraudRequest, FraudResponse
from app.services.fraud_service import predict_fraud

router = APIRouter()

@router.post("/")
def check_fraud(request: FraudRequest):
    result = predict_fraud(request)
    return result