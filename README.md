# 📩 Détection de SPAM – Application Web ML

Ce document détaille l'implémentation de la version MVP (Minimum Viable Product) de l'application et la stratégie de transition vers le modèle Machine Learning final.

---

## 🚀 1. État Actuel

### Stack Frontend
- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS 4 (Design "Premium" Glassmorphism)
- **Internationalisation** : Gestion d'état React (`LanguageContext`) pour le support FR/MG.
- **Animations** : Framer Motion.

### Architecture Hybride
L'application utilise une approche hybride pour la détection de SPAM :

1.  **Français (FR)** : Les messages sont envoyés à une API Backend FastAPI hébergée (`https://fastapi-for-spamorham.onrender.com`). Ce backend utilise un modèle de Machine Learning (Logistic Regression + TF-IDF) entraîné sur un dataset local.
2.  **Malgache (MG)** : Les messages sont traités par un LLM (Llama 3 via OpenRouter) pour simuler la classification, faute de dataset suffisant pour l'instant.

```mermaid
graph LR
    A[Client (Browser)] -->|POST /api/predict| B(Next.js API Route)
    B -- Langue = FR --> C[Backend FastAPI (Render)]
    C -->|Prédiction ML| B
    B -- Langue = MG --> D[OpenRouter (LLM)]
    D -->|Simulation LLM| B
    B -->|JSON Result| A
```

---

## 👥 Équipe (ESIIA 5)
| Nom | Rôle |
|----|------|
| RAZANAJATOVO ANDRIANIMERINA Kinasaela | Machine Learning |
| RASOANAIVO Aro Itokiana | Machine Learning |
| ANDRIAMASINORO Aina Maminirina | Backend |
| RABEMANANTSOA Fanilonombana Diana | Frontend |
| VONJINIAINA Josoa | Documentation & Déploiement |

---

## 🛠 Stack Technique

### 🔙 Backend & Machine Learning
- **Langage** : Python 3.13
- **Framework** : FastAPI
- **ML** : Scikit-learn, Pandas, Numpy, NLTK
- **Déploiement** : Render

### 🎨 Frontend
- **Framework** : Next.js 16, React
- **Styling** : Tailwind CSS
- **Déploiement** : Vercel

---

## 📊 Données & Modèle (Backend FR)
- **Dataset** : SMS en français (nettoyé et prétraité).
- **Prétraitement** : Minuscules, suppression de bruit (chiffres, ponctuation), retrait des stop words, tokenisation.
- **Modèle** : Régression Logistique avec vectorisation TF-IDF.
- **Métriques** : Accuracy et F1-score maximisés.
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
👉 https://spamorham-mu.vercel.app/

---

## 📈 Résultats
- Accuracy : 0.8
- F1-score : 0.75

---

## ▶️ Lancer le projet en local

### Frontend
```bash
cd frontend/my-app
npm install
npm run dev
```

### Backend (Développement)
```bash
cd backend
# Créer un venv
python -m venv venv
# Activer le venv (Windows)
.\venv\Scripts\activate
# Installer les dépendances
pip install -r requirements.txt
# Lancer le serveur
uvicorn main:app --reload
```

---

**[Lien de l'application](https://spamorham-mu.vercel.app/)**
