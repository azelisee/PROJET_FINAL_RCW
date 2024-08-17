from dotenv import load_dotenv
import os
import numpy as np

load_dotenv()

if os.getenv("TF_ENABLE_ONEDNN_OPTS") == "0":
    print("oneDNN options disabled.")

import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Définir les générateurs de données
train_datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
validation_generator = train_datagen.flow_from_directory(
    './datasets/',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# Load and compile the model only once during startup
model = tf.keras.models.load_model('./save files from model/model_weights.h5')
model.compile(optimizer='rmsprop', loss='categorical_crossentropy', metrics=['accuracy'])

# Évaluer le modèle
results = model.evaluate(validation_generator)
print("Evaluation Results:", results)

# Mapping of class indices to human-readable diagnosis names
diagnosis_mapping = {
    0: 'Brain Tumor Classification (MRI)',
    1: 'Bone Fracture Detection',
    2: 'Chest X-ray',
    3: 'Diabetic Retinopathy',
    4: 'Glaucoma',
    5: 'Cataract',
    6: 'Endocrinology',
    7: 'Allergy and Immunology',
    8: 'Cardiology',
    9: 'Dermatology',
    10: 'Emergency Medicine',
    11: 'Gastroenterology',
    12: 'Geriatrics',
    13: 'Hematology',
    14: 'Neurosurgery',
    15: 'Ophthalmology',
    16: 'Orthopedics',
}
print("diagnosis_mapping : ", diagnosis_mapping)

def diagnose_image(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    predictions = model.predict(img_array)
    diagnosis_index = np.argmax(predictions, axis=1)[0]
    diagnosis = diagnosis_mapping.get(diagnosis_index, "Unknown diagnosis")

    print(f"Image path: {image_path}")
    print(f"Model predictions: {predictions}")
    print(f"Diagnostic concluded: {diagnosis}")

    return diagnosis

#diagnose_image('./datasets/01_TUMOR/10009_CRC-Prim-HE-03_009.tif_Row_301_Col_151.tif')