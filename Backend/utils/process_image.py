# utils.py
import tensorflow as tf
import numpy as np
from keras_preprocessing.image import load_img, img_to_array  # Updated import
from PIL import Image
import io

# Load the .h5 model
model_path = r"C:\Users\HP\Desktop\Atharva\Freelance\Pneumonia-detection\Backend\public\pneumonia_detection_ai_version_3.h5"  # Path to your model
model = tf.keras.models.load_model(model_path)

def preprocess_image(image_file: io.BytesIO):
    """
    Function to preprocess the image:
    - Convert to grayscale
    - Resize to model's input size
    - Normalize the image
    """
    # Open the image file using Pillow
    image = Image.open(image_file)
    
    # Convert image to grayscale
    image = image.convert('L')
    
    # Resize image to match model's input shape
    img_height, img_width = 200, 200  # Your model's input size
    image = image.resize((img_width, img_height))

    # Convert image to numpy array
    image_array = img_to_array(image)
    image_array = image_array / 255.0  # Normalize to [0, 1]
    image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension
    image_array = np.expand_dims(image_array, axis=-1)  # Add channel dimension for grayscale
    return image_array

def predict_image(processed_image):
    """
    Function to predict the class of the image using the pre-loaded model.
    """
    predictions = model.predict(processed_image)
    return predictions
