"use client";

import React, { useState } from 'react';
import { useLanguage } from '../lib/languageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, CheckCircle, AlertTriangle, RefreshCw, Send } from 'lucide-react';

export const SpamDetector = () => {
    const { t, language } = useLanguage();
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const analyze = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setResult(null);
        setError(null);

        try {
            const res = await fetch('/api/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: input, language })
            });

            if (!res.ok) throw new Error('API Error');

            const data = await res.json();
            setResult(data);
        } catch (err) {
            setError(t('error'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="px-6 max-w-2xl mx-auto w-full">
            <div className="glass-panel rounded-2xl p-6 md:p-8">
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={t('placeholder')}
                    className="w-full bg-black/20 text-white rounded-xl p-4 text-lg border border-white/5 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-all min-h-[150px] resize-none"
                />

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={analyze}
                        disabled={loading || !input.trim()}
                        className="glass-button px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <>
                                <RefreshCw className="w-5 h-5 animate-spin" />
                                {t('loading')}
                            </>
                        ) : (
                            <>
                                <Send className="w-5 h-5" />
                                {t('analyze')}
                            </>
                        )}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-8 glass-panel rounded-2xl p-6 md:p-8 border-l-4"
                        style={{ borderLeftColor: result.label === 'SPAM' ? '#ef4444' : '#22c55e' }}
                    >
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-full ${result.label === 'SPAM' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                                {result.label === 'SPAM' ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-2xl font-bold text-white">
                                        {result.label === 'SPAM' ? t('spam') : t('ham')}
                                    </h3>
                                    <div className="text-right">
                                        <span className="text-sm text-gray-400 block">{t('confidence')}</span>
                                        <span className="text-xl font-mono text-white">{result.score}%</span>
                                    </div>
                                </div>

                                {/* Gauge */}
                                <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden mb-4">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.score}%` }}
                                        transition={{ duration: 1, ease: 'easeOut' }}
                                        className={`h-full ${result.label === 'SPAM' ? 'bg-red-500' : 'bg-green-500'}`}
                                    />
                                </div>

                                {result.explanation && (
                                    <div className="bg-white/5 p-4 rounded-lg text-sm text-gray-300">
                                        <strong className="block text-gray-400 mb-1">{t('explanation')}:</strong>
                                        {result.explanation}
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl text-red-200 text-center">
                    {error}
                </div>
            )}
        </section>
    );
};
