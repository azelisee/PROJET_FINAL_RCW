import h5py

# Ouvrir le fichier HDF5
with h5py.File('./medical_diagnosis_model.h5', 'r') as hdf:
    # Explorer le groupe des poids du modèle
    model_weights = hdf.get('model_weights/conv2d')
    for layer_name in model_weights.keys():
        layer = model_weights[layer_name]

        if isinstance(layer, h5py.Dataset):  # Vérifier si c'est un dataset
            print(f"Layer: {layer_name}")
            weights = layer[:]  # Extraire les données du dataset
            print(f"Weights: {weights}")
        else:
            print(f"{layer_name} is a group, not a dataset.")
