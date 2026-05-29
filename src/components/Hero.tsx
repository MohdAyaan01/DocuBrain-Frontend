import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ClickUser.css';

const Hero: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-4 overflow-hidden bg-zinc-950 text-zinc-100">
            {/* Ambient Animated Gradients */}
            <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[10%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 rounded-full blur-[150px] pointer-events-none" 
            />
            <motion.div 
                animate={{ scale: [1, 1.5, 1], rotate: [0, -90, 0] }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[150px] pointer-events-none" 
            />
            
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10 w-full">
                {/* Text Content */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-white/10 shadow-inner mb-8">
                        <span className="w-2 h-2 rounded-full bg-fuchsia-500 animate-pulse"></span>
                        <span className="text-sm font-medium tracking-wide text-zinc-300">DocuBrain AI Model 2.0</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
                        Understand <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 bg-[length:200%_auto] animate-gradient">
                            any document.
                        </span>
                        <br /> instantly.
                    </h1>
                    
                    <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-light">
                        DocuBrain harnesses advanced AI to instantly read, summarize, and answer questions about your PDFs. Stop skimming and start understanding.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/signup")}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-zinc-950 rounded-full font-bold text-lg shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] hover:bg-zinc-100 transition-all flex items-center justify-center gap-2"
                        >
                            Try it for free
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        </motion.button>
                        
                        <motion.a 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            href="#demo"
                            className="w-full sm:w-auto px-8 py-4 bg-zinc-900/80 border border-white/10 hover:border-white/20 hover:bg-zinc-800 text-white rounded-full font-medium text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-md"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                            View Demo
                        </motion.a>
                    </div>
                </motion.div>

                {/* Hero Graphic / Dashboard Preview */}
                <motion.div 
                    initial={{ opacity: 0, x: 50, rotateY: -10 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    className="flex-1 w-full max-w-2xl perspective-1000"
                >
                    <div className="relative w-full rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-4 shadow-2xl overflow-hidden transform-gpu hover:rotate-0 transition-transform duration-700">
                        {/* Mockup Top Bar */}
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                        </div>
                        
                        {/* Mockup Content */}
                        <div className="flex flex-col gap-4">
                            <div className="flex gap-4">
                                <div className="w-1/3 aspect-square bg-zinc-800/80 rounded-2xl border border-white/5 flex flex-col items-center justify-center p-4">
                                    <svg className="w-12 h-12 text-indigo-400 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                                    <div className="w-16 h-2 bg-zinc-700 rounded-full mt-2"></div>
                                </div>
                                <div className="w-2/3 bg-zinc-800/80 rounded-2xl border border-white/5 p-5">
                                    <div className="w-full h-3 bg-zinc-700/50 rounded-full mb-3"></div>
                                    <div className="w-5/6 h-3 bg-zinc-700/50 rounded-full mb-3"></div>
                                    <div className="w-4/6 h-3 bg-zinc-700/50 rounded-full mb-3"></div>
                                    <div className="w-full h-3 bg-zinc-700/50 rounded-full"></div>
                                </div>
                            </div>
                            
                            <div className="bg-gradient-to-br from-indigo-500/20 to-fuchsia-600/20 rounded-2xl p-4 border border-indigo-500/30">
                                <p className="text-sm font-medium text-white mb-2">AI Summary Generated</p>
                                <p className="text-xs text-zinc-300 leading-relaxed">This document outlines the core architectural principles of the new engine, highlighting the parallel processing pipeline and the memory management subsystem which improves overall throughput by 40%.</p>
                            </div>
                        </div>

                        {/* Floating elements attached to mockup */}
                        <motion.div 
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-6 -bottom-6 bg-zinc-800/90 backdrop-blur-md p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-white">Analyzed in 2s</p>
                                <p className="text-xs text-zinc-400">120 pages processed</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
            
            <style>{`
                .animate-gradient {
                    background-size: 200% auto;
                    animation: textGradient 4s linear infinite;
                }
                @keyframes textGradient {
                    to {
                        background-position: 200% center;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;