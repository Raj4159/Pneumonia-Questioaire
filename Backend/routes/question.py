from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import pandas as pd

# Load model
model_path = r"E:\Pneumonia\Pneumonia_Questioaire\Backend\public\best_pneumonia_model_random_forest.pkl"
best_model_rf = joblib.load(model_path)

question_router = APIRouter()

# Define request model
class InputData(BaseModel):
    Age: int
    iron_deficiency: int
    chronic_obstructive_pulmonary_disease: int
    sepsis: int
    cerebrovascular_disease: int
    cardiorespitory_failure: int
    dementia: int
    protein_calorie_malnutrition: int
    vascular_disease: int
    chronic_lung_disorder: int
    parkinson: int
    tracheostomy: int
    history_of_pneumonia: int
    hypertension: int
    gender_Male: int

@question_router.post("/question", response_model=dict)  # Ensure this is correctly defined
async def predict(data: InputData):
    try:
        input_df = pd.DataFrame([data.dict()])
        probabilities = best_model_rf.predict_proba(input_df)[0]
        p0, p1 = probabilities  # Unpack probabilities

        result = {
            "Probability of No Chemical Pneumonia": f"{p0:.2%}",
            "Probability of Chemical Pneumonia": f"{p1:.2%}",
            "Prediction": "Chemical Pneumonia present (1)" if p1 > 0.70 else "No Chemical Pneumonia (0)"
        }
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
