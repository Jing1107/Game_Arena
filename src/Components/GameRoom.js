import React, { Component } from 'react'
import fb from './../config/Firebase'

class GameRoom extends Component {


  componentWillMount () {
    const roomDB = fb.database().ref().child("game_rooms").child(this.props.roomId)
    roomDB.on('value', snap => {
      const players = snap.val().user_list
      if (players[0] !== 0 && players[1] !== 0) {
        roomDB.update({
          "status" : "full"
        })
      }
    })

  }

  render () {
    return (


      <div class="card w-100">
        <div class="card-body">
          <h5 class="card-title">{this.props.room.name}</h5>
          <h6>Player 1:</h6>
          <p>{(this.props.room.user_list[0] === 0) ? "Empty" : this.props.room.user_list[0]}</p>
          <h6>Player 2:</h6>
          <p> {(this.props.room.user_list[1] === 0) ? "Empty" : this.props.room.user_list[1]}</p>
          <a href={`#/session/${this.props.roomId}`} class="btn btn-primary">Join</a>
          </div>
      </div>
    )
  }
}

export default GameRoom
