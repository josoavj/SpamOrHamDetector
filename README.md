<<<<<<< HEAD
# 📩 Détection de SPAM – Application Web ML

## 🏫 Institut
**ISPM – Institut Supérieur Polytechnique de Madagascar**  
🌐 https://www.ispm-edu.com

---

## 🎯 Objectif du projet
Développer une application web capable de détecter si un message texte (SMS) est un **SPAM** ou un **HAM (non-spam)**, tout en fournissant un **score de confiance** basé sur un modèle de Machine Learning.

---

## 👥 Équipe (ESIIA 5)
| Nom | Rôle |
|----|------|
| Membre 1 | Machine Learning |
| Membre 2 | Machine Learning |
| Membre 3 | Backend |
| RABEMANANTSOA Fanilonombana Diana | Frontend |
| Membre 5 | Documentation / Intégration |

---

## 🧱 Stack technologique

### 🔙 Backend & Machine Learning
- Python 3
- FastAPI
- Scikit-learn
- Pandas
- Numpy
- NLTK / SpaCy
- Joblib

### 🎨 Frontend
- Next.js
- React
- Tailwind CSS

### ☁️ Déploiement
- Backend : Render / Railway
- Frontend : Vercel
- Formulaire : Google Forms

---

## 📊 Données
- Dataset principal : SMS en **français**
- Sources : Kaggle / HuggingFace (datasets open)
- Les données sont nettoyées et prétraitées avant l’entraînement.

---

## ⚙️ Prétraitement
- Mise en minuscules
- Suppression de la ponctuation
- Suppression des caractères spéciaux
- Suppression des stop words (français)
- Tokenisation

---

## 🤖 Modèle de Machine Learning
- Vectorisation : **TF-IDF**
- Modèle : **Régression Logistique**
- Métriques :
  - Accuracy
  - F1-score
- Le modèle retourne :
  - Une prédiction (SPAM / HAM)
  - Une probabilité associée

---

## 🌐 Fonctionnement de l’application
1. L’utilisateur saisit un message via Google Form
2. Le message est envoyé à l’API backend
3. Le modèle ML analyse le message
4. La prédiction et le score de confiance sont retournés

---

## 🚀 Déploiement
- API backend hébergée et accessible publiquement
- Application disponible à l’évaluation

🔗 **Lien de l’application** :  
👉 *À renseigner*

---

## 📈 Résultats
- Accuracy : *À renseigner*
- F1-score : *À renseigner*

---

## ▶️ Lancer le projet en local

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
=======
# SpamOrHamDetector
Application web de détection message SPAM ou HAM
>>>>>>> c4e2c707971fff989c335d523b6bc8ba7960597f
