import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentId, addChatMessage, setLoading, setSummary, clearChat } from '../redux/appSlice';
import { toast } from 'react-hot-toast';
import Nav from "./Nav";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, 
  Upload, 
  Sparkles, 
  MessageSquare, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Clock, 
  Send, 
  Database,
  Calendar,
  Layers,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

interface RootState {
  app: {
    documentId: string | null;
    chatHistory: { type: string, text: string }[];
    summary: string;
    loading: boolean;
  }
}

interface FileHistoryItem {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
  summary: string;
}

export default function Dashboard() {
  const dispatch = useDispatch();
  const documentId = useSelector((state: RootState) => state.app.documentId);
  const chatHistory = useSelector((state: RootState) => state.app.chatHistory);
  const summary = useSelector((state: RootState) => state.app.summary);
  const loading = useSelector((state: RootState) => state.app.loading);

  const [question, setQuestion] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [uploadDate, setUploadDate] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);
  const [history, setHistory] = useState<FileHistoryItem[]>([]);
  
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('docubrain_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as FileHistoryItem[];
        setHistory(parsed);
        // Auto-select the first one if no document is currently active
        if (parsed.length > 0 && !documentId) {
          selectHistoryItem(parsed[0]);
        }
      } catch (e) {
        console.error("Error loading history", e);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update scroll when messages change
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, loading]);

  // Save history to localStorage
  const saveHistoryToLocal = (updatedHistory: FileHistoryItem[]) => {
    setHistory(updatedHistory);
    localStorage.setItem('docubrain_history', JSON.stringify(updatedHistory));
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setFileName(file.name);
    setFileSize(file.size);
    const dateStr = new Date().toLocaleString();
    setUploadDate(dateStr);
    
    dispatch(setLoading(true));
    dispatch(clearChat());

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
        const docSummary = res.data.document.summary || "Summary generated successfully.";
        
        dispatch(setDocumentId(docId));
        dispatch(setSummary(docSummary));

        // Add to local history list
        const newItem: FileHistoryItem = {
          id: docId,
          name: file.name,
          size: file.size,
          uploadedAt: dateStr,
          summary: docSummary
        };
        const updated = [newItem, ...history.filter(h => h.id !== docId)].slice(0, 15);
        saveHistoryToLocal(updated);
        
        toast.success('PDF uploaded and parsed successfully!');
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error('Upload failed. Check server status.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  const selectHistoryItem = (item: FileHistoryItem) => {
    dispatch(setDocumentId(item.id));
    dispatch(setSummary(item.summary));
    dispatch(clearChat());
    setFileName(item.name);
    setFileSize(item.size);
    setUploadDate(item.uploadedAt);
  };

  const deleteHistoryItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = history.filter(item => item.id !== id);
    saveHistoryToLocal(updated);
    
    if (documentId === id) {
      dispatch(setDocumentId(null));
      dispatch(setSummary(""));
      dispatch(clearChat());
      setFileName("");
      setFileSize(null);
      setUploadDate("");
    }
    toast.success('Document removed from workspace');
  };

  const handleSendQuestion = async (textToSend?: string) => {
    const qText = textToSend || question;
    if (!qText.trim()) {
      toast.error('Please type a question');
      return;
    }

    if (!documentId) {
      toast.error('Please upload a PDF first');
      return;
    }

    dispatch(addChatMessage({ type: 'question', text: qText }));
    if (!textToSend) setQuestion("");
    dispatch(setLoading(true));

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/doc/ask`,
        { documentId, question: qText },
        { withCredentials: true }
      );

      if (res.data && res.data.aiAnswer) {
        dispatch(addChatMessage({ type: 'answer', text: res.data.aiAnswer }));
      } else {
        dispatch(addChatMessage({ type: 'answer', text: 'Received empty response from AI...' }));
      }
    } catch (error) {
      console.error("Ask question error:", error);
      dispatch(addChatMessage({ type: 'answer', text: 'Error connecting to AI...' }));
      toast.error("Failed to fetch response");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Quick action suggestions
  const suggestions = [
    "Summarize the main themes",
    "List the 5 key takeaways",
    "Explain like I'm 5",
    "Are there any actions required?"
  ];

  // Utility to format bytes
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper to parse summary text into structured points if it has markdown-like layout
  const renderFormattedSummary = (sumText: string) => {
    if (!sumText) return null;
    const lines = sumText.split('\n');
    return lines.map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('-') || trimmed.startsWith('*') || trimmed.startsWith('•')) {
        return (
          <li key={i} className="ml-4 list-disc text-zinc-300 py-1 font-light text-sm">
            {trimmed.substring(1).trim()}
          </li>
        );
      }
      if (/^\d+\./.test(trimmed)) {
        return (
          <li key={i} className="ml-4 list-decimal text-zinc-300 py-1 font-light text-sm">
            {trimmed.replace(/^\d+\./, '').trim()}
          </li>
        );
      }
      if (trimmed.endsWith(':') && trimmed.length < 50) {
        return (
          <h4 key={i} className="text-zinc-200 font-semibold text-sm mt-4 mb-2">
            {trimmed}
          </h4>
        );
      }
      if (!trimmed) return <div key={i} className="h-2" />;
      return (
        <p key={i} className="text-zinc-400 text-sm py-1 font-light leading-relaxed">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <div className="h-screen bg-zinc-950 flex flex-col font-sans text-zinc-100 overflow-hidden relative">
      {/* Background Ambient Orbs */}
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-fuchsia-600/5 rounded-full blur-[150px] pointer-events-none" />
      
      <Nav />
      
      {/* MAIN CONTAINER */}
      <div className="flex flex-1 overflow-hidden p-6 gap-6 relative z-10 h-[calc(100vh-100px)]">
        
        {/* PANEL 1: COLLAPSIBLE SIDEBAR */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div 
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 280, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="hidden lg:flex flex-col bg-zinc-900/50 border border-white/5 rounded-3xl p-5 overflow-hidden shadow-2xl shrink-0"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
                <h3 className="font-bold text-sm text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                  <Database className="w-4 h-4 text-indigo-400" />
                  Your Workspace
                </h3>
                <button 
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Upload Trigger */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-500 to-fuchsia-600 hover:from-indigo-400 hover:to-fuchsia-500 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mb-5 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New PDF</span>
              </button>

              <input 
                type="file" 
                ref={fileInputRef}
                accept="application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />

              {/* Document History List */}
              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2">
                <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-1 mb-1">Recent Uploads</p>
                {history.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-8 text-center text-zinc-600 bg-zinc-950/20 border border-dashed border-white/5 rounded-2xl">
                    <Clock className="w-8 h-8 opacity-20 mb-2" />
                    <p className="text-xs">No documents yet</p>
                  </div>
                ) : (
                  history.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => selectHistoryItem(item)}
                      className={`group flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${documentId === item.id ? 'bg-indigo-500/10 border-indigo-500/40' : 'bg-zinc-950/20 border-white/5 hover:border-white/10 hover:bg-zinc-900/60'}`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <FileText className={`w-4 h-4 shrink-0 ${documentId === item.id ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300'}`} />
                        <div className="text-left overflow-hidden">
                          <p className={`text-xs font-medium truncate ${documentId === item.id ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-300'}`}>
                            {item.name}
                          </p>
                          <p className="text-[10px] text-zinc-500 mt-0.5">{formatBytes(item.size)}</p>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => deleteHistoryItem(item.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/10 text-zinc-500 hover:text-red-400 rounded-lg transition-all cursor-pointer"
                        title="Delete document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed Sidebar Handle */}
        {!sidebarOpen && (
          <button 
            onClick={() => setSidebarOpen(true)}
            className="hidden lg:flex items-center justify-center w-10 bg-zinc-900/40 border border-white/5 rounded-full text-zinc-400 hover:text-white transition-colors cursor-pointer hover:bg-zinc-900 shrink-0 self-stretch"
            title="Expand sidebar"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* PANEL 2: DOCUMENT VIEWER / METADATA & SUMMARY */}
        <div className="w-full lg:w-[32%] flex flex-col gap-6 h-full">
          
          {/* Mobile Upload Button */}
          <div className="lg:hidden flex gap-3">
            <button 
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="flex-1 py-3 px-4 bg-zinc-900/80 border border-white/5 text-zinc-300 rounded-2xl text-xs font-bold flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>{loading ? "Processing..." : "Upload PDF"}</span>
            </button>
          </div>

          {/* Metadata Card */}
          <div className="bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-5 shadow-2xl relative overflow-hidden group shrink-0">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-fuchsia-500/5 opacity-60 pointer-events-none" />
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3.5 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-fuchsia-400" />
              Active Document Info
            </h3>
            
            {fileName ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden text-left">
                    <p className="text-sm font-bold text-white truncate">{fileName}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{fileSize ? formatBytes(fileSize) : ""}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <Calendar className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
                    <span className="truncate">{uploadDate ? uploadDate.split(',')[0] : ""}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse"></span>
                    <span>Ready to ask</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-6 text-center text-zinc-500 flex flex-col items-center justify-center gap-2">
                <Upload className="w-8 h-8 opacity-20" />
                <p className="text-xs font-light">Upload a PDF to view information</p>
              </div>
            )}
          </div>

          {/* AI Summary Card */}
          <div className="flex-1 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl flex flex-col overflow-hidden relative">
            <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2 shrink-0">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              AI Synthesized Summary
            </h3>
            
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar text-left">
              {summary ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="space-y-2"
                >
                  {renderFormattedSummary(summary)}
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-zinc-600">
                  <FileText className="w-12 h-12 mb-3 opacity-25" />
                  <p className="text-sm font-light">Overview will generate here after parsing.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* PANEL 3: INTERACTIVE CHAT ASSISTANT */}
        <div className="flex-1 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
          
          {/* Chat Header */}
          <div className="px-6 py-4.5 border-b border-white/5 bg-zinc-900/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]"></div>
              <div className="text-left">
                <h2 className="font-bold text-sm text-zinc-200">DocuBrain Assistant</h2>
                <p className="text-[10px] text-zinc-500 font-light mt-0.5">Online • Grounded on active document</p>
              </div>
            </div>
            {chatHistory.length > 0 && (
              <button 
                onClick={() => dispatch(clearChat())}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1 hover:bg-white/5 px-2.5 py-1.5 rounded-lg border border-transparent hover:border-white/5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Clear Chat
              </button>
            )}
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-6 overflow-y-auto custom-scrollbar flex flex-col space-y-6 bg-zinc-950/20">
            <AnimatePresence>
                {chatHistory.length === 0 && !loading && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.98 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="h-full flex flex-col items-center justify-center text-zinc-500 text-center max-w-sm mx-auto"
                    >
                        <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center mb-4 text-indigo-400">
                            <MessageSquare className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-semibold text-zinc-300">Start asking questions</p>
                        <p className="text-xs text-zinc-500 mt-2 font-light leading-relaxed">
                          Query specific clauses, compare numbers, or extract data. Click one of the quick suggestions below to get started.
                        </p>
                    </motion.div>
                )}
                
                {chatHistory.map((msg, idx) => (
                    <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'question' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`max-w-[80%] px-4 py-3.5 rounded-2xl text-sm leading-relaxed text-left ${
                            msg.type === 'question' 
                            ? 'bg-gradient-to-br from-indigo-500 to-fuchsia-600 text-white rounded-tr-none shadow-lg shadow-indigo-500/15' 
                            : 'bg-zinc-900 border border-white/5 text-zinc-300 rounded-tl-none'
                        }`}>
                            {msg.text}
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>

            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-zinc-900 border border-white/5 text-zinc-400 px-4.5 py-3.5 rounded-2xl rounded-tl-none flex items-center gap-2">
                      <div className="flex space-x-1.5 items-center py-1">
                          <motion.div className="w-2 h-2 bg-indigo-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} />
                          <motion.div className="w-2 h-2 bg-fuchsia-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} />
                          <motion.div className="w-2 h-2 bg-zinc-500 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} />
                      </div>
                      <span className="text-xs text-zinc-500 font-light">thinking...</span>
                  </div>
              </motion.div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick Actions Suggestions Area */}
          {documentId && chatHistory.length === 0 && (
            <div className="px-6 py-3 border-t border-white/5 bg-zinc-950/40 flex flex-wrap gap-2 justify-start items-center">
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mr-1">Suggestions:</span>
              {suggestions.map((sug, i) => (
                <button
                  key={i}
                  onClick={() => handleSendQuestion(sug)}
                  className="text-xs bg-zinc-900 hover:bg-zinc-800 text-zinc-300 px-3 py-1.5 rounded-full border border-white/5 hover:border-white/10 transition-all cursor-pointer flex items-center gap-1.5 font-light"
                >
                  {sug}
                  <ArrowRight className="w-3 h-3 text-zinc-500" />
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-4 bg-zinc-900/60 border-t border-white/5 relative z-10">
            <div className="flex items-end gap-3 bg-zinc-950/80 rounded-2xl border border-white/5 focus-within:border-indigo-500/50 focus-within:ring-2 focus-within:ring-indigo-500/10 p-2 pr-3.5 transition-all">
              <textarea
                className="flex-1 bg-transparent border-none px-4.5 py-3 max-h-[140px] min-h-[44px] resize-none outline-none text-sm text-zinc-200 placeholder-zinc-500 custom-scrollbar leading-relaxed font-light"
                placeholder={documentId ? "Ask anything about this PDF..." : "Upload a PDF document to start chatting..."}
                value={question}
                disabled={!documentId || loading}
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
                className="bg-zinc-100 disabled:bg-zinc-900 text-zinc-950 disabled:text-zinc-600 p-3 rounded-xl mb-1 flex items-center justify-center transition-colors cursor-pointer"
                onClick={() => handleSendQuestion()}
                disabled={loading || !question.trim() || !documentId}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
