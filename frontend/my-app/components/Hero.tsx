"use client";

import React from 'react';
import { useLanguage } from '../lib/languageContext';
import { motion } from 'framer-motion';

export const Hero = () => {
    const { t } = useLanguage();

    return (
        <section className="pt-32 pb-12 px-6 text-center max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider mb-6 border border-blue-500/20">
                    {t('ispm')}
                </span>
                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/60">
                    {t('heroTitle')}
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                    {t('heroSubtitle')}
                </p>
            </motion.div>
        </section>
    );
};
