import React from "react";
import "./messages.css";
import { connect } from "react-redux";
import MyMessage from './myMessage';
import { readUserData } from "../App";
import OtherMessage from "./otherMessage";

class messages extends React.Component{
    constructor(props){
        super(props);
        window.messages_component = this;
        this.state = {
            messages:[],
         //   key:0,
        }
    }

    render(){
        const{user, message_list, conv_id, conv_name} = this.props;
        let list;
        list = {...this.state.messages}
     //   console.log(message_list[1].key);
     //   this.setState({messages:messages.messages});
       //messages = this.state.messages;
        return(
            <div className="messages">

                
                {
                    message_list?
                message_list.map(message=>{
                   // this.state.key+=1;
                   // console.log(message.key);
                    if(message.to == conv_id && message.from == user.uid){
                        return(
                            <div
                            key = {message.key}>
                        <MyMessage 
                        text = {message.text}
                        id = {user.uid}
                        code = {message.key}
                        ></MyMessage>
                            </div>
                        )
                    }                    
                    else if(message.to == user.uid && message.from == conv_id){
                        return(
                            <div
                            key = {message.key}>
                        <OtherMessage 
                        text = {message.text}
                        name = {conv_name}
                        ></OtherMessage>
                            </div>
                        )
                    }
                }) : null
                }
            </div>
        )
    }
}

export function updateMessages(messages_list){
//     window.messages_component.setState({messages:messages_list});
//     console.log(window.messages_component.state.messages)
}

function mapStateToProps(state){
    return{
        message_list:state.msg.message_list,
        conv_id:state.sr.selected_user.id,
        conv_name:state.sr.selected_user.name,
    }
}

export default connect(mapStateToProps, null)(messages);