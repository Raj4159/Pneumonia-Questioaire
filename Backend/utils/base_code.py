import tensorflow as tf
import numpy as np
from keras_preprocessing.image import load_img, img_to_array # Updated import
from PIL import Image

# Load the .h5 model
model_path = r"C:\Users\HP\Desktop\Atharva\Freelance\Pneumonia-detection\Backend\public\pneumonia_detection_ai_version_3.h5"  # Replace with the path to your .h5 model
model = tf.keras.models.load_model(model_path)

# Load the grayscale image
image_path = r"C:\Users\HP\Desktop\Atharva\Freelance\Pneumonia-detection\Backend\public\test_image.jpg"  # Replace with the path to your grayscale image
img_height, img_width = 200, 200  # Replace with your model's input dimensions

# Load and preprocess the image
# Grayscale mode is 'grayscale' in `load_img`
image = load_img(image_path, color_mode='grayscale', target_size=(img_height, img_width))
image_array = img_to_array(image)  # Convert to NumPy array
image_array = image_array / 255.0  # Normalize to [0, 1]
image_array = np.expand_dims(image_array, axis=0)  # Add batch dimension

# Test the model on the image
predictions = model.predict(image_array)

# Output the predictions
print("Predictions:", predictions)