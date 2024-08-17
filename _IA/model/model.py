import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from tensorflow.keras.preprocessing.image import ImageDataGenerator
import pickle
import json

# Créer un modèle CNN simple
def create_model(input_shape, num_classes):
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Conv2D(128, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5),
        Dense(num_classes, activation='softmax')
    ])

    model.compile(optimizer='adam',loss='categorical_crossentropy',metrics=['accuracy'])

    return model

# Configurer les paramètres
input_shape = (224, 224, 3)
num_classes = 17

# Créer le modèle
model = create_model(input_shape, num_classes)

# Afficher un résumé du modèle
model.summary()

# Préparer les générateurs de données pour l'entraînement et la validation
train_datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
train_generator = train_datagen.flow_from_directory(
    './datasets/',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='training'
)
validation_generator = train_datagen.flow_from_directory(
    './datasets/',
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    subset='validation'
)

# model training
history = model.fit(
    train_generator,
    steps_per_epoch=train_generator.samples // train_generator.batch_size,
    validation_data=validation_generator,
    validation_steps=validation_generator.samples // validation_generator.batch_size,
    epochs=10
)

# save the model architecture, weights, and optimizer state all in one file.
model.save('model_weights.h5', include_optimizer=False) # in use actually

#  save the model
model.save('medical_diagnosis_model.keras')

# Save only the model architecture to JSON
model_json = model.to_json()
with open("model_architecture.json", "w") as json_file:
    json_file.write(model_json)

# Save only the training history to a pickle file
with open('training_history.pkl', 'wb') as f:
    pickle.dump(history.history, f)

# Save training logs to a text file
with open('training_logs.txt', 'w') as f:
    for epoch in range(len(history.history['accuracy'])):
        f.write(f"Epoch {epoch+1}\n")
        f.write(f"Accuracy: {history.history['accuracy'][epoch]}\n")
        f.write(f"Validation Accuracy: {history.history['val_accuracy'][epoch]}\n")
        f.write(f"Loss: {history.history['loss'][epoch]}\n")
        f.write(f"Validation Loss: {history.history['val_loss'][epoch]}\n\n")


