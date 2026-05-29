import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentId, addChatMessage, setLoading, setSummary } from '../redux/appSlice';
import { toast } from 'react-hot-toast';
import Nav from "./Nav";
import { motion, AnimatePresence } from "framer-motion";

interface RootState {
  app: {
    documentId: string | null,
    chatHistory: { type: string, text: string }[];
    summary: string,
    loading: boolean
  }
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const documentId = useSelector((state: RootState) => state.app.documentId);
  const chatHistory = useSelector((state: RootState) => state.app.chatHistory);
  const summary = useSelector((state: RootState) => state.app.summary);
  const loading = useSelector((state: RootState) => state.app.loading);

  const [question, setQuestion] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [localDocumentId, setLocalDocumentId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setFileName(file.name);
    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/doc/fileupload`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      if (res.data && res.data.document) {
        const docId = res.data.document._id;
        dispatch(setDocumentId(docId));
        setLocalDocumentId(docId);
        dispatch(setSummary(res.data.document.summary || "Summary generating..."));
        toast.success('PDF uploaded successfully!');
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error: any) {
      toast.error('Upload failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSendQuestion = async () => {
    if (!question.trim()) {
      toast.error('Please type a question');
      return;
    }

    const currentDocId = documentId || localDocumentId;

    if (!currentDocId) {
      toast.error('Please upload a PDF first');
      return;
    }

    const userQuestion = question;
    dispatch(addChatMessage({ type: 'question', text: userQuestion }));
    setQuestion("");
    dispatch(setLoading(true));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/doc/ask`,
        { documentId: currentDocId, question: userQuestion },
        { withCredentials: true }
      );

      if (res.data.aiAnswer) {
        dispatch(addChatMessage({ type: 'answer', text: res.data.aiAnswer }));
      }
    } catch (error: any) {
      dispatch(addChatMessage({ type: 'answer', text: 'Error connecting to AI...' }));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="h-screen bg-zinc-950 flex flex-col font-sans text-zinc-100 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/10 rounded-full blur-[150px] pointer-events-none" />
      
      <Nav />
      
      {/* MAIN CONTENT */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-col md:flex-row flex-1 gap-6 p-6 h-[calc(100vh-100px)] relative z-10"
      >
        {/* PDF UPLOAD / SUMMARY AREA */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
            <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col items-center justify-center min-h-[220px] relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <h3 className="text-lg font-semibold mb-4 text-zinc-300">Document Source</h3>
                
                <label className="cursor-pointer relative z-10 w-full">
                    <div className={`w-full py-8 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center transition-all duration-300 ${loading ? 'border-zinc-700 bg-zinc-800/50' : 'border-indigo-500/30 hover:border-indigo-500/80 bg-zinc-800/80 hover:bg-zinc-800'}`}>
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mb-3">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="17 8 12 3 7 8" />
                                <line x1="12" x2="12" y1="3" y2="15" />
                            </svg>
                        </div>
                        <span className="text-sm font-medium text-zinc-300">{loading ? "Uploading..." : "Click to upload PDF"}</span>
                        <input
                            type="file"
                            accept="application/pdf"
                            hidden
                            onChange={handleFileUpload}
                            disabled={loading}
                        />
                    </div>
                </label>
                
                {fileName && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 flex items-center gap-3 w-full bg-zinc-800/50 px-4 py-3 rounded-xl border border-white/5">
                        <svg className="w-6 h-6 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                        </svg>
                        <p className="text-sm font-medium truncate text-zinc-300">{fileName}</p>
                    </motion.div>
                )}
            </div>

            <div className="flex-1 bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/5 rounded-full blur-[50px]"></div>
                <h3 className="text-lg font-semibold mb-4 text-zinc-300 flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-fuchsia-400">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <path d="M14 2v6h6"></path>
                        <path d="M16 13H8"></path>
                        <path d="M16 17H8"></path>
                        <path d="M10 9H8"></path>
                    </svg>
                    AI Summary
                </h3>
                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    {summary ? (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-zinc-400 leading-relaxed font-light">
                            {summary}
                        </motion.div>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                            <svg className="w-12 h-12 mb-3 opacity-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                            <p className="text-sm text-center">Upload a document to generate a summary.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>

        {/* CHAT AREA */}
        <div className="w-full md:w-2/3 bg-zinc-900/60 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
          <div className="px-6 py-5 border-b border-white/5 bg-zinc-900/40 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.6)]"></div>
            <h2 className="font-semibold text-zinc-200">DocuBrain Assistant</h2>
          </div>

          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col space-y-6">
            <AnimatePresence>
                {chatHistory.length === 0 && !loading && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-zinc-500">
                        <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-white/5 flex items-center justify-center mb-4">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <p className="text-base font-medium text-zinc-400">How can I help you today?</p>
                        <p className="text-sm mt-1">Ask anything about your document</p>
                    </motion.div>
                )}
                {chatHistory.map((msg, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`flex ${msg.type === 'question' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                            msg.type === 'question' 
                            ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-white rounded-tr-sm shadow-lg shadow-indigo-500/20 text-right' 
                            : 'bg-zinc-800 border border-white/5 text-zinc-300 rounded-tl-sm shadow-md'
                        }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-zinc-800/80 border border-white/5 text-zinc-400 p-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
                      <div className="flex space-x-1 w-10">
                          <motion.div className="w-2 h-2 bg-indigo-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                          <motion.div className="w-2 h-2 bg-fuchsia-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                          <motion.div className="w-2 h-2 bg-zinc-400 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                      </div>
                  </div>
              </motion.div>
            )}
            <div ref={chatBottomRef} />
          </div>

          <div className="p-4 bg-zinc-900/60 border-t border-white/5">
            <div className="flex items-end gap-3 bg-zinc-950/50 rounded-2xl border border-zinc-800 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/20 p-2 pr-2 transition-all">
              <textarea
                className="flex-1 bg-transparent border-none px-4 py-3 min-h-[50px] max-h-[150px] resize-none outline-none text-sm text-zinc-200 placeholder-zinc-500 custom-scrollbar"
                placeholder="Ask your question..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendQuestion();
                    }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-zinc-100 disabled:bg-zinc-800 text-zinc-900 disabled:text-zinc-500 p-3 rounded-xl mb-1 flex items-center justify-center transition-colors"
                onClick={handleSendQuestion}
                disabled={loading || !question.trim()}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3f3f46;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}