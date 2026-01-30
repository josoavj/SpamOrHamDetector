"use client";

import React from 'react';
import { useLanguage } from '../lib/languageContext';

export const Footer = () => {
    const { t } = useLanguage();

    return (
        <footer className="mt-20 py-8 border-t border-white/5 text-center text-sm text-gray-500">
            <p>© 2024 {t('footerText')}.</p>
            <p className="mt-2 text-xs opacity-50">Project SPAM/HAM ML</p>
        </footer>
    );
};
