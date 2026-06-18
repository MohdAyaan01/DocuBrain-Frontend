import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    return (
        <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <nav className="flex items-center justify-between w-full max-w-5xl bg-zinc-950/40 backdrop-blur-xl border border-white/10 px-6 py-3.5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:rotate-6 transition-all duration-300">
                        <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="16" r="4" fill="#fff" />
                            <circle cx="16" cy="9" r="4" fill="#fff" />
                            <circle cx="16" cy="23" r="4" fill="#fff" />
                            <circle cx="23" cy="16" r="4" fill="#fff" />
                        </svg>
                    </div>
                    <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">DocuBrain</span>
                </Link>
                
                {/* Navigation links (Desktop) */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <a href="#features" className="text-zinc-400 hover:text-white transition-colors relative py-1 group">
                        Features
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    <a href="#how-it-works" className="text-zinc-400 hover:text-white transition-colors relative py-1 group">
                        How it works
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                    </a>
                    <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors relative py-1 group">
                        Pricing
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
                    </a>
                </div>

                {/* Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/login")}
                        className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-4 py-2 hover:bg-white/5 rounded-full"
                    >
                        Sign in
                    </button>
                    <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/signup")}
                        className="bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-400 hover:to-fuchsia-500 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md"
                    >
                        Get Started
                    </motion.button>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex md:hidden items-center gap-3">
                    <button 
                        onClick={() => navigate("/login")}
                        className="text-xs font-semibold text-zinc-300 hover:text-white transition-colors px-3 py-1.5"
                    >
                        Sign In
                    </button>
                    <button 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2.5 text-zinc-400 hover:text-white bg-zinc-900/50 rounded-full border border-white/5 outline-none transition-colors"
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-[calc(100%+12px)] left-0 right-0 bg-zinc-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-4 md:hidden z-50"
                        >
                            <a 
                                href="#features" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-white/5 transition-colors"
                            >
                                Features
                            </a>
                            <a 
                                href="#how-it-works" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-white/5 transition-colors"
                            >
                                How it works
                            </a>
                            <a 
                                href="#pricing" 
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-zinc-300 hover:text-white text-base font-medium py-2 border-b border-white/5 transition-colors"
                            >
                                Pricing
                            </a>
                            
                            <div className="flex flex-col gap-2.5 mt-2">
                                <button 
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/login");
                                    }}
                                    className="w-full py-3 bg-zinc-800/80 hover:bg-zinc-800 border border-white/5 text-zinc-300 rounded-xl text-sm font-semibold transition-all"
                                >
                                    Sign in
                                </button>
                                <button 
                                    onClick={() => {
                                        setMobileMenuOpen(false);
                                        navigate("/signup");
                                    }}
                                    className="w-full py-3 bg-gradient-to-r from-indigo-500 to-fuchsia-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20"
                                >
                                    Get Started
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>
        </motion.div>
    );
};

export default Navbar;