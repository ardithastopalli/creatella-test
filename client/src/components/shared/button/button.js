import React, { Component } from 'react'

class Button extends Component {
    state = {
        clicked: false
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        const { clicked } = this.state
        let text = clicked ? 'Bought' : 'Buy'
        return <button onClick={this.handleClick}>{text}</button>
    }
}

export default Button