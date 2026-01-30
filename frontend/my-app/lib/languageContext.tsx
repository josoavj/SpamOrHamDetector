"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'FR' | 'MG';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
    FR: {
        heroTitle: "Détecteur de SPAM Intelligent",
        heroSubtitle: "Analysez vos messages avec la puissance de l'IA",
        spam: "SPAM",
        ham: "HAM",
        analyze: "Analyser le message",
        placeholder: "Saisissez votre message ici...",
        confidence: "Score de confiance",
        explanation: "Explication",
        team: "L'Équipe",
        footerText: "Institut Supérieur Polytechnique de Madagascar",
        loading: "Analyse en cours...",
        result: "Résultat",
        error: "Une erreur est survenue.",
        tryAgain: "Réessayer",
        ispm: "ISPM",
        projectGoal: "Objectif : Détecter si un message est SPAM ou HAM avec un score de confiance.",
        techStack: "Stack Technique",
        model: "Modèle ML (TF-IDF + Régression Logistique)",
    },
    MG: {
        heroTitle: "Mpitily SPAM Manan-tsaina",
        heroSubtitle: "Hamarino ny hafatrao amin'ny alalan'ny AI",
        spam: "SPAM",
        ham: "HAM (Tsy SPAM)",
        analyze: "Hamarinina ny hafatra",
        placeholder: "Soraty eto ny hafatrao...",
        confidence: "Taha-pahatokisana",
        explanation: "Fanazavana",
        team: "Ekipa",
        footerText: "Institut Supérieur Polytechnique de Madagascar",
        loading: "Eo am-panaovana analyse...",
        result: "Valiny",
        error: "Nisy olana nitranga.",
        tryAgain: "Andramo indray",
        ispm: "ISPM",
        projectGoal: "Tanjona : Hamantatra raha SPAM na HAM ny hafatra ary manome taha-pahatokisana.",
        techStack: "Teknolojia",
        model: "Modely ML (TF-IDF + Régression Logistique)",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('FR');

    const t = (key: string) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
