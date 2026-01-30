"use client";

import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { SpamDetector } from '../components/SpamDetector';
import { Footer } from '../components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0f172a] text-white selection:bg-blue-500/30 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/20 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 font-sans">
        <Navbar />
        <div className="flex flex-col min-h-screen">
          <Hero />
          <SpamDetector />
          <div className="flex-1" />
          <Footer />
        </div>
      </div>
    </main>
  );
}
