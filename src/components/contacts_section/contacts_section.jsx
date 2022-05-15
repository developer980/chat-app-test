import React from "react";
import "./contacts_section.css";
import UserItem from "../userItem";
import Profile from "../../pages/profile/profile";
import Contact_item from "../contact/contact_item";
import Clear from '../../Icons/x.svg';
import { connect } from "react-redux";


class contacts extends React.Component{
    constructor(props){
        super(props);
        window.contacts_section = this;
        this.state={
            value:'',
            display:'list',
            contact_list:[],
            key:0,
        }
    }

    setValue(event){
        this.setState({value:event});
    }


    search(event){
        this.setValue(event.target.value)
       }

    render(){
        //console.log(this.state);
        const{userList, display, user, signOut, messages} = this.props;
       // console.log(userList);
       console.log(this.state.value);
    //    userList[0]?
    //    console.log(userList[0].name):console.log("none");
    //console.log(this.state.contact_list);

        return(
            
            <div className="contacts">
               {this.state.display == 'list' ?
                   <div className="iii">
               <div className="search-section">
               <input id = "input" className="search-input"placeholder="Search people" type="text" onClick = {event=>event.preventDefault()} onChange = {(event) => this.search(event)}/> 
               {this.state.value ?
                              <button className="clear-btn" onClick = {(event) => clearSearch()}>
                              <img className="close-icon" src={Clear} alt="" />
                              </button>:null}  
        
               </div>
               
               
                 {
                 this.state.value?
                    userList.filter(item=> item.name.includes(this.state.value)).map(
                        item =>{
                        this.state.key+=1;
                            return(
                                <UserItem
                                name = {item.name}
                                id = {item.id}
                                section = {this.state.value}
                                uid = {user.uid}
                                key ={this.state.key}
                                />
                            )
                        }
                    ):this.state.contact_list? 
                    this.state.contact_list.map(
                        item =>{
                        this.state.key+=1;
                            return(
                                <Contact_item name = {item.name}
                                id = {item.id}
                                uid = {user.uid}
                                messages = {messages}
                                key ={this.state.key}/>
                            )
                        }
                    )
                    :null} 
                {/* {this.state.value? userList.map(item=>console.log(item.name)):console.log('none')} */}
                </div>
                :
                
                    <Profile
                    user = {user}
                    signOut = {signOut}></Profile>
                
                }
            </div>
        )
    }
}

export function clearSearch(){
    window.contacts_section.setState({value:''});
    document.getElementById("input").value = '';
  //  console.log( window.contacts_section.state.value);
}

export function load_contacts(contact_list){
    window.contacts_section.setState({contact_list})
}

export function changeDisplay(display){
    window.contacts_section.setState({display});
}

// function mapDispatchToProps(dispatch){
//     return {add_message : (payload) => dispatch(add_message(payload)),}
// }

function mapStateToProps(state){
    return{
        messages:state.msg.message_list
    }
}


export default connect(mapStateToProps, null) (contacts);