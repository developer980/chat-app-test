import React from "react";
import "./signIn.css";
import { load_contactList, writeUserInfo } from "../../App";
import Google_icon from"../../Icons/google.svg"; 
import { db } from "../../App";

class signIn extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            users:[],
            authenticated:false
        }
    }



    render(){
        console.log("mama mea");
        const{signInWithGoogle, signInWithFacebook, signInWithEmail, user, signOut, history, userList} = this.props;
        let authenticated = false;
        console.log(signInWithFacebook);
    
        return(
            <div className="signin-screen">
                <div className="signin-section">
                <div className = 'title'>
                    Talk
                </div>
                <button className="signin-btn" onClick={() => this.handleGoogleLogin(signInWithGoogle, authenticated)}>Sign in with google <img src={Google_icon} alt="" /></button>
                </div>
            </div>
        )
    }

    handleGoogleLogin(signIn, authenticated){
        const googleLoginResponse = signIn();
            googleLoginResponse.then((user)=>{
                console.log(user.user.displayName);
                db.ref("/users/").once('value', snapshot => {
                    let Break;
                    console.log(snapshot)
                    try{
                        snapshot.forEach(childSnapshot => {
                            console.log(childSnapshot.val())
                            if(childSnapshot.val().id == user.user.uid){
                                authenticated = true;
                                throw Break;
                            }
                        })
                        console.log("mami")
                        db.ref("/users/").push({
                            name:user.user.displayName,
                            id:user.user.uid
                        }).then(() => {
                            window.location.reload();
                        })
                    }catch(e){
                        console.log('authenticated ' + authenticated);
                        window.location.reload();
                    }
                }
                // //
                // window.location.reload();
            )
            
        })
    }
}
function functie(){
    
}




export default signIn;