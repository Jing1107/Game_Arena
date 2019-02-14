import React, { Component } from 'react';

import Message from './Message'

class MessageList extends Component {

  render() {
      return (
          <div className="message-list">
            {(this.props.messages === null) ? "" : 
              Object.keys(this.props.messages).map((key) => {
                return (<Message key={key} message={this.props.messages[key]}/>)
              })
            }
          </div>
      )
  }
}

export default MessageList;
