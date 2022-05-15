import React from "react";
import "./otherMessage.css"

export default function otherMessage(props){
    const{name, text} = props;
    return(
        <div className = 'message-components'>
            <div className = 'sender-name'>
                {name}
            </div>
            <div className = 'other-message'>
                {text}
            </div>
        </div>
    )
}