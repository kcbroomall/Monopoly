import React from 'react'
import { connect } from 'react-redux'
import comments from '../helper/comment'
import sock from '../helper/socket'
import {
  setUserProperties
} from './store/actionCreators'

const Mortgage = (props) => {
  const mortgageProperty = (propertyName) => {
    let tempProperties = [...props.userPropertiesArray[props.playerIndex]]
    let mortgageAmount = 0
    tempProperties.forEach((property) => {
      if (property.PropertyObj.NAME === props.propertyName) {
        property.Mortgaged = true
        mortgageAmount = property.PropertyObj.MORTGAGE_PRICE
      }
    })
    let newComment = comments.mortgageProperty(props.username, props.propertyName, mortgageAmount)
    props.setState({ comment: newComment, showToast: true })
    sock.socket.emit('comment', { gameID: props.gameID, comment: newComment })
    props.dispatch(setUserProperties(tempProperties, props.playerIndex))
    props.increaseFunds(mortgageAmount)
    // sock.updateMoney({ gameID: props.gameID, money: mortgageAmount, index: props.playerIndex })
  }
  return (
    <button onClick={() => { mortgageProperty() }}>Mortgage</button>
  )
}

const mapStateToProps = (state) => {
  return {
    userPropertiesArray: state.userPropertiesArray,
    gameID: state.gameID,
    username: state.username,
    playerIndex: state.playerIndex
  }
}

Mortgage.propTypes = {
  userPropertiesArray: React.PropTypes.array.isRequired,
  propertyName: React.PropTypes.string.isRequired,
  username: React.PropTypes.string.isRequired,
  gameID: React.PropTypes.number.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  setState: React.PropTypes.func.isRequired,
  increaseFunds: React.PropTypes.func.isRequired
}
export default connect(mapStateToProps)(Mortgage)
