import React, { Component } from 'react'

export default class Square2 extends Component {
    render() {
        return (
            <div className="colorBox" onClick={()=>this.props.boxClick(this.props.id)}>
                {this.props.value===null ? "" : (this.props.value==="X" ? <img src="https://i.ibb.co/995m4GK/x-symbol.png" alt="X"></img> : <img src="https://i.ibb.co/mXtkdsf/o-symbol.png" alt="O"></img>)}
            </div>
        )
    }
}