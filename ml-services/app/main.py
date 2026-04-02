from fastapi import FastAPI
from app.routes import fraud, income

app = FastAPI(title="ML Service", version="1.0")

app.include_router(fraud.router, prefix="/fraud")
app.include_router(income.router, prefix="/income")

@app.get("/")
def root():
    return {"message": "ML Service Running"}