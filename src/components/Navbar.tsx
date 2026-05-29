import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
        >
            <nav className="flex items-center justify-between w-full max-w-5xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full shadow-2xl">
                <Link to="/" className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="16" r="4" fill="#fff" />
                            <circle cx="16" cy="9" r="4" fill="#fff" />
                            <circle cx="16" cy="23" r="4" fill="#fff" />
                            <circle cx="23" cy="16" r="4" fill="#fff" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white hidden sm:block">DocuBrain</span>
                </Link>
                
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>

                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate("/login")}
                        className="hidden md:block text-sm font-medium text-zinc-300 hover:text-white transition-colors px-4 py-2"
                    >
                        Sign in
                    </button>
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/signup")}
                        className="bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-400 hover:to-fuchsia-500 text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-lg shadow-indigo-500/30 transition-all"
                    >
                        Get Started
                    </motion.button>
                </div>
            </nav>
        </motion.div>
    );
};

export default Navbar;