# 📑 Rapport Technique MVP - Détecteur de SPAM

Ce document détaille l'implémentation de la version MVP (Minimum Viable Product) de l'application et la stratégie de transition vers le modèle Machine Learning final.

---

## 🚀 1. État Actuel (MVP)

### Stack Frontend
- **Framework** : Next.js 16 (App Router)
- **Langage** : TypeScript
- **Styling** : Tailwind CSS 4 (Design "Premium" Glassmorphism)
- **Internationalisation** : Gestion d'état React (`LanguageContext`) pour le support FR/MG.
- **Animations** : Framer Motion.

### Architecture Actuelle
L'application fonctionne actuellement en mode "Simulation" pour permettre à l'équipe de visualiser le rendu final et les interactions sans attendre le modèle ML.

```mermaid
graph LR
    A[Client (Browser)] -->|POST /api/predict| B(Next.js API Route)
    B -->|API Request| C[OpenRouter (LLM)]
    C -->|Simulation SPAM/HAM| B
    B -->|JSON Result| A
```

### Fonctionnalités Implémentées
1.  **Interface Utilisateur** : Design sombre, moderne, responsive.
2.  **Saisie** : Zone de texte pour les SMS/Messages.
3.  **Détection** :
    - Utilisation d'un LLM (via OpenRouter) pour simuler la classification.
    - Retourne : Label (SPAM/HAM), Score de confiance (%), et une courte explication.
4.  **Multilingue** : Bascule instantanée entre Français et Malgache.

---

## 🔮 2. Stratégie de Transition (Vers le Backend Python)

Actuellement, le dossier `backend/` est vide. Voici la marche à suivre pour intégrer le vrai modèle ML une fois développé par l'équipe Data.

### 2.1. Développement du Backend Python
L'équipe Backend/ML devra créer une API (idéalement avec **FastAPI**) dans le dossier `backend/`.

**Contrat d'Interface (API Contract)** :
Pour que le frontend continue de fonctionner sans modification majeure, l'API Python doit exposer une route (ex: `/predict`) qui accepte et retourne le format suivant :

**Requête (POST)** :
```json
{
  "text": "Message à analyser",
  "language": "FR" // ou "MG"
}
```

**Réponse attendue (JSON)** :
```json
{
  "label": "SPAM",    // ou "HAM"
  "score": 95,        // Entier ou flottant (0-100)
  "explanation": "..." // Optionnel
}
```

### 2.2. Modification du Frontend
Une fois l'API Python opérationnelle (ex: `http://localhost:8000/predict`), la transition se fait en modifiant un seul fichier côté Frontend.

**Fichier à modifier** : `frontend/my-app/app/api/predict/route.ts`

**Changement à effectuer** :
Au lieu d'appeler OpenRouter, l'API Route de Next.js agira comme un "proxy" vers votre backend Python.

```typescript
// frontend/my-app/app/api/predict/route.ts

// ... (code existant)

// REMPLACER L'APPEL OPENROUTER PAR CECI :
const pythonBackendUrl = "http://localhost:8000/predict"; // URL de votre backend Python

const response = await fetch(pythonBackendUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text, language })
});

const data = await response.json();
return NextResponse.json(data);
```

### 2.3. Avantages de cette architecture
- **Sécurité** : Le frontend ne communique jamais directement avec le modèle brut, mais passe par l'API Route de Next.js (qui peut gérer l'authentification, le rate-limiting, etc.).
- **Indépendance** : L'équipe ML peut faire évoluer le modèle, changer de librairie (Scikit-learn -> PyTorch) sans casser le Frontend, tant que le JSON de sortie reste le même.

---

## 🛠 Commandes Utiles

### Lancer le Frontend (MVP)
```bash
cd frontend/my-app
npm install
npm run dev
```

### Prochaines étapes (Backend)
1. Initialiser le dossier `backend` (virtualenv, requirements.txt).
2. Créer le script d'entraînement (`train.py`) et sauvegarder le modèle (ex: `model.pkl`).
3. Créer l'API FastAPI (`main.py`) pour charger le modèle et servir les prédictions.
