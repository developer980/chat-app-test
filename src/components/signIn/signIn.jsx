import React from "react";
import { Link } from "react-router-dom";
import "./signIn.css";
import { connect } from "react-redux";
import { createUser } from "../../redux/User/action";
import { load_contactList, writeUserInfo } from "../../App";
import Google_icon from"../../Icons/google.svg"; 

function signIn(props){
    const{signInWithGoogle, signInWithFacebook, signInWithEmail, user, signOut, history, userList} = props;
    console.log(signInWithFacebook);
    function handleGoogleLogin(){
        const googleLoginResponse = signInWithGoogle();
        googleLoginResponse.then(()=>{
            writeUserInfo();
        })
    }

    return(
        <div className="signin-screen">
            <div className="signin-section">
            <div className = 'title'>
                Talk
            </div>
            <button className="signin-btn" onClick={handleGoogleLogin}>Sign in with google <img src={Google_icon} alt="" /></button>
            </div>
        </div>
    )
}
function functie(){
    
}
export default signIn;