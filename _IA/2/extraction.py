import numpy as np
import os
from descriptors import bitdesc
import cv2

# Define base path to your dataset
base_path = "../Grp_461_Labo2_AZOUMA_Kokou_Elisee/datasets/"

def main():
    listOfCharacteristics = []
    print("Commencer l'extraction des caractéristiques...")

    # Get list of directories (image classes) in the base path
    classes = os.listdir(base_path)

    for img_class in classes:
        class_path = os.path.join(base_path, img_class)
        for filename in os.listdir(class_path):
            img_name = os.path.join(class_path, filename)
            img = cv2.imread(img_name, 0)  # Read image in grayscale (0)

            if img is None:
                print(f"Erreur: impossible de lire l'image à {img_name}.")
            else:
                features = bitdesc(img) + [img_class] + [img_name]
                listOfCharacteristics.append(features)

    final_array = np.array(listOfCharacteristics)
    np.save('./offline_db/signature.npy', final_array)
    print("Extraction des caractéristiques terminée")

if __name__ == "__main__":
    main()
