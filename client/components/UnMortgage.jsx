import React from 'react'
import { connect } from 'react-redux'
import comments from '../helper/comment'
import sock from '../helper/socket'
import {
  setUserProperties
} from './store/actionCreators'

const UnMortgage = (props) => {
  const unmortgageProperty = (propertyName) => {
    let tempProperties = [...props.userPropertiesArray[props.playerIndex]]
    let mortgageAmount = 0
    tempProperties.forEach((property) => {
      if (property.PropertyObj.NAME === props.propertyName) {
        mortgageAmount = property.PropertyObj.UNMORTGAGE_PRICE
        if (props.cash > mortgageAmount) {
          property.Mortgaged = false
          props.dispatch(setUserProperties(tempProperties, props.playerIndex))
          props.reduceFunds(mortgageAmount)
          // sock.updateMoney({ gameID: props.gameID, money: -mortgageAmount, index: props.playerIndex })
          let newComment = comments.unmortgageProperty(props.username, props.propertyName, mortgageAmount)
          props.setState({ comment: newComment, showToast: true })
          sock.socket.emit('comment', { gameID: props.gameID, comment: newComment })
        } else {
          let newComment = comments.unmortgagePropertyInsufficientFunds(props.username, props.propertyName, mortgageAmount, props.cash)
          props.setState({ comment: newComment, showToast: true })
          sock.socket.emit('comment', { gameID: props.gameID, comment: newComment })
        }
      }
    })
  }
  return (
    <button onClick={() => { unmortgageProperty() }}>UnMortgage</button>
  )
}

const mapStateToProps = (state) => {
  return {
    userPropertiesArray: state.userPropertiesArray,
    username: state.username,
    gameID: state.gameID,
    playerIndex: state.playerIndex
  }
}

UnMortgage.propTypes = {
  userPropertiesArray: React.PropTypes.array.isRequired,
  username: React.PropTypes.string.isRequired,
  propertyName: React.PropTypes.string.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  gameID: React.PropTypes.number.isRequired,
  reduceFunds: React.PropTypes.func.isRequired,
  setState: React.PropTypes.func.isRequired,
  cash: React.PropTypes.number.isRequired
}
export default connect(mapStateToProps)(UnMortgage)
