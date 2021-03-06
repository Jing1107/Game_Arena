import React, { Component } from 'react'

class SendMessageForm extends Component {
  constructor(){
    super()
    this.state = {
      message : ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({
      message : e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.sendMessage(this.state.message)
    this.setState({
      message : ""
    })
  }

  render() {
      return (
          <form
            onSubmit = { this.handleSubmit }
            className="send-message-form">
              <input
                onChange = { this.handleChange }
                value = {this.state.message}
                placeholder="SendMessageForm"
                type="text" />
              <button className="btn btn-info" type="submit">Send</button>
          </form>
      )
  }
}

export default SendMessageForm
