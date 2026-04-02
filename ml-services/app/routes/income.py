from fastapi import APIRouter
from app.schemas.income_schema import IncomeRequest
from app.services.income_service import predict_income

router = APIRouter()

@router.post("/")
def check_income(request: IncomeRequest):
    return predict_income(request)