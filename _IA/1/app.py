from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File
from diagnostic_model import diagnose_image
from treatment_recommendation import recommend_treatment, refer_to_specialist
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/diagnose/")
async def diagnose(file: UploadFile = File(...)):
    # Ensure the temp directory exists
    os.makedirs("temp", exist_ok=True)

    image_path = f"temp/{file.filename}"
    with open(image_path, "wb") as buffer:
        buffer.write(file.file.read())

    diagnosis = diagnose_image(image_path)
    treatment = recommend_treatment(diagnosis)
    specialist = refer_to_specialist(diagnosis)

    # Optionally delete the image after processing to save space
    os.remove(image_path)

    return {
        "diagnosis": diagnosis,
        "treatment": treatment,
        "specialist": specialist
    }
