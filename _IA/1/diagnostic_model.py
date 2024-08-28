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
model = tf.keras.models.load_model('./model_saves/medical_diagnosis_model.h5')
model.compile(optimizer='rmsprop', loss='categorical_crossentropy', metrics=['accuracy'])

# Évaluer le modèle
results = model.evaluate(validation_generator)
print("Evaluation Results:", results)

# Mapping of class indices to human-readable diagnosis names
diagnosis_mapping = {
    0: 'Akne',
    1: 'Alzheimer',
    2: 'Benign Brain Disorder',
    3: 'Benign Skin Disease',
    4: 'Blood Cells Cancer',
    5: 'Bone Fracture',
    6: 'Brain Tumor',
    7: 'Cataract',
    8: 'Diabetic Retinopathy',
    9: 'Doubtful Knee Arthritis',
    10: 'Doubtful Knee Osteoarthritis',
    11: 'Dyed-Lifted Polyps',
    12: 'Dyed Resection Margins',
    13: 'Ekzama',
    14: 'Enfeksiyonel',
    15: 'Esophagitis',
    16: 'Glaucoma',
    17: 'Kidney Cyst',
    18: 'Kidney Stone',
    19: 'Kidney Tumor',
    20: 'Leukemia Segmented',
    21: 'Lung Adenocarcinoma',
    22: 'Lung Squamous Cell Carcinoma',
    23: 'Malign Skin Disease',
    24: 'Malignant Brain Disorder',
    25: 'Mild Knee Arthritis',
    26: 'Mild Knee Osteoarthritis',
    27: 'Moderate Knee Arthritis',
    28: 'Moderate Knee Osteoarthritis',
    29: 'No Bone Fracture',
    30: 'No Brain Disorder',
    31: 'No Brain Tumor',
    32: 'No Cataract',
    33: 'No Glaucoma',
    34: 'No Knee Arthritis',
    35: 'No Knee Osteoarthritis',
    36: 'No Leukemia',
    37: 'No Lung Cancer',
    38: 'No Pneumonia',
    39: 'Normal Kidney',
    40: 'Normal Cecum',
    41: 'Normal Pylorus',
    42: 'Normal Z-Line',
    43: 'Pigment',
    44: 'Pneumonia',
    45: 'Polyps',
    46: 'Prostate Cancer',
    47: 'Severe Knee Arthritis',
    48: 'Severe Knee Osteoarthritis',
    49: 'Ulcerative Colitis'
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