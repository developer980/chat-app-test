import React from "react";
import "./myMessage.css";
import { useTextWidth } from '@imagemarker/use-text-width';
import { remove_message } from "../App";
import remove from '../Icons/x.svg';


function myMessage(props){
    const{text, id, code} = props;
    // const width = useTextWidth({text, font: '20px Times'})
    // console.log(text[text.length - 1]);
    console.log(code);
    //getWidth(text)
    //console.log(text.offsetWidth);
    // let message = document.getElementsByClassName("my-message");
    // message = message.replace(/  /g, "[sp] [sp]")
    // message = message.replace(/\n/g, "[sp] [sp]")

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

// function getWidth(text){
//     text.innerHTML = this;
//     console.log(text.offsetWidth);
// }

export default myMessage;