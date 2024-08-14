import tensorflow as tf
from tensorflow.keras.preprocessing import image
import numpy as np

model = tf.keras.models.load_model('./medical_diagnosis_model.h5')

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

def diagnose_image(image_path):
    img = image.load_img(image_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    predictions = model.predict(img_array)
    diagnosis = np.argmax(predictions, axis=1)

    return diagnosis[0]


result = diagnose_image('./datasets/EndoTect/Training dataset (Kvasir-SEG)/annotated_images/cju0qkwl35piu0993l0dewei2.jpg')
print(f"The diagnosis is: {result}")
