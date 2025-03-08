import torch
import torchvision.models as models
import torchvision.transforms as transforms
from PIL import Image
import io
import numpy as np

# Step 1: Load the fine-tuned ResNet-18 model
model = models.resnet18(pretrained=False)
model.fc = torch.nn.Linear(in_features=512, out_features=2)  # Adjust output for 2 classes

# Step 2: Load model weights
model_path = "public/chest_xray_pneumonia_model.pth"  # Ensure this file exists
model.load_state_dict(torch.load(model_path, map_location=torch.device("cpu")))
model.eval()  # Set model to evaluation mode

# Define preprocessing transformations (same as training)
transform = transforms.Compose([
    transforms.Resize((224, 224)),  # Resize to model's expected input size
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])

def preprocess_image(image_file: io.BytesIO):
    """
    Preprocess the input image:
    - Convert to grayscale
    - Resize to model input (224x224)
    - Normalize using ImageNet mean/std
    - Add batch dimension for inference
    """
    image = Image.open(image_file)
    
    # Convert to RGB (since ResNet expects 3-channel input)
    image = image.convert("RGB")
    
    # Apply transformations
    image_tensor = transform(image).unsqueeze(0)  # Add batch dimension
    
    return image_tensor

def predict_image(processed_image):
    """
    Predict the class of the image using the ResNet model.
    """
    with torch.no_grad():
        output = model(processed_image)
    
    # Get predicted class index
    predicted_class = torch.argmax(output, dim=1).item()

    # Class label mapping
    # class_labels = {0: "Normal (Healthy)", 1: "Pneumonia"}
    
    return predicted_class
