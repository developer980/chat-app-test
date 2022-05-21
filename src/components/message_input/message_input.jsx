import React, {useState} from "react";
import "./message-input.css";
import SendBtn from "../../Icons/sendBtn.svg";
import { writeUserData } from "../../App";
//import App from "../../App";


class message_input extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            text:'',
            id:'',
            messages:[],
        }
    }

    render(){
        const {text, id} = this.state;
        const {user} = this.props;
        return(
            <div className = "m-input">
                <input type="text" placeholder="Type a message" value = {text} className = "message" 
                onKeyDown={(event) =>{
                    if(event.key === 'Enter'){
                        this.sendMessage(text, user.uid, user.displayName)
                    }
                }} onChange={(event)=> this.setMessage(event)} />
                <button  className="send-btn"
                onClick={() => 
                this.sendMessage(text, user.uid, user.displayName)
                    }>
                    <img src={SendBtn} alt="" className="send-icon"/>
                </button>
            </div>
        )
    }

    setMessage(event){
        this.setState({text:event.target.value});
       // console.log(this.state.text);
        this.setState({id:this.props.user.uid});
    }

    sendMessage(text, id, name){
        //console.log(uid);
        if(text)
            writeUserData(text, id, name);
        this.setState({text:''});
       // this.setState({messages:readUserData()})
    }
}

export default(message_input);