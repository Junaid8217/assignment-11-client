import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';


export const AuthContext = createContext()

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {

    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [role, setRole] = useState("")

    const registerWithEmailPAssword = (email, pass) => {
        // console.log(email, pass)
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    //to hold the user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false)

        })

        //clear up function
        return () => {
            unsubscribe()
        }
    }, [])



    const handleGoogleSignIn = () => {
        return signInWithPopup(auth, googleProvider)
    }


    //to get the role of the user
    useEffect(() => {
        if (!user) return;
        axios.get(`http://localhost:3000/users/role/${user.email}`)
            .then(res => {
                setRole(res.data.role)
            })
            .catch(err=>{
                console.log(err);
                
            })
    }, [user])



    const authData = {
        registerWithEmailPAssword,
        setUser,
        user,
        handleGoogleSignIn,
        loading,
        role

    }

    return <AuthContext value={authData}>
        {children}
    </AuthContext>
};
<ToastContainer />

export default AuthProvider;