import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/appSlice';
import { motion } from 'framer-motion';
import { LogOut, User, Folder } from 'lucide-react';

interface RootState {
  app: {
    user: any | null;
  }
}

const Nav = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.app.user);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };
    
    return (
        <motion.nav 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex items-center justify-between mx-6 mt-6 bg-zinc-900/40 backdrop-blur-xl border border-white/5 px-6 py-3.5 rounded-2xl shadow-lg z-50 text-zinc-100 relative"
        >
            {/* Logo */}
            <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="9" cy="16" r="4" fill="#fff" />
                        <circle cx="16" cy="9" r="4" fill="#fff" />
                        <circle cx="16" cy="23" r="4" fill="#fff" />
                        <circle cx="23" cy="16" r="4" fill="#fff" />
                    </svg>
                </div>
                <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-zinc-100 via-zinc-200 to-zinc-400 bg-clip-text text-transparent">DocuBrain</span>
            </div>
            
            {/* User Profile and Actions */}
            <div className="flex items-center gap-4">
                {user && (
                    <div className="hidden sm:flex items-center gap-2.5 bg-zinc-950/40 border border-white/5 px-3 py-1.5 rounded-xl">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold text-zinc-300 truncate max-w-[120px]">{user.name || user.email}</span>
                    </div>
                )}
                
                <button 
                    type='button' 
                    className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 border border-transparent hover:border-white/5 rounded-xl text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer text-xs font-semibold" 
                    onClick={handleLogout}
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </motion.nav>
    );
}

export default Nav;