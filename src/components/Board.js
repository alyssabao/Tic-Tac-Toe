import React, { Component } from 'react'
import Square from './Square.js'
import Square2 from './Square2.js'

export default class Board extends Component {
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]}/>
    }

    renderSquare2 = (num) => {
        return <Square2 id={num} boxClick={this.boxClick} value={this.props.squares[num]}/>
    }

    boxClick = (id) => {
        if (this.calculateWinner(this.props.squares) || this.props.squares[id]) {
            return;
        }
        console.log("You clicked box",id)
        let squaresFromApp = this.props.squares
        console.log("square you got so far is:", squaresFromApp)
        squaresFromApp[id] = this.props.isXNext?'X':'O'
        console.log("after change:", squaresFromApp)
        // let array = this.props.history.slice()
        // array=array.concat({squares:squaresFromApp.slice(), isXNext:!this.props.isXNext})
        this.props.setTheState({squares:squaresFromApp, isXNext:!this.props.isXNext,history:[...this.props.history.slice(),{squares:squaresFromApp.slice(), isXNext:!this.props.isXNext}]})
    }

    calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
          ];
          for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
            }
          }
          return null;
    }

    render() {
        const winner = this.calculateWinner(this.props.squares);
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = `Next Player: ${this.props.isXNext?'X':'O'}`
        }
        return (
            <div className="centerFormat">
                <h1>Tic Tac Toe</h1>
                <h2>{status}</h2>
                <div className="row">
                    {this.renderSquare(0)}
                    {this.renderSquare2(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="row">
                    {this.renderSquare2(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare2(5)}
                </div>
                <div className="row">
                    {this.renderSquare(6)}
                    {this.renderSquare2(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}
