def recommend_treatment(diagnosis):
    if diagnosis == 0:
        return "Recommander une radiothérapie"
    elif diagnosis == 1:
        return "Recommander une chimiothérapie"
    elif diagnosis == 2:
        return "Recommander une intervention chirurgicale"
    else:
        return "Recommander une consultation avec un spécialiste"

def refer_to_specialist(diagnosis):
    if diagnosis == 0:
        return "Référer à un oncologue"
    elif diagnosis == 1:
        return "Référer à un hématologue"
    elif diagnosis == 2:
        return "Référer à un chirurgien"
    else:
        return "Référer à un médecin généraliste"
