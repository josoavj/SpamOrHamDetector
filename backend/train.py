import pandas as pd

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score
import joblib
import re
import nltk

#Traitement du texte

nltk.download('stopwords', quiet=True)
nltk.download('punkt_tab', quiet=True)
stop_words = set(stopwords.words('french'))

def traitement_texte(texte):
    texte = texte.lower()
    texte = re.sub(r'\d+', '', texte) #Supprime tous les chiffres
    texte = re.sub(r'[^\w\s]', '', texte) #Supprime les ponctuations et les symboles
    tokens = word_tokenize(texte) #Decoupe le message en liste de mot
    tokens = [mot for mot in tokens if mot not in stop_words]
    return ' '.join(tokens)

#CHargement du dataset
df = pd.read_csv('data/spam_dataset.csv')
df['processed_message'] = df['text'].apply(traitement_texte)

#Vectorisation
vectorizer = TfidfVectorizer(max_features=5000)
x = vectorizer.fit_transform(df['processed_message'])
y = df['label']

# Split
X_train, X_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# Modèle (libre : ici LogisticRegression, mais teste RandomForest ou autres)
model = LogisticRegression()
model.fit(X_train, y_train)

# Évaluation (pour README : accuracy et F1-score)
predictions = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, predictions)}")
print(f"F1-Score: {f1_score(y_test, predictions, pos_label='spam')}")

# Sauvegarde
joblib.dump(model, 'spam_model.pkl')
joblib.dump(vectorizer, 'vectorizer.pkl')