import React from "react";
import Layout from "../components/Layout";
import "./mainPage.css";
import ChatSection from "../components/chatSection/chatSection";
import Contacts from "../components/contacts_section";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Message_input from "../components/message_input/message_input";
import SignIn from "../components/signIn/signIn";
import { add_message } from "../redux/message/action";
import Background from'../Icons/background.svg';

class Main_page extends React.Component{
    constructor(props){
        super(props);
        window.main_page = this;
    }
    render(){
        const {user, signInWithGoogle, signInWithFacebook, writeUserData, messages, userList, name, signOut} = this.props;
      //  console.log(name);
      //  console.log(user);
        // console.log(messages);
        // console.log(userList);
        return(
            <div className="main">
                {user ? 
                <Layout
                user = {user}
                userList = {userList}
                className="layout">
                    <div className="content">
                        <Contacts userList = {userList}
                        user = {user}
                        signOut = {signOut}
                        messages = {messages}
                        >
                        </Contacts>
                        {
                            name?
                            <ChatSection 
                            user = {user}
                            writeUserData = {writeUserData}
                            messages = {messages}
                            name = {name}
                            userList = {userList}>
                            </ChatSection> :<img className = "placeHolder" src = {Background}></img>
                        }
                    </div>
                {/* <button onClick={()=> (console.log(messages))}>Print</button> */}
                </Layout>
                :
                <SignIn
                signInWithGoogle = {signInWithGoogle}
                signInWithFacebook = {signInWithFacebook}
                signInWithEmail={this.props.signInWithEmail}
                user = {user}
                userList = {userList}
                ></SignIn>
                }
            </div>
        )
    }
}

export function updateChat(messages){
    window.main_page.props.add_message(messages)
}

function mapStateToProps(state){
    return{
        name:state.sr.selected_user.name,
    }
}

function mapDispatchToProps(dispatch){
    return {add_message : (payload) => dispatch(add_message(payload)),}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main_page);
//export default Main_page;