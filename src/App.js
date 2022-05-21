import logo from "./logo.svg";
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/signIn/signIn";
import Profile from "./pages/profile/profile";
import File from "./pages/File";
import Main_page from "./pages/main_page/main_page";
import withFirebaseAuth from "react-with-firebase-auth";
//
import * as firebase from "firebase/app";
import firebaseConfig from "./configs/firebase";
import { database } from "firebase/database";
import "firebase/auth";
import { useState, useEffect } from "react";
import { onSnapshot, collection } from "@firebase/firestore";
import { connect } from "react-redux";
import { add_message } from "./redux/message/action";
import { updateMessages } from "./components/messages/messages";
import { updateChat } from "./pages/main_page/main_page";
import { load_contacts } from "./components/contacts_section/contacts_section";

const firebaseapp = firebase.initializeApp(firebaseConfig);
const firebaseAppAuth = firebaseapp.auth();
const db = firebaseapp.database();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  emailProvider: new firebase.auth.EmailAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider(),
};

class App extends React.Component {
  constructor(props) {
    super(props);
    window.mainComponent = this;
    this.state = {
      messages: [],
      users: [],
      conv_name: "",
      conv_id: "",
      name: "",
    };
  }

  updateList(messages) {
    this.setState({ messages: messages });
    updateChat(messages);
  }

  updateUsers(users) {
    this.setState({ users: users });
  }

  render() {
    const { history } = this.props;
    console.log(this.state);
    console.log(this.props);
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Main_page
                {...props}
                user={this.props.user}
                signInWithGoogle={this.props.signInWithGoogle}
                messages={this.state.messages}
                userList={this.state.users}
                signOut={this.props.signOut}
              />
            )}
          ></Route>
        </Switch>
      </div>
    );
  }
}

let current_length = 0;
let length = 0;
let uid;
let conv_name = "";
const mesRef = db.ref(`/messages/`);
let newMesArray = [];
let mesArray = [];
let from;
let to;
let contactList = [];
let contacts_length = 0;
let display = "";
let k = 0;

export function changeDisplay(val) {
  display = val;
}

db.ref(`/contacts/`).on("value", (snapshot) => {
  if (window.mainComponent.props.user) {
    contactList = [];
    snapshot.forEach(function (childSnapshot) {
      if (window.mainComponent.props.user.uid == childSnapshot.val().uid) {
        const name = childSnapshot.val().name;
        const id = childSnapshot.val().contact_id;
        contactList.push({
          name,
          id,
        });
      }
    });

    load_contacts(contactList);
    // console.log(contactList);
  }
});

const userRef = db.ref("/users/");
let userList = [];

userRef.on("value", (snapshot) => {
  length = 0;
  userList = [];
  snapshot.forEach(function (childSnapshot) {
    const name = childSnapshot.val().name;
    const id = childSnapshot.val().id;
    userList.push({
      name,
      id,
    });
  });
  window.mainComponent.setState({ users: userList });
});
mesRef.on("value", (snapshot) => {
  if (window.mainComponent.props.user) {
    mesArray = [];
    snapshot.forEach(function (childSnapshot) {
      const text = childSnapshot.val().text;
      const key = childSnapshot.key;
      const from = childSnapshot.val().from;
      const to = childSnapshot.val().to;
      const from_name = childSnapshot.val().from_name;
      mesArray.push({
        text,
        from,
        to,
        key,
        from_name,
      });
    });
    window.mainComponent.updateList(mesArray);
    console.log(mesArray);
    for (let j = 0; j < contactList.length; j++) {
      if (mesArray[j].from == contactList[j].id) {
        if (length < 1) {
          length++;
          console.log("length" + length);
        }
      }
    }
    for (let i = 0; i < mesArray.length; i++) {
      let length = 0;

      if (window.mainComponent.props.user.uid == mesArray[i].to) {
        if (length < 1) {
          db.ref(`/contacts/`).push({
            contact_id: mesArray[i].from,
            name: mesArray[i].from_name,
            uid: window.mainComponent.props.user.uid,
          });
        }
      }
    }
  }

  console.log("checked");
});
export function writeUserInfo() {
  if (window.mainComponent.props.user) {
    length = 0;
    const userRef = db.ref("/users/");
    userRef.once("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        const id = childSnapshot.val().id;
        if (id == window.mainComponent.props.user.uid) {
          length++;
          console.log(length);
        }
      });
    });

    const name = window.mainComponent.props.user.displayName;
    const id = window.mainComponent.props.user.uid;
    if (length < 1) {
      userRef.push({
        name,
        id,
      });
    }
    load_contactList();
  }
  userRef.once("value", (snapshot) => {
    length = 0;
    userList = [];
    snapshot.forEach(function (childSnapshot) {
      const name = childSnapshot.val().name;
      const id = childSnapshot.val().id;
      userList.push({
        name,
        id,
      });
    });
    window.mainComponent.setState({ users: userList });
  });
}

export function writeUserData(text, uid, name) {
  const mesRef = db.ref(`/messages/`);
  mesRef.push({
    text,
    from: uid,
    to: window.mainComponent.state.conv_id,
    to_name: window.mainComponent.state.conv_name,
    from_name: name,
  });
}

export function get_conversation(address, name) {
  window.mainComponent.setState({ conv_id: address });
  window.mainComponent.setState({ conv_name: name });
  uid = window.mainComponent.props.user.uid;
  console.log(name);
}

export function addContact(name, uid, contact_id) {
  contacts_length = 0;
  k += 1;
  console.log("K: ", k);
  console.log(contactList);
  //contactList = [];
  console.log(uid);
  db.ref("/contacts/")
    .once("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        if (contacts_length < 1) {
          if (
            contact_id == childSnapshot.val().contact_id &&
            uid == childSnapshot.val().uid
          ) {
            contacts_length++;
          }
          console.log(contacts_length);
        }
      });
    })
    .then(() => {
      //console.log("Final: " + contacts_length);
      if (contacts_length < 1) {
        db.ref(`/contacts/`).push({
          name,
          uid,
          contact_id,
        });
      }
    });

  if (contacts_length < 1) {
    db.ref(`/contacts/`).once("value", (snapshot) => {
      contactList = [];
      snapshot.forEach(function (childSnapshot) {
        if (window.mainComponent.props.user.uid == childSnapshot.val().uid) {
          const name = childSnapshot.val().name;
          const id = childSnapshot.val().contact_id;
          contactList.push({
            name,
            id,
          });
        }
      });

      load_contacts(contactList);
    });
  }
}

export function load_contactList() {
  db.ref(`/contacts/`).once("value", (snapshot) => {
    contactList = [];
    snapshot.forEach(function (childSnapshot) {
      if (window.mainComponent.props.user.uid == childSnapshot.val().uid) {
        const name = childSnapshot.val().name;
        const id = childSnapshot.val().contact_id;
        contactList.push({
          name,
          id,
        });
      }
    });
  });
  load_contacts(contactList);
}

export function remove_message(key) {
  db.ref("/messages/").child(key).remove();
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
