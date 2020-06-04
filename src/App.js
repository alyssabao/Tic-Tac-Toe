import React, { Component } from 'react'
import Board from './components/Board.js'
import './App.css'
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      isXNext: true,
      stepNumber: 0,
      history: [],
      current: 0,
      topRank: [],
      user: null,
      time: 0
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  timeTravel = (id) => {
    let newHistory = this.state.history.slice()
    this.setState({
      squares: newHistory[id].squares.slice(),
      history: newHistory,
      isXNext: newHistory[id].isXNext,
      current: id
    })
  }

  getData = async () => {
    let url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`
    let data = await fetch(url)
    let result = await data.json()
    this.setState({ ...this.state, topRank: result.items })
    console.log("what is result?", result)
  }

  componentDidMount() {
    this.getData();
  }

  responseFacebook = (response) => {
    console.log("jojo", response);
    this.setState({ user: response.name })
  }

  restart = () => {
    this.setState({squares:[...Array(9).fill(null)],isXNext: true})
    this.state.history.splice(0,this.state.history.length)
  }

  render() {
    if (this.state.user === null) {
      return (
        <div className="fbFormat">
          <FacebookLogin
            autoLoad={true}
            appId="538989406770059"
            fields="name,email,picture"
            callback={(resp) => this.responseFacebook(resp)}
          />


        </div>
      )
    }
    return (
      <div className="bg">
        <Board {...this.state} setTheState={this.setTheState} getData={this.getData}/>
        {console.log("jjjj", this.state.history)}
        <div className="historyFormat">
          <h2>History</h2>
          <div>
            <button className="btnFormat" onClick={() => this.restart()}>Restart</button>
          </div>
          {this.state.history.map((item, idx) => { return <div><button className="btnFormat" onClick={() => this.timeTravel(idx)}>Move {idx + 1}</button></div> })}
        </div>
        <div className="historyFormat">
            <h2>Top Ranked</h2>
            <div>{this.state.topRank.map(item => { return <div>{item.player}:{item.score}</div> })}</div>
          </div>
      </div>
    )
  }
}
