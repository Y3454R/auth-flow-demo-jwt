import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'my-jwt';
export const API_URL = 'http://localhost:5000';
const AuthContext = createContext();

export const useAuth = ()=> {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}) => {

    const [authState, setAuthState] = useState({token: '', authenticated:false});
    
    useEffect(()=>{
        const loadToken = async()=>{
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored: ", token);
            if(token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                setAuthState({
                    token: token,
                    authenticated: true,
                })
            }
        }
    }, [])

    const register=async(email, password) => {
        try {
            return await axios.post(`${API_URL}/users`, {email, password});
        } catch(e) {
            return {error: true, msg:e.response.data.msg};
        }
    };

    const login = async(email, password)=>{
        try {
            const result = await axios.post(`${API_URL}/auth`, {email, password});

            console.log("result:", result);
    
            setAuthState({
                token: result.data.token,
                authenticated: true
            });
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
            return result;

        } catch (e) {
            return {error: true, msg:e.response.data.msg}
        }
        
    };

    const logout = async()=>{
        // Delete token from storage
        await SecureStore.deleteItemAsync(TOKEN_KEY);

        // Update HTTP Headers
        axios.defaults.headers.common['Authorization'] = '';
        
        // Reset auth state
        setAuthState({
            token: '',
            authenticated: false
        })
        
    }

    const value = {
        register, login, logout, authState
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}