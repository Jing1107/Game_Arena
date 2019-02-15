import React, { Component } from 'react';
import fb from './../config/Firebase'

import Nav from './Nav';
import GameList from './GameList';
import Footer from './Footer';
import GameRoom from './GameRoom'

const games = {
  tictactoe : {
    name : "Tic Tac Toe",
    board : [0,0,0,0,0,0,0,0,0],
    capacity : 2,
  }
}

class GameRoomListPage extends Component {
  constructor(){
    super()
    this.state = {
      rooms : {},
      newRoomName: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.createNewRoom = this.createNewRoom.bind(this)
  }

  fetchGameRooms(){
    const game_roomsDB = fb.database().ref().child("game_rooms")
    game_roomsDB.on('value', snap => {
      this.setState({ rooms : snap.val()})
    })
  }

  createNewRoom (e) {
    e.preventDefault()
    const game_roomsDB = fb.database().ref().child("game_rooms")
    let newRoomRef = game_roomsDB.push({
      game_board : [0,0,0,0,0,0,0,0,0],
      status: "before",
      user_list: [0,0],
      name: this.state.newRoomName
    })
    newRoomRef.update({
      id: newRoomRef.key
    })
  }

  handleChange (e) {
    this.setState({
      newRoomName: e.target.value
    })
  }

  componentDidMount(){
    this.fetchGameRooms()
  }



  render() {
    return (
      <div className="App" id="page-top">
        <div className="wrapper">
        <Nav user={this.props.user}/>
          <section className="portfolio" id="portfolio">
            <div className="container">
              <h2 className="text-center text-uppercase text-secondary mb-0">{games[this.props.match.params.name]["name"]}</h2>
                <hr className="star-dark mb-5" />
                <div className="row">
                  <form onSubmit={this.createNewRoom} className="newRoom col-md-12 col-lg-12">
                    <h3>Create new room</h3>
                    <div className="form-group">
                    <label>Room name</label>
                    <input className="form-control" onChange={this.handleChange} placeholder="enter room name" required />
                    </div>
                    <div className="form-group">
                    <label>Select game</label>
                    <select className="form-control">
                    <option>Select a game...</option>
                    </select>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                      <label className="form-check-label" for="defaultCheck1">
                      Private Room
                      </label>
                      </div>
                    <input className="btn btn-primary" type="submit" value="Create" />
                  </form>
                  <h3 className="col-12 text-center mt-4">All Game Room</h3>
                  {Object.keys(this.state.rooms).map((key) => {
                    if(this.state.rooms[key].status === "before") {
                      return (<div className="gameroom col-md-3 col-lg-3"><GameRoom  key={key} roomId={key} room={this.state.rooms[key]} user={this.props.user}/></div>)
                    }
                    })
                  }
                </div>
              </div>
          </section>
        </div>
        <div className="pusher">
        </div>
        <Footer />
      </div>
    );
  }
}

export default GameRoomListPage;
