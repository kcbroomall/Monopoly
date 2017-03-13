import React from 'react'
import { connect } from 'react-redux'
import { setUserProperties } from './store/actionCreators'
import comments from '../helper/comment'
import sock from '../helper/socket'

const BuyHouse = (props) => {
  const buyHouse = (propertyPosition) => {
    let propName = ''
    let propArr = [...props.userPropertiesArray[props.playerIndex]]
    propArr.forEach(prop => {
      if (prop.Position === propertyPosition) {
        propName = prop.PropertyObj.NAME
      }
    })
    if (props.houses < 5) {
      let propertiesArray = [...props.userPropertiesArray[props.playerIndex]]
      let housePrice = 0
      propertiesArray.forEach((property) => {
        if (property.Position === propertyPosition && property.PropertyObj.ALLOWS_HOUSES) {
          housePrice = property.PropertyObj.HOUSE_PRICE
          propName = property.PropertyObj.NAME
          if (props.userCashArray[props.playerIndex] >= housePrice) {
            property.Houses += 1
            props.reduceFunds(housePrice)
            // sock.updateMoney({ gameID: props.gameID, money: -housePrice, index: props.playerIndex })
            let arr = []
            for (let i = 0; i < property.Houses; i++) {
              arr.push(i)
            }
            var house = `h${propertyPosition}`
            let obj = {}
            obj[house] = arr
            props.setHouse(obj)
            let newComment = ''
            if (property.Houses === 5) {
              newComment = comments.boughtHotel(props.username, property.PropertyObj.NAME, housePrice)
            } else {
              newComment = comments.boughtHouse(props.username, property.PropertyObj.NAME, housePrice)
            }
            props.setState({ comment: newComment, showToast: true })
            sock.socket.emit('comment', { gameID: props.gameID, comment: newComment })
            props.dispatch(setUserProperties(propertiesArray, props.index))
          } else if (props.userCashArray[props.playerIndex] < housePrice) {
            console.log('You do not have sufficient funds to purchase additional houses')
            let newComment = ''
            if (property.Houses === 4) {
              newComment = comments.buyHotelInsufficientFunds(props.username, property.PropertyObj.NAME, housePrice, props.userCashArray[props.playerIndex])
            } else {
              newComment = comments.buyHouseInsufficientFunds(props.username, property.PropertyObj.NAME, housePrice, props.userCashArray[props.playerIndex])
            }
            props.setState({ comment: newComment, showToast: true })
            sock.socket.emit('comment', { gameID: props.gameID, comment: newComment })
          }
        }
      })
    } else {
      console.log('You can not buy any more houses')
      let newComment = comments.alreadyHaveHotel(props.username, propName)
      props.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: props.gameID, comment: newComment })
    }
  }
  return (
    <button onClick={() => { buyHouse(props.propertyPosition) }}>Buy House</button>
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

BuyHouse.propTypes = {
  userPropertiesArray: React.PropTypes.array.isRequired,
  propertyPosition: React.PropTypes.number.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  gameID: React.PropTypes.number.isRequired,
  username: React.PropTypes.string.isRequired,
  reduceFunds: React.PropTypes.func.isRequired,
  setState: React.PropTypes.func.isRequired,
  propertyGroup: React.PropTypes.string.isRequired
}
export default connect(mapStateToProps)(BuyHouse)
