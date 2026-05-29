import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../redux/appSlice';
import { GoogleLogin } from "@react-oauth/google";
import { motion } from 'framer-motion';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: ""
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submithandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
        }
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center bg-zinc-950 overflow-hidden text-zinc-100">
            {/* Ambient Background Elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-fuchsia-600/20 rounded-full blur-[120px] pointer-events-none" />
            
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md p-8 md:p-10 bg-zinc-900/40 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl"
            >
                <div className="flex flex-col items-center justify-center mb-8">
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-500/30 mb-6"
                    >
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9" cy="16" r="4" fill="#fff" />
                            <circle cx="16" cy="9" r="4" fill="#fff" />
                            <circle cx="16" cy="23" r="4" fill="#fff" />
                            <circle cx="23" cy="16" r="4" fill="#fff" />
                        </svg>
                    </motion.div>
                    <h2 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">Welcome back</h2>
                    <p className="text-sm text-zinc-400 mt-2">Sign in to your DocuBrain account</p>
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
                                        toast.success("Login successful");
                                        navigate("/dashboard");
                                    }
                                }).catch(() => toast.error("Google login failed"));
                            }}
                            onError={() => console.log("Google Login Failed")}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full mb-6">
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
                    <span className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Or</span>
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-600 to-transparent"></div>
                </div>

                <form onSubmit={submithandler} className="flex flex-col gap-5">
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

                    <div className="flex items-center justify-between mt-2">
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input type="checkbox" className="peer sr-only" />
                                <div className="w-4 h-4 rounded border border-zinc-600 bg-zinc-950/50 peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all"></div>
                                <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                            <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors">Remember me</span>
                        </label>
                        <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline transition-all">Forgot password?</a>
                    </div>

                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit" 
                        className="w-full py-3.5 mt-4 bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-400 hover:to-fuchsia-500 text-white font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-indigo-500"
                    >
                        Sign in
                    </motion.button>
                </form>

                <p className="text-center text-sm text-zinc-400 mt-8">
                    Don't have an account? <button type="button" onClick={() => navigate("/signup")} className="text-fuchsia-400 font-medium hover:text-fuchsia-300 hover:underline transition-all">Create one</button>
                </p>
            </motion.div>
        </section>
    );
};

export default Login;

