import { useState } from "react";
import {auth, googleProvider} from "../config/firebase";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";


export const Auth = ()=>{

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");



    const enregistrer = async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }catch(err){
            console.error(err);
        }
    }
  
    const enregistrerGoogle = async()=>{
        try{
            await signInWithPopup(auth,googleProvider);
        }catch(err){
            console.error(err);
        }
    }

    const connexion = async()=>{
        await signInWithEmailAndPassword(auth,email,password);
     }

    
    const deconnecter = async()=>{
        try{
            await signOut(auth);
        }catch(err){
            console.error(err);
        }
    }
  
    return (
    <div> 
        <input type="text" name="email" placeholder="Email" onChange={(e)=>{setEmail(e.target.value)}}/> 
        <input type="password" name="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/> 
        <button onClick={connexion} >Connecter</button>
        <button onClick={enregistrer}>Enregistrer</button>
        <button onClick={enregistrerGoogle}>S'enregistrer avec Google</button>
        <button onClick={deconnecter}>Deconnecter</button>
        
    </div>)
}