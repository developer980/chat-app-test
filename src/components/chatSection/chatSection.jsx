import React from "react";
import "./chatSection.css";
import Message_input from "../message_input/message_input";
import Messages from ".././messages";
import Conv_header from "../conv_header/conv_header";

function chatSection(props){
    const{user, writeUserData, messages, name, userList} = props;
    //console.log(messages);
    return(
        <div className="chat-section">
            <Conv_header name = {name}/>
            <Messages
            userList = {userList}
            user = {user}
           // message_list = {messages}
            >
            </Messages>
            <Message_input user = {user}>
            </Message_input>
        </div>
    )
}

export default chatSection;