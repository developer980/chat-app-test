import React from "react";
import Header from "./header";
import "./Layout.css";

function Layout(props){
    const{user, signOut, userList} = props;
    return(
        <div className="layout">
            
            <Header
            user = {user}
            userList = {userList}
            signOut = {signOut}
            />{props.children}
        </div>
    )
}

export default Layout;