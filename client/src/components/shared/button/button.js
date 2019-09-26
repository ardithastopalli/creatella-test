import React, { Component } from 'react'

function Button() {
   const [clicked, setClick] = React.useState(false)

    const handleClick = ()=> setClick(clicked=> !clicked)
    const text = clicked ? 'Bought' : 'Buy'
    return <button onClick={handleClick}>{text}</button>
}

export default Button