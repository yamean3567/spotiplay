import * as React from 'react'
import { useState } from 'react'
import { auth } from '../firebaseConfig'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'

export const AuthContext = React.createContext();

export const useAuth = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    //update currentUser if user is registered
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);
        })
        return unsubscribe;
    }, [])

    const signUp = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const logIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        return signOut(auth);
    }

    return {
        loading,
        currentUser,
        signUp,
        logIn,
        logOut,
    }
}

export const AuthProvider = ({children}) => {
    const auth = useAuth();

    return(
        <AuthContext.Provider value={auth}>
            {!auth.loading && children}
        </AuthContext.Provider>
    )
}

export default function AuthConsumer() {
    return React.useContext(AuthContext);
}

