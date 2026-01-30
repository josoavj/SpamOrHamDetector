"use client";

import React from 'react';
import { useLanguage } from '../lib/languageContext';
import { motion } from 'framer-motion';

export const Navbar = () => {
    const { language, setLanguage, t } = useLanguage();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                    S
                </div>
                <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    SpamDetector
                </span>
            </div>

            <div className="flex items-center gap-4">
                <div className="relative flex bg-white/10 rounded-full p-1">
                    <motion.div
                        layout
                        className="absolute top-1 bottom-1 bg-blue-500 rounded-full w-[50%]"
                        initial={false}
                        animate={{
                            left: language === 'FR' ? '4px' : '50%'
                        }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                    <button
                        onClick={() => setLanguage('FR')}
                        className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${language === 'FR' ? 'text-white' : 'text-gray-400'}`}
                    >
                        FR
                    </button>
                    <button
                        onClick={() => setLanguage('MG')}
                        className={`relative z-10 px-3 py-1 text-sm font-medium transition-colors ${language === 'MG' ? 'text-white' : 'text-gray-400'}`}
                    >
                        MG
                    </button>
                </div>
            </div>
        </nav>
    );
};
