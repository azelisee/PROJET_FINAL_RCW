import streamlit as st
import cv2
import os
import numpy as np
from PIL import Image
from descriptors import bitdesc
import pandas as pd
from scipy.spatial import distance
from distances import distance_selection
from upload import upload_file


def main():
    optionsFiltre = []
    print('Application lancée !')
    input_value = st.sidebar.number_input("Saisir une valeur", min_value=1, max_value=500, value=1, step=1)
    st.sidebar.write(f"Vous avez entré {input_value}")
    options = ["Euclidean", "Canberra", "Manhattan", "Chebyshev", "MinKowsky"]
    distance_option = st.sidebar.selectbox("Sélectionnez une distance", options)
    st.sidebar.write(f"Vous avez choisi la distance : {distance_option}")
    signatures = np.load('../offline_db/signature.npy')
    distanceList = []
    is_image_uploaded = upload_file()

    if is_image_uploaded:
        st.write('''# Resultat de la requête''')
        # Récupération de l'image de requête
        query_image = 'uploaded_images/query_image.png'
        # Lecture de l'image en niveaux de gris
        img = cv2.imread(query_image, 0)
        # Extraction des caractéristiques
        bit_feat = bitdesc(img)

        for sign in signatures:
            sign = np.array(sign)[0:-2].astype('float')
            sign = sign.tolist()
            dist = distance_selection(distance_option, bit_feat, sign)
            if dist is not None:
                distanceList.append(dist)
            else:
                # Gerer le cas ou le calcule de  distance retourne None
                distanceList.append(np.inf)  # or some large value

        print("Distances calculées avec succès")

        minDistances = []

        for i in range(input_value):
            array = np.array([d for d in distanceList if d is not None])
            if len(array) == 0:
                break
            index_min = np.argmin(array)
            minDistances.append(index_min)
            max_value = array.max()
            distanceList[index_min] = max_value

        print(minDistances)
        image_paths = [signatures[small][-1] for small in minDistances]
        classes = [signatures[small][-2] for small in minDistances]
        classes = np.array(classes)

        unique_values, counts = np.unique(classes, return_counts=True)
        list_classes = []
        print("Valeurs uniques et leurs fréquences")

        for value, count in zip(unique_values, counts):
            print(f"{value}:{count}")
            optionsFiltre.append(value)
            list_classes.append(value)

        df = pd.DataFrame({"Valeur": unique_values, "Fréquence": counts})
        st.bar_chart(df.set_index("Valeur"))


if __name__ == "__main__":
    main()
