import React from "react";
import "./conv_header.css";
import profilePic from "../../Icons/profile.svg";
//import { connect } from "react-redux";

function conv_header(props){
        const {name} = props;
        console.log(name);
        return(
            <div className="conv-header">
                <img src={profilePic} alt="" className="user-profile-pic"/>
                <div className="username">
                    {name}
                </div>
            </div>
        )
    }

export default conv_header;