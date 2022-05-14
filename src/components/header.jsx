import React from "react";
import "./header.css";
import Picture from '../Icons/profile.svg';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { changeDisplay } from "./contacts_section/contacts_section";
class Header extends React.Component{
    constructor(props){
        super(props);
        this.state = {}
    }

    render(){
    const {user, userList} = this.props;
    console.log(userList);
        return(
            <header>
                <nav>
                    <img src={Picture} alt="" className="myIcon"/>
                    <button onClick = {()=> changeDisplay('profile')}>
                        <div className="me">
                            {user ? user.displayName: null}
                        </div>
                    </button>
                    {/* <SearchBar/> */}
                </nav>
            </header>
        )
    }
}

export default Header;