import React from 'react';
import { Link } from 'react-router-dom';

const FooterTwo: React.FC = () => {
    return (
        <footer className="flex flex-col items-center justify-around w-full py-16 text-sm text-zinc-500 bg-zinc-950 border-t border-white/5 relative z-10">
            <div className="flex flex-wrap items-center justify-center gap-8 px-4">
                <Link to="#" className="font-medium text-zinc-400 hover:text-white transition-all">
                    Home
                </Link>
                <Link to="#" className="font-medium text-zinc-400 hover:text-white transition-all">
                    About
                </Link>
                <Link to="#" className="font-medium text-zinc-400 hover:text-white transition-all">
                    Services
                </Link>
                <Link to="#" className="font-medium text-zinc-400 hover:text-white transition-all">
                    Contact
                </Link>
                <Link to="#" className="font-medium text-zinc-400 hover:text-white transition-all">
                    Help
                </Link>
            </div>
            
            <div className="flex items-center gap-5 mt-8 text-zinc-400">
                <Link to="#" className="hover:-translate-y-1 hover:text-indigo-400 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                </Link>
                <Link to="#" className="hover:-translate-y-1 hover:text-fuchsia-400 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                        <path d="M16 11.37a4 4 0 1 1-7.914 1.173A4 4 0 0 1 16 11.37m1.5-4.87h.01" />
                    </svg>
                </Link>
                <Link to="#" className="hover:-translate-y-1 hover:text-indigo-400 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6M6 9H2v12h4zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    </svg>
                </Link>
                <Link to="#" className="hover:-translate-y-1 hover:text-fuchsia-400 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2" />
                    </svg>
                </Link>
                <Link to="#" className="hover:-translate-y-1 hover:text-indigo-400 transition-all duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65S8.93 17.38 9 18v4" />
                        <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                </Link>
            </div>
            
            <p className="mt-8 text-center text-xs text-zinc-600 px-4">
                Copyright © {new Date().getFullYear()} <span className="text-zinc-500 font-semibold">DocuBrain</span>. All rights reserved.
            </p>
        </footer>
    );
};

export default FooterTwo;