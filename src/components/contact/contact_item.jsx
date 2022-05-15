import React from "react";
import './contact_item.css';
import { connect } from "react-redux";
import { selectUser } from "../../redux/userSelect/action";
import { get_conversation } from "../../App";
import ProfilePic from "../../Icons/profile.svg";

function contact_item(props){
    const{name, id, uid, messages, latest_message} = props;
    // console.log('Name = ' + name, 'id = ' + id);
    //console.log(id);
    let contact_messages = [];
    let sender = [];
    
    messages.map(message =>{
        if((uid == message.from && id ==message.to)||
        (id == message.from && uid ==message.to))
        {
             contact_messages.push(message.text);
             sender.push(message.from);
        }
    });
   // console.log(messages);
    return(
        <button className="contactItem"
        onClick = {() => getUser(props, name, id, uid)}>
            <img src={ProfilePic} alt="" className="item1 contact-profile" />
            <div className="item2">
               {name}
            </div><br></br>
            {contact_messages[0] ? 
            <div className="item3">
                {uid == sender[0] ?
                <i>You:{contact_messages[0]}</i> :
                <i>{contact_messages[0]}</i>}
                
            </div>:
            <div className="item3">
                <i>You're connected</i>
                
            </div>}
        </button>
    )
}
function getUser(props, name, id, uid){
    console.log(name)
    get_conversation(id, name);
    props.selectUser({name, id});
}



export function mapDispatchToProps(dispatch){
    return{
        selectUser: (payload) => dispatch(selectUser(payload))
    }
}


export default connect(null, mapDispatchToProps)(contact_item);