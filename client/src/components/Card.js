import React, { Component } from 'react'

import './styles/style.css'

class Card extends Component {
  

  render () {
    const { onClick, children, className, style } = this.props

    return (
      <div
        style = { style }
        className = { `card ${className}` } onClick = { onClick }>
        { children }
      </div>
    )
  }
}

export default Card