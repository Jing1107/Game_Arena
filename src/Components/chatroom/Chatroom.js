import React, { Component } from 'react'
import fb from './../../config/Firebase'


import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'

class Chatroom extends Component {
  constructor(){
    super();
    this.state = {
      messages : {},
      user : {}
    }
    this.sendMessage = this.sendMessage.bind(this)
    this.authListener()
  }

  componentDidMount(){
    this.fetchMessages()
  }

  authListener() {
    fb.auth().onAuthStateChanged(
      (user) => {
        // console.log(user);
        if (user) {
          this.setState({ user });
          // localStorage.setItem('user', user.uid);
        } else {
          this.setState({ user: null })
          // localStorage.removeItem('user')
        }
      }
    )
  }

  sendMessage(text) {
    // this.setState({
    //   messages : [...this.state.messages, {text, senderId: this.state.user.email}]
    // })
    const messageDB = fb.database().ref().child("game_rooms").child(this.props.id).child("messages")
    messageDB.push({
      text,
      senderId: this.state.user.email
    })
  }

  fetchMessages(){
    const messageDB = fb.database().ref().child("game_rooms").child(this.props.id).child("messages")
    messageDB.on('value', snap => {
      this.setState({
        messages : snap.val()
      })
    })
  }

  render() {
      return (
        <div className="chatroom">

            <MessageList messages={this.state.messages}/>
            <SendMessageForm sendMessage={ this.sendMessage }/>
        </div>
      );
  }
}

export default Chatroom
