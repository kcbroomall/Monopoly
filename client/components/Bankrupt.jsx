import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import {
  setUserProperties,
  setCash,
  setEndTurn,
  setDiceRoll
} from './store/actionCreators'

const Bankrupt = (props) => {
  const handleBankrupt = () => {
    let tempProperties = [...props.userPropertiesArray[props.playerIndex]]
    let tempCash = props.userCashArray[props.playerIndex]
    tempProperties = []
    props.dispatch(setUserProperties(tempProperties, props.playerIndex))
    props.dispatch(setCash(-tempCash, props.playerIndex))
    props.dispatch(setEndTurn(true))
    props.dispatch(setDiceRoll(false))
  }
  return (
    <Button onClick={() => { handleBankrupt() }}>Bankruptcy</Button>
  )
}

const mapStateToProps = (state) => {
  return {
    userPropertiesArray: state.userPropertiesArray,
    playerIndex: state.playerIndex,
    userCashArray: state.userCashArray
  }
}

Bankrupt.propTypes = {
  userPropertiesArray: React.PropTypes.array.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  userCashArray: React.PropTypes.array.isRequired
}
export default connect(mapStateToProps)(Bankrupt)
