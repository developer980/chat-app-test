import logo from "./logo.svg";
import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./components/signIn/signIn";
import Profile from "./pages/profile/profile";
import File from "./pages/File";
import Main_page from "./pages/main_page";
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
import { updateMessages } from "./components/messages";
import { updateChat } from "./pages/main_page";
import { load_contacts } from "./components/contacts_section";

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

  // componentWill() {}

  updateList(messages) {
    this.setState({ messages: messages });
    updateChat(messages);
  }

  updateUsers(users) {
    this.setState({ users: users });
  }

  render() {
    const { history } = this.props;
    // console.log(this.props);
    // console.log(this.state.users);
    console.log(this.state);
    //  readContacts(this.props.user);
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
          <Route path="/signIn"></Route>
          <Route path="/file" component={File}></Route>
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

mesRef.on("value", (snapshot) => {
  mesArray = [];
  snapshot.forEach(function (childSnapshot) {
    const text = childSnapshot.val().text;
    const key = childSnapshot.key;
    from = childSnapshot.val().from;
    to = childSnapshot.val().to;
    mesArray.push({
      text,
      from,
      to,
      key,
    });
    if (window.mainComponent.props.user.uid == childSnapshot.val().to) {
      addContact(
        childSnapshot.val().from_name,
        window.mainComponent.props.user.uid,
        childSnapshot.val().from
      );
    }
  });
  window.mainComponent.updateList(mesArray);
});

const userRef = db.ref("/users");
let userList = [];

userRef.on("value", (snapshot) => {
  length = 0;
  snapshot.forEach(function (childSnapshot) {
    const name = childSnapshot.val().name;
    const id = childSnapshot.val().id;
    userList.push({
      name,
      id,
    });
  });
  window.mainComponent.setState({ users: userList });
  if (window.mainComponent.props.user) {
    uid = window.mainComponent.props.user.uid;
  }
});
//function readContacts(user) {

db.ref(`/contacts`).on("value", (snapshot) => {
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
  }
});

export function writeUserInfo() {
  if (window.mainComponent.props.user) {
    length = 0;
    const userRef = db.ref("/users");
    userRef.once("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        const id = childSnapshot.val().id;
        if (id == window.mainComponent.props.user.uid) {
          length++;
          console.log(childSnapshot.val());
        }
      });
    });

    mesRef.once("value", (snapshot) => {
      mesArray = [];
      snapshot.forEach(function (childSnapshot) {
        if (window.mainComponent.props.user.uid == childSnapshot.val().to) {
          addContact(
            childSnapshot.val().from_name,
            window.mainComponent.props.user.uid,
            childSnapshot.val().from
          );
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
  console.log(uid);
  contacts_length = 0;
  db.ref("/contacts")
    .once("value", (snapshot) => {
      snapshot.forEach(function (childSnapshot) {
        if (
          childSnapshot.val().contact_id == contact_id &&
          childSnapshot.val().uid == uid
        ) {
          contacts_length++;
          console.log(contacts_length);
        }
      });
    })
    .then(() => {
      if (contacts_length < 1) {
        db.ref(`/contacts`).push({
          name,
          uid,
          contact_id,
        });
      }
    });

  db.ref(`/contacts`).once("value", (snapshot) => {
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

export function load_contactList() {
  db.ref(`/contacts`).once("value", (snapshot) => {
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
  db.ref("/messages").child(key).remove();
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
