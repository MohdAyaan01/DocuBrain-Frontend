import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
 
interface ChatMessage{
    type: "question" | "answer";
    text: string
}

interface AppSlice{
    user: any | null;
    documentId: string | null;
    documents: any[];
    chatHistory: ChatMessage[];
    loading: boolean;
    summary: string | null
}

const initialState: AppSlice = {
    user: null,
    documentId: null,
    documents:[],
    chatHistory:[],
    loading:false,
    summary:null
}

const appSlice = createSlice({
    name:"app",
    initialState,
    reducers:{
        setUser:(state, action:PayloadAction<any>) => {
            state.user = action.payload;
        },
        setDocumentId:(state, action:PayloadAction<string | null>) => {
            state.documentId = action.payload;
        },
        setDocuments:(state, action:PayloadAction<any[]>) => {
            state.documents = action.payload;
        },
        addChatMessage:(state, action:PayloadAction<ChatMessage>) => {
            state.chatHistory.push(action.payload);
        },
        setLoading:(state, action:PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setSummary:(state, action:PayloadAction<string | null>) => {
            state.summary = action.payload;
        },
        clearChat:(state) => {
            state.chatHistory = [];
        },
        logout:(state) => {
            state.user = null;
            state.documentId = null;
            state.documents = [];
            state.chatHistory = [];
            state.summary = null;
        }
    }
})
export const { setUser, setDocumentId, setDocuments, addChatMessage, setLoading, setSummary, clearChat, logout } = appSlice.actions;
export default appSlice.reducer;