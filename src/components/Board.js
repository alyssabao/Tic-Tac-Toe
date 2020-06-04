import React, { Component } from 'react'
import Square from './Square.js'
import Square2 from './Square2.js'

let startTime = 0
let endTime = 0

export default class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: ''
        }
    }
    renderSquare = (num) => {
        return <Square id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }

    renderSquare2 = (num) => {
        return <Square2 id={num} boxClick={this.boxClick} value={this.props.squares[num]} />
    }

    boxClick = (id) => {
        let currentPointer = this.props.current;
        currentPointer++;
        if (this.calculateWinner(this.props.squares) || this.props.squares[id]) {
            return;
        }
        console.log("You clicked box", id)
        let squaresFromApp = this.props.squares
        console.log("square you got so far is:", squaresFromApp)
        if(squaresFromApp.every(item => item === null)) {
            startTime = Date.now()
            console.log("ddd", startTime)
        }
        squaresFromApp[id] = this.props.isXNext ? 'X' : 'O'
        const winner = this.calculateWinner(this.props.squares);
        if (winner) {
            this.setState({status: 'Winner: ' + winner});
            endTime = Date.now()
            let duration = Math.floor((endTime - startTime)/1000)
            this.postData(duration)
            this.props.getData()
            } else if (this.props.squares.every(item => item!==null)) {
                this.setState({status:`It's a draw!`})
        } else {
            this.setState({status:`Next Player: ${this.props.isXNext ? 'X' : 'O'}`})
        }
        console.log("after change:", squaresFromApp)
        let cutHistory = this.props.history.slice(0, currentPointer)
        this.props.setTheState({ squares: squaresFromApp.slice(), isXNext: !this.props.isXNext, history: [...cutHistory, { squares: squaresFromApp.slice(), isXNext: !this.props.isXNext }], current: currentPointer })
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

    postData = async(duration) => {
        let data = new URLSearchParams();
        data.append("player", this.props.user);
        data.append("score", duration);
        console.log("aaa",this.props.user,"bbb",this.props.time)
        const url = `https://ftw-highscores.herokuapp.com/tictactoe-dev`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data.toString(),
            json: true
        });
    }

    render() {
        // const winner = this.calculateWinner(this.props.squares);
        // let status;
        // if (winner) {
        //     status = 'Winner: ' + winner;
        //     endTime = Date.now()
        //     let duration = Math.floor((endTime - startTime)/1000)
        //     this.postData(duration)
        //     } else if (this.props.squares.every(item => item!==null)) {
        //         status = `It's a draw!`
        // } else {
        //     status = `Next Player: ${this.props.isXNext ? 'X' : 'O'}`
        // }
        return (
            <div className="centerFormat">
                <h1>Tic Tac Toe</h1>
                <h2>User: {this.props.user}</h2>
                <h2>{this.state.status}</h2>
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
