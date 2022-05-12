import React from "react";
import "./userItem.css";
import ProfilePic from "../Icons/profile.svg";
import { connect } from "react-redux";
import { selectUser } from "../redux/userSelect/action";
import { get_conversation } from "../App";
import message_input from "./message_input/message_input";
import { addContact } from "../App";
import { clearSearch } from "./contacts_section";

function getConv(payload){
   /// props.selectUser(payload)
}

function match(name, section, matching_section, remaining_section){
    // if(section){

//}
}

function UserItem(props){
    const {name, id, section, uid} = props
    let matching_section = '';
    let remaining_section = '';
    let x = 0;

     console.log('Name = ' + name, 'id = ' + id);
    // const text = document.getElementsByClassName()
   // name.style.color = 'blue';
//    name.map( character)
for(let i = 0; i< name.length; i++){
    if(name[i] == section[i]){
        
        if(name[i] == ''){
            x++;
        }
    }
}
    for(let i = 0; i< name.length; i++){
        console.log(x);
        if(name[i] == section[i]){
            matching_section += name[i];
        }
        // if(name[i+1] == ' '){
        //     matching_section += '\xa0';
        // }
    }
    remaining_section = name.substring(matching_section.length, name.length);
    console.log(name.length + " - " + matching_section.length + " = " + (name.length - matching_section.length));
    return (
        <button className="userItem"
        onClick = {() => getUser(props, name, id, uid)}>
            <img src={ProfilePic} alt="" className="user-profile" />
            <div style = {{color:'rgb(61, 170, 144)'}}>
               <b>{matching_section}</b> 
            </div>
            <div>
                {remaining_section}
            </div>
        </button>
    )
}

function getUser(props, name, id, uid){
    console.log(name);
    get_conversation(id, name);
    props.selectUser({name, id});
    addContact(name, uid, id);
    clearSearch();
}



export function mapDispatchToProps(dispatch){
    return{
        selectUser: (payload) => dispatch(selectUser(payload))
    }
}

export default connect(null, mapDispatchToProps)(UserItem);