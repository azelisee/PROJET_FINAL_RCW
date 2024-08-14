from fastapi import FastAPI, UploadFile, File
from diagnostic_model import diagnose_image
from treatment_recommendation import recommend_treatment, refer_to_specialist

app = FastAPI()

@app.post("/diagnose/")
async def diagnose(file: UploadFile = File(...)):
    image_path = f"temp/{file.filename}"
    with open(image_path, "wb") as buffer:
        buffer.write(file.file.read())

    diagnosis = diagnose_image(image_path)
    treatment = recommend_treatment(diagnosis)
    specialist = refer_to_specialist(diagnosis)

    return {
        "diagnosis": diagnosis,
        "treatment": treatment,
        "specialist": specialist
    }
