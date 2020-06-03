import React, { Component } from 'react'
import Board from './components/Board.js'
import './App.css'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      squares:Array(9).fill(null),
      isXNext: true,
      stepNumber: 0,
      history: [],
      current:0
    }
  }

  setTheState = (obj) => {
    this.setState(obj)
  }

  timeTravel = (id) => {
    let newHistory = this.state.history.slice()
    this.setState ({
      squares: newHistory[id].squares.slice(),
      history: newHistory,
      isXNext: newHistory[id].isXNext,
      current: id
    })
  }

  render() {
    return (
      <div className="bg">
        <Board {...this.state} setTheState={this.setTheState}/>
        {console.log("jjjj",this.state.history)}
        <div className="historyFormat">
          <h2>History</h2>
          {this.state.history.map((item,idx) => {return <div><button className="btnFormat" onClick={()=>this.timeTravel(idx)}>Move {idx+1}</button></div>})}
        </div>
      </div>
    )
  }
}
