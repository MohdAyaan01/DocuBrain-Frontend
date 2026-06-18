import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Sparkles, 
  MessageSquare, 
  Shield, 
  Zap, 
  Check, 
  ArrowRight, 
  Lock, 
  Cpu, 
  ArrowUpRight 
} from 'lucide-react';
import './ClickUser.css';

const Hero: React.FC = () => {
    const navigate = useNavigate();
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'annually'>('monthly');
    const [activeDemoTab, setActiveDemoTab] = useState<'summary' | 'chat' | 'stats'>('summary');
    
    // Pricing details
    const pricingPlans = [
        {
            name: "Starter",
            price: billingPeriod === 'monthly' ? "0" : "0",
            description: "Perfect for students and casual readers",
            features: [
                "Up to 3 documents / month",
                "Max 10MB file size",
                "Basic AI summary",
                "50 questions per month"
            ],
            cta: "Get Started",
            popular: false
        },
        {
            name: "Pro",
            price: billingPeriod === 'monthly' ? "19" : "15",
            description: "For professionals, researchers and power users",
            features: [
                "Unlimited documents",
                "Max 100MB file size",
                "Advanced model (GPT-4 / Claude-3)",
                "Unlimited questions",
                "OCR Support for scanned files",
                "Priority support"
            ],
            cta: "Upgrade to Pro",
            popular: true
        },
        {
            name: "Team",
            price: billingPeriod === 'monthly' ? "49" : "39",
            description: "Secure collaborative tools for departments",
            features: [
                "Everything in Pro",
                "Shared team workspace",
                "Collaborative annotations",
                "API access (beta)",
                "Custom data retention policies",
                "Dedicated account manager"
            ],
            cta: "Contact Sales",
            popular: false
        }
    ];

    // Simulated Chat Messages for Interactive Mockup
    const demoChatMessages = [
        { sender: 'user', text: 'What is the performance improvement mentioned in the text?' },
        { sender: 'ai', text: 'The document outlines that parallelizing the rendering pipeline reduces frame times, resulting in a 40% overall improvement in throughput.' }
    ];

    return (
        <div className="bg-zinc-950 text-zinc-100 min-h-screen relative font-sans overflow-hidden">
            {/* --- HERO BANNER --- */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-36 pb-20 px-4">
                {/* Ambient Animated Gradients */}
                <motion.div 
                    animate={{ scale: [1, 1.15, 1], rotate: [0, 45, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute top-[5%] left-[-15%] w-[70%] h-[70%] bg-indigo-600/15 rounded-full blur-[160px] pointer-events-none" 
                />
                <motion.div 
                    animate={{ scale: [1, 1.3, 1], rotate: [0, -45, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-[5%] right-[-15%] w-[60%] h-[60%] bg-fuchsia-600/15 rounded-full blur-[160px] pointer-events-none" 
                />
                
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-16 relative z-10 w-full">
                    {/* Text Content */}
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-zinc-900/80 border border-white/10 shadow-inner mb-8 backdrop-blur-md">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-300">DocuBrain v2.5 Release</span>
                        </div>
                        
                        <h1 className="text-5xl md:text-6xl lg:text-7.5xl font-extrabold tracking-tight leading-[1.05] mb-6">
                            Understand <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 bg-[length:200%_auto] animate-gradient">
                                any document
                            </span>
                            <br />instantly.
                        </h1>
                        
                        <p className="text-base md:text-lg text-zinc-400 max-w-lg mb-10 leading-relaxed font-light">
                            DocuBrain harnesses custom LLMs to extract insights, generate summaries, and answer questions about your PDFs. Stop scanning, start understanding.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
                            <motion.button 
                                whileHover={{ scale: 1.03, boxShadow: "0 0 25px rgba(255,255,255,0.15)" }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => navigate("/signup")}
                                className="w-full sm:w-auto px-8 py-4 bg-zinc-100 hover:bg-white text-zinc-950 rounded-full font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                            >
                                Try it for free
                                <ArrowRight className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.a 
                                whileHover={{ scale: 1.03, borderColor: "rgba(255, 255, 255, 0.25)" }}
                                whileTap={{ scale: 0.97 }}
                                href="#demo"
                                className="w-full sm:w-auto px-8 py-4 bg-zinc-900/60 border border-white/10 hover:bg-zinc-900 hover:text-white text-zinc-300 rounded-full font-semibold text-base transition-all flex items-center justify-center gap-2 backdrop-blur-md cursor-pointer"
                            >
                                View Demo
                            </motion.a>
                        </div>
                    </motion.div>

                    {/* Interactive Mockup Container */}
                    <motion.div 
                        initial={{ opacity: 0, x: 40, rotateY: -6 }}
                        animate={{ opacity: 1, x: 0, rotateY: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
                        className="flex-1 w-full max-w-2xl perspective-1000"
                    >
                        <div className="relative w-full rounded-3xl bg-zinc-900/40 border border-white/10 backdrop-blur-xl p-5 shadow-[0_30px_60px_rgba(0,0,0,0.6)] overflow-hidden group">
                            {/* Gradient border line glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/10 via-transparent to-fuchsia-500/10 opacity-60 pointer-events-none" />
                            
                            {/* Window Header */}
                            <div className="flex items-center justify-between mb-5 px-1 pb-3 border-b border-white/5">
                                <div className="flex items-center gap-2">
                                    <span className="w-3.5 h-3.5 rounded-full bg-red-500/80 inline-block"></span>
                                    <span className="w-3.5 h-3.5 rounded-full bg-amber-500/80 inline-block"></span>
                                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-500/80 inline-block"></span>
                                </div>
                                <div className="text-[11px] font-semibold text-zinc-500 uppercase tracking-widest bg-zinc-900/80 px-3 py-1 rounded-full border border-white/5">
                                    DocuBrain Live Preview
                                </div>
                            </div>
                            
                            {/* Mockup Navigation Tabs */}
                            <div className="flex border-b border-white/5 mb-5 text-xs font-semibold text-zinc-400 gap-1 bg-zinc-950/40 p-1 rounded-lg">
                                <button 
                                    onClick={() => setActiveDemoTab('summary')}
                                    className={`flex-1 py-2 rounded-md transition-all cursor-pointer text-center ${activeDemoTab === 'summary' ? 'bg-zinc-800 text-white shadow-inner' : 'hover:text-zinc-200'}`}
                                >
                                    Document Overview
                                </button>
                                <button 
                                    onClick={() => setActiveDemoTab('chat')}
                                    className={`flex-1 py-2 rounded-md transition-all cursor-pointer text-center ${activeDemoTab === 'chat' ? 'bg-zinc-800 text-white shadow-inner' : 'hover:text-zinc-200'}`}
                                >
                                    AI Interactive Chat
                                </button>
                                <button 
                                    onClick={() => setActiveDemoTab('stats')}
                                    className={`flex-1 py-2 rounded-md transition-all cursor-pointer text-center ${activeDemoTab === 'stats' ? 'bg-zinc-800 text-white shadow-inner' : 'hover:text-zinc-200'}`}
                                >
                                    Analytics
                                </button>
                            </div>
                            
                            {/* Mockup Changing Contents */}
                            <div className="min-h-[170px] flex flex-col justify-between">
                                {activeDemoTab === 'summary' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3">
                                        <div className="flex gap-4">
                                            <div className="w-12 h-12 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex flex-col items-center justify-center text-indigo-400 shrink-0">
                                                <FileText className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-semibold text-zinc-200">architecture_whitepaper_v3.pdf</h4>
                                                <p className="text-xs text-zinc-500 mt-0.5">Size: 4.8MB • Uploaded just now</p>
                                            </div>
                                        </div>
                                        
                                        <div className="bg-gradient-to-br from-indigo-500/10 to-fuchsia-600/10 rounded-xl p-4 border border-indigo-500/20 mt-1">
                                            <div className="flex items-center gap-1.5 mb-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                                                <Sparkles className="w-3.5 h-3.5" />
                                                <span>AI Generated Summary</span>
                                            </div>
                                            <p className="text-xs text-zinc-300 leading-relaxed font-light">
                                                This document outlines the core architectural principles of the new engine, highlighting the parallel processing pipeline and the memory management subsystem which improves overall throughput by 40%.
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {activeDemoTab === 'chat' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-3.5 text-xs">
                                        {demoChatMessages.map((msg, i) => (
                                            <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${msg.sender === 'user' ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white rounded-tr-none' : 'bg-zinc-800/80 border border-white/5 text-zinc-300 rounded-tl-none'}`}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}

                                {activeDemoTab === 'stats' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-3 gap-3">
                                        <div className="bg-zinc-800/40 border border-white/5 rounded-xl p-3.5 text-center">
                                            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Reading Time</div>
                                            <div className="text-lg font-bold text-indigo-400 mt-1">~12 min</div>
                                        </div>
                                        <div className="bg-zinc-800/40 border border-white/5 rounded-xl p-3.5 text-center">
                                            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Key Takeaways</div>
                                            <div className="text-lg font-bold text-fuchsia-400 mt-1">8 Found</div>
                                        </div>
                                        <div className="bg-zinc-800/40 border border-white/5 rounded-xl p-3.5 text-center">
                                            <div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Complexity</div>
                                            <div className="text-lg font-bold text-emerald-400 mt-1">Medium</div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Floating Stats elements */}
                            <motion.div 
                                animate={{ y: [0, -6, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute right-5 -bottom-2 bg-zinc-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-3.5 max-w-xs"
                            >
                                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                                    <Check className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs font-extrabold text-white">Analysis Complete</p>
                                    <p className="text-[10px] text-zinc-400 mt-0.5">124 pages indexed in 1.8s</p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* --- FEATURES GRID --- */}
            <section id="features" className="py-24 px-4 max-w-7xl mx-auto relative z-10 border-t border-white/5">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-xs uppercase font-extrabold text-indigo-400 tracking-widest mb-3">Powerhouse Features</h2>
                    <h3 className="text-3xl md:text-4.5xl font-extrabold tracking-tight">Everything you need to digest text.</h3>
                    <p className="text-zinc-400 text-sm md:text-base mt-4 font-light leading-relaxed">
                        Don't waste hours flipping pages. DocuBrain provides the ultimate platform to extract value from documents.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden group">
                        <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-zinc-100">Smart Summaries</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            Instant, structured, high-fidelity summaries tailored to your reading style. Overview main themes, key terminology, and references instantly.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden group">
                        <div className="w-12 h-12 bg-fuchsia-500/10 rounded-2xl border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400 mb-6 group-hover:scale-110 transition-transform">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-zinc-100">Conversational AI Chat</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            Ask questions, verify data, or query statistics. The AI retrieves relevant segments and supports explanations with page-level citations.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden group">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-zinc-100">Blazing Fast Parsing</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            Powered by specialized distributed parser networks, hundreds of pages are fully processed and vector-indexed in less than two seconds.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden group">
                        <div className="w-12 h-12 bg-amber-500/10 rounded-2xl border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                            <Cpu className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-zinc-100">Advanced OCR Engine</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            Got scanned pages or low-resolution PDFs? Our optical character recognition extracts readable layers without loss of context.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden group">
                        <div className="w-12 h-12 bg-rose-500/10 rounded-2xl border border-rose-500/20 flex items-center justify-center text-rose-400 mb-6 group-hover:scale-110 transition-transform">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-zinc-100">Bank-grade Security</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            Your files are strictly private. All uploads are encrypted in transit and at rest, and we do NOT train external models on your content.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="glass-card glass-card-hover rounded-3xl p-8 relative overflow-hidden group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-2xl border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h4 className="text-lg font-bold mb-3 text-zinc-100">Multi-File Workspace</h4>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            Upload and store multiple documents in your session workspace. Easily swap between them inside the dashboard without refreshing.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS STEPPER --- */}
            <section id="how-it-works" className="py-24 px-4 bg-zinc-950 relative z-10 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-xs uppercase font-extrabold text-fuchsia-400 tracking-widest mb-3">Simple Process</h2>
                        <h3 className="text-3xl md:text-4.5xl font-extrabold tracking-tight">How DocuBrain works in 3 steps</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[45px] left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-indigo-500/20 -z-10" />

                        {/* Step 1 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-indigo-500/30 flex items-center justify-center font-black text-lg text-indigo-400 mb-6 shadow-lg shadow-indigo-500/10">
                                1
                            </div>
                            <h4 className="text-lg font-bold mb-2.5">Upload Documents</h4>
                            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed font-light">
                                Drag and drop your target PDF files into our secure interface. We support files up to 100MB.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-fuchsia-500/30 flex items-center justify-center font-black text-lg text-fuchsia-400 mb-6 shadow-lg shadow-fuchsia-500/10">
                                2
                            </div>
                            <h4 className="text-lg font-bold mb-2.5">Instant Synthesis</h4>
                            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed font-light">
                                Our AI constructs a comprehensive index of the document context, preparing summaries and statistics immediately.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full bg-zinc-900 border border-indigo-500/30 flex items-center justify-center font-black text-lg text-indigo-400 mb-6 shadow-lg shadow-indigo-500/10">
                                3
                            </div>
                            <h4 className="text-lg font-bold mb-2.5">Interact & Extract</h4>
                            <p className="text-sm text-zinc-400 max-w-xs leading-relaxed font-light">
                                Query the AI about specific paragraphs, ask for translations, create checklists, or copy structured answers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PRICING --- */}
            <section id="pricing" className="py-24 px-4 max-w-7xl mx-auto relative z-10 border-t border-white/5">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-xs uppercase font-extrabold text-indigo-400 tracking-widest mb-3">Subscription</h2>
                    <h3 className="text-3xl md:text-4.5xl font-extrabold tracking-tight">Simple, transparent pricing</h3>
                    
                    {/* Billing Toggle */}
                    <div className="flex items-center justify-center mt-8 gap-4">
                        <span className={`text-sm font-medium ${billingPeriod === 'monthly' ? 'text-white' : 'text-zinc-500'}`}>Monthly</span>
                        <button 
                            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'annually' : 'monthly')}
                            className="w-12 h-6 bg-zinc-800 rounded-full p-1 relative flex items-center cursor-pointer transition-colors"
                        >
                            <motion.div 
                                layout
                                className="w-4 h-4 bg-indigo-500 rounded-full"
                                animate={{ x: billingPeriod === 'monthly' ? 0 : 24 }}
                            />
                        </button>
                        <span className={`text-sm font-medium ${billingPeriod === 'annually' ? 'text-white' : 'text-zinc-500'}`}>
                            Annually <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full font-bold">Save 20%</span>
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {pricingPlans.map((plan, index) => (
                        <div 
                            key={index}
                            className={`glass-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden transition-all duration-300 ${plan.popular ? 'border-indigo-500/60 ring-1 ring-indigo-500/20 shadow-[0_20px_50px_rgba(99,102,241,0.15)] bg-zinc-900/50 scale-[1.02]' : 'hover:border-zinc-800'}`}
                        >
                            {plan.popular && (
                                <div className="absolute top-0 right-0 bg-indigo-500 text-white font-extrabold text-[10px] uppercase tracking-wider py-1.5 px-4 rounded-bl-2xl">
                                    Most Popular
                                </div>
                            )}

                            <div>
                                <h4 className="text-xl font-bold text-white mb-2">{plan.name}</h4>
                                <p className="text-xs text-zinc-400 mb-6 font-light">{plan.description}</p>
                                
                                <div className="flex items-baseline gap-1 mb-6">
                                    <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                                    <span className="text-xs text-zinc-500">/ user / mo</span>
                                </div>

                                <div className="h-px bg-white/5 mb-6" />

                                <ul className="flex flex-col gap-4 text-sm font-light text-zinc-300">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <Check className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button 
                                onClick={() => navigate("/signup")}
                                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all mt-8 cursor-pointer flex items-center justify-center gap-2 ${plan.popular ? 'bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/25' : 'bg-zinc-850 hover:bg-zinc-800 text-zinc-200 border border-white/5'}`}
                            >
                                {plan.cta}
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hero;