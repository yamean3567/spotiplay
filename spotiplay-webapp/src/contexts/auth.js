import * as React from 'react'
import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import { useNavigate } from 'react-router';

const AuthContext = React.createContext();

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

        //update currentUser if user is registered
        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, async (user) => {
                setCurrentUser(user);
                setLoading(false);
                setError();
            })
            return unsubscribe;
        }, [])

        const signUp = async (email, password) => {
            try {
                const user = await createUserWithEmailAndPassword(auth, email, password)
                setCurrentUser(user);
                navigate('/home');
            } catch(e) {
                setError(e.message);
            }
        }

        const logIn = async (email, password) => {
            try {
                const user = await signInWithEmailAndPassword(auth, email, password)
                setCurrentUser(user);
                console.log(user);
                navigate('/home');
            } catch(e) {
                setError(e.message);
            }
        }

        const logOut = () => {
            return signOut(auth);
        }


    return {
        error,
        currentUser,
        loading,
        signUp,
        logIn,
        logOut,
    }
}

export const AuthProvider = ({children}) => {
    const auth = useAuth();

    return(
        <AuthContext.Provider value={auth}>
            {children}
        </AuthContext.Provider>
    )
}

export default function AuthConsumer() {
    return React.useContext(AuthContext);
}

