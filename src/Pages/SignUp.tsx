import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setUser } from "../redux/appSlice";
import { toast } from 'react-hot-toast';
import { GoogleLogin } from '@react-oauth/google';
import { motion } from 'framer-motion';

const SignUp = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/signup`, input, {
                headers: { 'Content-Type': "application/json" },
                withCredentials: true
            });
            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message || 'Account created!');
                navigate("/login");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'Sign up failed. Please try again.');
        }
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-zinc-950 overflow-hidden text-zinc-100 py-12">
            {/* Ambient Background Elements */}
            <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 md:p-10 bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl"
            >
                <div className="flex flex-col items-center justify-center mb-8">
                    <motion.div 
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="w-16 h-16 bg-gradient-to-br from-fuchsia-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-fuchsia-500/30 mb-6"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16 4L22 10V22L16 28L10 22V10L16 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </motion.div>
                    <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">Create Account</h2>
                    <p className="text-sm text-zinc-400 mt-2">Join DocuBrain and supercharge your workflow</p>
                </div>

                <div className="w-full flex justify-center mb-6">
                    <div className="rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                        <GoogleLogin
                            theme="filled_black"
                            onSuccess={(credentialResponse) => {
                                axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/user/google`, {
                                    token: credentialResponse.credential
                                }, { withCredentials: true })
                                .then((res) => {
                                    if (res.data.success) {
                                        dispatch(setUser(res.data.user));
                                        toast.success("Account created successfully!");
                                        navigate("/dashboard");
                                    }
                                }).catch(() => toast.error("Google signup failed"));
                            }}
                            onError={() => console.log("Google Login Failed")}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full mb-6">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium text-nowrap">Or</span>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
                </div>

                <form onSubmit={submithandler} className="flex flex-col gap-4">
                    {/* Name Field */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-focus-within:text-purple-400 transition-colors">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeHandler}
                            placeholder="Full Name"
                            className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 text-sm rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 block pl-12 p-3.5 transition-all outline-none"
                            required
                        />
                    </div>

                    {/* Email Field */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-focus-within:text-indigo-400 transition-colors">
                                <rect width="20" height="16" x="2" y="4" rx="2"/>
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeHandler}
                            placeholder="Email address"
                            className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 text-sm rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 block pl-12 p-3.5 transition-all outline-none"
                            required
                        />
                    </div>
                    
                    {/* Password Field */}
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-500 group-focus-within:text-fuchsia-400 transition-colors">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <input
                            type="password"
                            name="password"
                            value={input.password}
                            onChange={changeHandler}
                            placeholder="Password"
                            className="w-full bg-zinc-950/50 border border-zinc-800 text-zinc-100 text-sm rounded-xl focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 block pl-12 p-3.5 transition-all outline-none"
                            required
                        />
                    </div>

                    <div className="mt-2 text-center items-center">
                        <p className="text-xs text-zinc-500 leading-relaxed">
                            By signing up, you agree to our <span className="text-zinc-300 hover:text-white cursor-pointer transition-colors border-b border-zinc-600">Terms of Service</span> and <span className="text-zinc-300 hover:text-white cursor-pointer transition-colors border-b border-zinc-600">Privacy Policy</span>.
                        </p>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full py-3.5 mt-2 bg-gradient-to-r from-fuchsia-600 to-indigo-500 hover:from-fuchsia-500 hover:to-indigo-400 text-white font-medium rounded-xl shadow-lg shadow-fuchsia-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-fuchsia-500"
                    >
                        Create Account
                    </motion.button>
                </form>

                <p className="text-center text-sm text-zinc-400 mt-8">
                    Already have an account? <button type="button" onClick={() => navigate("/login")} className="text-indigo-400 font-medium hover:text-indigo-300 hover:underline transition-all">Sign in</button>
                </p>
            </motion.div>
        </section>
    );
};

export default SignUp;

