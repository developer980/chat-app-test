import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import './profile.css';
import profilePic from '../../Icons/profile.svg';
import Layout from '../../components/Layout';
import { changeDisplay } from "../../components/contacts_section";
import GoBack from '../../Icons/go-back.svg';
import { selectUser } from "../../redux/userSelect/action";

function profile(props){
    const{user, signOut, history} = props;
    function handleSignOut(){
        props.selectUser({name:'', id:''});
        signOut();
    }
    console.log(user);
    return(
        <div className = "profile">
            <div className="profile-pic" >
                <div>
                    <img className="image" src = {profilePic}/>
                </div>
            </div>
            <div className="name">
                {user ? user.displayName: null}
            </div>
            <div className="bio">
            </div>
            {<button className="sign-out-btn" onClick={handleSignOut}>Sign out</button>}
            {<button className="go-back" onClick={()=>changeDisplay("list")}><img className = "back-icon" src = {GoBack}></img></button>}
        </div>
    )
}

export function mapDispatchToProps(dispatch){
    return{
        selectUser: (payload) => dispatch(selectUser(payload))
    }
}
export default connect(null, mapDispatchToProps)(profile);