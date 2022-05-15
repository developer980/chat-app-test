import React from "react";
import "./myMessage.css";
import { remove_message } from "../../App";
import remove from '../../Icons/x.svg';


function myMessage(props){
    const{text, id, code} = props;

    return(
        <div className="message-set">
            <button className="delete" onClick = {()=>{remove_message(code)}}>
                <img className="remove-btn" src={remove} alt="" />
            </button>
            <div className="my-message">
                {text}
            </div>
        </div>
    )
}
export default myMessage;