from fastapi import APIRouter, File, UploadFile
from fastapi.responses import JSONResponse
from utils.process_image import preprocess_image, predict_image
import io

# Define the router
router = APIRouter()

@router.post("/predict/")
async def predict(image: UploadFile = File(...)):
    try:
        image_content = await image.read()
        if not image_content:
            return JSONResponse(content={"error": "No image received"}, status_code=400)

        print(f"Received image: {image.filename}, Size: {len(image_content)} bytes")

        processed_image = preprocess_image(io.BytesIO(image_content))
        predicted_class = predict_image(processed_image)

        print(f"Prediction: {predicted_class}")  # Debugging Line

        return JSONResponse(content={"prediction": int(predicted_class)})
    except Exception as e:
        print(f"Error: {str(e)}")  # Debugging Line
        return JSONResponse(content={"error": str(e)}, status_code=400)

