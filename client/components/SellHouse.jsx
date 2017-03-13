import React from 'react'
import { connect } from 'react-redux'
import { setUserProperties } from './store/actionCreators'
import comments from '../helper/comment'
import sock from '../helper/socket'

const SellHouse = (props) => {
  const sellHouse = (propertyPosition) => {
    let propertiesArray = [...props.userPropertiesArray[props.playerIndex]]
    let houseSalePrice = 0
    propertiesArray.forEach((property) => {
      if (property.Position === propertyPosition && property.Houses > 0) {
        houseSalePrice = property.PropertyObj.HOUSE_SALE_PRICE
        property.Houses -= 1
        let arr = []
        for (let i = 0; i < property.Houses; i++) {
          arr.push(i)
        }
        var house = `h${propertyPosition}`
        let obj = {}
        obj[house] = arr
        props.setHouse(obj)
        props.increaseFunds(houseSalePrice)
        // sock.updateMoney({ gameID: props.gameID, money: houseSalePrice, index: props.playerIndex })
        props.dispatch(setUserProperties(propertiesArray, props.playerIndex))
        let newComment = ''
        if (property.Houses === 4) {
          newComment = comments.soldHotel(props.username, property.PropertyObj.NAME, houseSalePrice)
        } else {
          newComment = comments.soldHouse(props.username, property.PropertyObj.NAME, houseSalePrice)
        }
        props.setState({ comment: newComment, showToast: true })
        sock.socket.emit('comment', { gameID: props.gameID, comment: newComment })
      }
    })
  }

  return (
    <button onClick={() => { sellHouse(props.propertyPosition) }}>Sell House</button>
  )
}

const mapStateToProps = (state) => {
  return {
    userPropertiesArray: state.userPropertiesArray,
    playerIndex: state.playerIndex,
    gameID: state.gameID,
    username: state.username,
    userCashArray: state.userCashArray
  }
}

SellHouse.propTypes = {
  userPropertiesArray: React.PropTypes.array.isRequired,
  propertyPosition: React.PropTypes.number.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  username: React.PropTypes.string.isRequired,
  gameID: React.PropTypes.number.isRequired,
  setState: React.PropTypes.func.isRequired,
  increaseFunds: React.PropTypes.func.isRequired
}
export default connect(mapStateToProps)(SellHouse)
