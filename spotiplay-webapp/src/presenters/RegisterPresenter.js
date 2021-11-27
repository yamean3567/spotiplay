import { createUserWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import Register from '../components/Start/Register'
import { auth } from '../firebaseConfig'
import { useState } from 'react'

const RegisterPresenter = () => {
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = async () => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
        } catch(e) {
            console.log(e);
        }
    }


    return (
        <div>
            <Register/>
        </div>
    )
}

export default RegisterPresenter
