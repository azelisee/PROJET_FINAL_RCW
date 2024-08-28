from flask import Flask, request
import pickle
import numpy as np
import cv2, os, time
from PIL import Image
from descriptors import bitdesc
import pandas as pd
from scipy.spatial import distance
from distances import distance_selection

# Création d'une instance de l'application Flask
app = Flask(__name__)
# Port de l'application
PORT = 3000

signatures = np.load('../offline_db/signature.npy')

# Liste pour stocker les distances calculées
distanceList = []

def search(distance_option):
    # Récupération de l'image de la requête
    query_image = 'uploaded_images/query_image.png'
    # Lecture de l'image en niveaux de gris
    img = cv2.imread(query_image, 0)
    # Extraction des caractéristiques de l'image
    bit_feat = bitdesc(img)

    # Calcul des distances de similarité entre l'image de requête et les images de la base de données
    for sign in signatures:
        # Suppression des deux dernières colonnes ('subfolder', 'path')
        sign = np.array(sign)[0:-2].astype('float')
        # Conversion numpy en liste
        sign = sign.tolist()
        dist = distance_selection(distance_option, bit_feat, sign)
        distanceList.append(dist)

    print("Distance calculee avec succes",)
    # Calcul des distances minimales
    minDistances = list()
    # ...

# Route par défaut pour l'application
@app.route('/', methods=['GET'])
def entry():
    return "model"



if __name__ == "__main__":
    app.run(port=PORT, debug=True)
