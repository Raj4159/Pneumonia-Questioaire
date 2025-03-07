from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
# from utils.process_image import preprocess_image, predict_image
import io

# Define the router
router = APIRouter()

@router.post("/predict/")
async def predict(image: UploadFile = File(...)):
    try:
        # Read image content from the uploaded file
        image_content = await image.read()
        
        # # Preprocess the uploaded image
        # processed_image = preprocess_image(io.BytesIO(image_content))
        
        # # Make prediction
        # predictions = predict_image(processed_image)
        return {"0.8"}         
        # Return the prediction
        return JSONResponse(content={"predictions": predictions.tolist()})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=400)


