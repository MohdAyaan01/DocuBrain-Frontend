import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../redux/appSlice';
import { GoogleLogin } from "@react-oauth/google";
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Sparkles, BookOpen } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/login`, input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || 'Login successful!');
                navigate("/dashboard");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex bg-zinc-950 text-zinc-100 font-sans overflow-hidden">
            {/* LEFT SIDE: Form panel */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 xl:px-32 relative z-10 bg-zinc-950">
                {/* Ambient Blur */}
                <div className="absolute top-[10%] left-[-20%] w-[60%] h-[60%] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
                <div className="absolute bottom-[10%] left-[20%] w-[50%] h-[50%] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none" />
                
                <div className="w-full max-w-md mx-auto relative z-10">
                    {/* Header */}
                    <div className="mb-8">
                        <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform duration-300">
                                <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="9" cy="16" r="4" fill="#fff" />
                                    <circle cx="16" cy="9" r="4" fill="#fff" />
                                    <circle cx="16" cy="23" r="4" fill="#fff" />
                                    <circle cx="23" cy="16" r="4" fill="#fff" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">DocuBrain</span>
                        </Link>
                        <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">Welcome back</h2>
                        <p className="text-sm text-zinc-400 mt-2 font-light">Log in to manage and query your document workflow.</p>
                    </div>

                    {/* Google OAuth Option */}
                    <div className="w-full flex justify-center mb-6">
                        <div className="w-full rounded-xl overflow-hidden hover:scale-[1.01] transition-transform duration-300">
                            <GoogleLogin
                                theme="filled_black"
                                shape="pill"
                                width="384px"
                                onSuccess={(credentialResponse) => {
                                    axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/google`, {
                                        token: credentialResponse.credential
                                    }, { withCredentials: true })
                                    .then((res) => {
                                        if (res.data.success) {
                                            dispatch(setUser(res.data.user));
                                            toast.success("Login successful");
                                            navigate("/dashboard");
                                        }
                                    }).catch(() => toast.error("Google login failed"));
                                }}
                                onError={() => console.log("Google Login Failed")}
                            />
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="flex items-center gap-4 w-full mb-6">
                        <div className="h-px w-full bg-white/5"></div>
                        <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">Or email</span>
                        <div className="h-px w-full bg-white/5"></div>
                    </div>

                    {/* Form */}
                    <form onSubmit={submithandler} className="flex flex-col gap-4">
                        {/* Email */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={input.email}
                                    onChange={changeHandler}
                                    placeholder="name@company.com"
                                    className="w-full bg-zinc-900/50 border border-white/5 text-zinc-100 text-sm rounded-xl focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 block pl-11 pr-4 py-3.5 transition-all outline-none"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="flex flex-col gap-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
                                <a href="#" className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors">
                                    <Lock className="w-4 h-4" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={input.password}
                                    onChange={changeHandler}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-900/50 border border-white/5 text-zinc-100 text-sm rounded-xl focus:ring-1 focus:ring-fuchsia-500 focus:border-fuchsia-500 block pl-11 pr-11 py-3.5 transition-all outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center mt-1">
                            <label className="flex items-center gap-2.5 cursor-pointer group">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="w-4.5 h-4.5 rounded border border-white/10 bg-zinc-900/80 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 flex items-center justify-center transition-all">
                                    <svg className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </div>
                                <span className="text-xs text-zinc-400 group-hover:text-zinc-300 transition-colors">Keep me signed in</span>
                            </label>
                        </div>

                        {/* Submit */}
                        <motion.button 
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            type="submit" 
                            disabled={isLoading}
                            className="w-full py-4 mt-3 bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-400 hover:to-fuchsia-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                            <ArrowRight className="w-4 h-4" />
                        </motion.button>
                    </form>

                    {/* Navigation */}
                    <p className="text-center text-sm text-zinc-400 mt-8 font-light">
                        Don't have an account?{' '}
                        <button 
                            type="button" 
                            onClick={() => navigate("/signup")} 
                            className="text-fuchsia-400 font-bold hover:text-fuchsia-300 hover:underline transition-colors cursor-pointer"
                        >
                            Create one free
                        </button>
                    </p>
                </div>
            </div>

            {/* RIGHT SIDE: Graphic/Showcase panel (Desktop only) */}
            <div className="hidden lg:flex flex-1 bg-zinc-900/40 border-l border-white/5 flex-col justify-center items-center p-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_50%)]" />
                
                {/* Visual Cards Mockup */}
                <div className="max-w-md w-full text-left relative z-10 flex flex-col gap-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-950/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl relative"
                    >
                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-zinc-100">Intelligent PDF Synopses</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1.5">
                            DocuBrain scans files in milliseconds and outputs readable, structured summaries. Easily skip reading long corporate filings or academic papers.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-zinc-950/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl relative ml-6"
                    >
                        <div className="w-10 h-10 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-4">
                            <BookOpen className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-zinc-100">Contextual Citations</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1.5">
                            When asking questions, every reply includes page-level citations of where the original data resides, ensuring complete verification.
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="bg-zinc-950/60 border border-white/10 p-6 rounded-2xl backdrop-blur-md shadow-2xl relative"
                    >
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                            <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-zinc-100">Private & Encrypted</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-light mt-1.5">
                            Data security is our foundation. Uploads are strictly partitioned, secured under 256-bit encryption standards, and never shared.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Login;
