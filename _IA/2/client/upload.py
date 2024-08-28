import streamlit as st
from PIL import Image
import os


def upload_file():
    uploaded_file = st.file_uploader("Choisissez un fichier image", type=["png", "jpg", "jpeg", "PNM", "tiff"])
    if uploaded_file is not None:
        dossier = "uploaded_images"
        # Création du dossier s'il n'existe pas encore
        if not os.path.exists(dossier):
            os.makedirs(dossier)
        newFileName = "query_image.png"
        roadToNewFile = os.path.join(dossier, newFileName)
        with open(roadToNewFile, "wb") as f:
            f.write(uploaded_file.getbuffer())
        image = Image.open(roadToNewFile)
        st.image(image, caption="image de la requete")
        return True
    else:
        st.write("Aucun fichier sélectionné")
        return False
