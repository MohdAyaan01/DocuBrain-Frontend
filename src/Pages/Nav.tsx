import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/appSlice';
import { motion } from 'framer-motion';

const Nav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    return (
        <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between mx-4 mt-4 bg-zinc-900/60 backdrop-blur-xl border border-white/5 px-6 py-4 rounded-2xl shadow-lg z-50 text-zinc-100 relative"
        >
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="16" r="4" fill="#fff" />
                        <circle cx="16" cy="9" r="4" fill="#fff" />
                        <circle cx="16" cy="23" r="4" fill="#fff" />
                        <circle cx="23" cy="16" r="4" fill="#fff" />
                    </svg>
                </div>
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">DocuBrain</span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
                <button 
                    type='button' 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 rounded-xl text-zinc-300 hover:text-white transition-all duration-300 cursor-pointer text-sm font-medium" 
                    onClick={() => {
                        dispatch(logout());
                        navigate("/");
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                    </svg>
                    Logout
                </button>
            </div>
            <button id="menuToggle" className="md:hidden text-zinc-400 hover:text-zinc-100 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </motion.nav>
    );
}

export default Nav;