from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import re
import os
from dotenv import load_dotenv

load_dotenv()

#initialisation de NLTK
nltk.download('stopwords', quiet=True)
nltk.download('punkt', quiet=True)
stop_words = set(stopwords.words('french'))

#Chargement modèle et vectorizer
model = joblib.load('../spam_model.pkl')
vectorizer = joblib.load('../vectorizer.pkl')
app = FastAPI()

#Utilisation de CORS pour ne pas bloquer l'accès du frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins= {'https://spamorham-mu.vercel.app'}, #adresse du frontend
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

#Modèle de requête 
class Message(BaseModel):
    text: str
    
#Prétraitement du message
def traitement_texte(texte):
    texte = texte.lower()
    texte = re.sub(r'\d+', '', texte) #Supprime tous les chiffres 
    texte = re.sub(r'[^\w\s]', '', texte) #Supprime les ponctuations et les symboles
    tokens = word_tokenize(texte) #Decoupe le message en liste de mot
    tokens = [mot for mot in tokens if mot not in stop_words]
    return ' '.join(tokens)

@app.post('/prediction')
async def predict(message: Message):
    if not message.text:
        raise HTTPException(status_code=400, detail="Message vide")
    
    processed = traitement_texte(message.text)
    vect = vectorizer.transform([processed])
    prediction = model.predict(vect)[0]
    probability = model.predict_proba(vect)[0][1]

    resultat = "SPAM" if prediction == 1 else "HAM"
    confiance = probability if prediction == 1 else 1 - probability

    return {"prediction": resultat, "confiance": round(confiance, 2)}

#Juste pour tester l'Api
@app.get("/")
def root():
    return {"message" : "Mandeha ilay API"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port='8000')

