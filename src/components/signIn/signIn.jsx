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
            //load_contactList();
        })
        // .catch(window.location.reload());
    }

    // function handleFacebooklogin(){
    //     const facebookLoginResponse = signInWithFacebook();
    //     facebookLoginResponse.then(()=>{
    //         writeUserInfo();
    //     })
    //     // .catch(window.location.reload());
    // }

    // function handleEmailSignIn(){
    //     const email = document.getElementById('email').value;
    //     const password = document.getElementById('password').value;
    //     signInWithEmail(email, password).then(()=>{
    //         writeUserInfo();
    //     })
    // }

    return(
        <div className="signin-screen">
            <div className="signin-section">
            <div className = 'title'>
                Talk
            </div>
                    {/*  <form action="">
                <label htmlFor="Email">Email</label>
                <input id = "email" className="form-input" type="email"/>
                <label htmlFor="Username">Username</label>
                <input id = "username" className="form-input" type= "text"/>
                <label htmlFor="password">Password</label>
                <input id = "password" className="form-input" type= "password"/>
            </form> 
            <button className="signin-btn" onClick={handleEmailSignIn}>Sign in </button> */}
            <button className="signin-btn" onClick={handleGoogleLogin}>Sign in with google <img src={Google_icon} alt="" /></button>
                {/* <button className="signin-btn" onClick={handleFacebooklogin}>Sign in with Facebook <img src={Google_icon} alt="" /></button> */}
            </div>
            
           
            {/* {<button onClick={()=> this.setProfile(this.state.email, this.state.username)}>Sign in</button>
            <button onClick={this.getEmailLogin(signInWithEmail, history)}>Sign in with google</button>} */}
            {/* <Link to="/profile">
                Profile
            </Link>
            <Link to="/main">
                Main
            </Link> */}
        </div>
    )
}
function functie(){
    
}

    
  /*  getEmailLogin(emailLogIn, history){
        const googleLoginResponse = emailLogIn();
        googleLoginResponse.then(()=>{
            history.push('/');
        })


        
    }

    setEmail(event, email){
        this.setState({email:event.target.value});
        console.log(email);
    }
    
    setUsername(event, username){
        this.setState({username:event.target.value});
        console.log(username);
    }

    setProfile(email, username){
        this.props.createUser({
            email,
            username
        })
    }
function mapDispatchToProps(dispatch){
    return{
        createUser:(payload) => dispatch(createUser(payload))
    }
}
export default connect(null, mapDispatchToProps)(signIn);*/
export default signIn;