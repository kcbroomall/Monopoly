import React, { Component } from 'react'
import rules from '../static/rules'
import userNames from './user_order'
import sock from '../helper/socket'
import { connect } from 'react-redux'
import { setUserPositions, setIndex, setUserProperties } from './store/actionCreators'
import { Button } from 'semantic-ui-react'
import Card from './Cards'
class DiceRoll extends Component {
  constructor (props) {
    super(props)
    this.handleDiceRollButtonClick = this.handleDiceRollButtonClick.bind(this)
    this.handleMoveTokenButtonClick = this.handleMoveTokenButtonClick.bind(this)
    this.handleEndTurnButtonClick = this.handleEndTurnButtonClick.bind(this)
    // this.handleDoubles = this.handleDoubles.bind(this)
    // this.handleLandOnOrPassGo = this.handleLandOnOrPassGo.bind(this)
    this.increaseFunds = this.increaseFunds.bind(this)
    this.reduceFunds = this.reduceFunds.bind(this)
    this.propertyIsOwned = this.propertyIsOwned.bind(this)
    this.handleBuyPropertyButtonClick = this.handleBuyPropertyButtonClick.bind(this)
    this.handlePayRentButtonClick = this.handlePayRentButtonClick.bind(this)
    this.mortgageProperty = this.mortgageProperty.bind(this)
    this.unMortgageProperty = this.unMortgageProperty.bind(this)
    this.buyHouse = this.buyHouse.bind(this)
    this.sellHouse = this.sellHouse.bind(this)
    this.changeButton = this.changeButton.bind(this)

    this.state = {
      dice: [],
      diceSum: 0,
      diceSumComment: '',
      doubles: 0,
      doublesComment: '',
      moveTokenButtonVisible: false,
      // needs to be updated gamestate authentication
      cardButtonVisible: false,
      card: true,
      userNames: [userNames[0][0], userNames[1][0], userNames[2][0], userNames[3][0], userNames[4][0], userNames[5][0], userNames[6][0], userNames[7][0]],
      // up to 8 players all starting on GO or position 1
      jailPositions: [0, 0, 0, 0, 0, 0, 0, 0],
      userProperties: [[], [], [], [], [], [], [], []],
      // todo: property: [{'PropertyObj': {PropertyObj}, 'Mortaged': false, 'Houses': 0,
      // 'Position': X}],
      passGoComment: '',
      chanceComment: '',
      communityComment: '',
      diceRollButtonVisible: false,
      // needs to be updated gamestate authentication
      endTurnButtonVisible: false,
      buyPropertyComment: '',
      buyPropertyButtonVisible: false,
      rentOwed: 0,
      propertyOwner: '',
      payRentComment: '',
      payRentButtonVisible: false,
      numOfPlayers: 8
    }
  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps.userPosArray, nextProps.index)
    sock.updatePos({ gameID: nextProps.gameID, pos: nextProps.userPosArray[nextProps.index], index: nextProps.index })
  }
  componentDidMount () {
    sock.socket.on('yourTurn', (data) => {
      console.log(data)
      this.setState({ diceRollButtonVisible: true, numOfPlayers: data.numOfPlayers })
      this.props.dispatch(setIndex(data.index))
    })
    sock.socket.on('update properties', (data) => {
      // this.setState({ userProperties: data.userProperties})
    })
  }
  handleDiceRollButtonClick (doubleDice = 0) {
    const die1 = 1 + Math.floor((6 * Math.random()))
    const die2 = 1 + Math.floor((6 * Math.random()))
    if (die1 === die2) {
      doubleDice++
      this.setState({
        diceRollButtonVisible: false
      })
      this.handleMoveTokenButtonClick(doubleDice, die1, die2)
    } else {
      this.setState({
        diceRollButtonVisible: false
      })
      this.handleMoveTokenButtonClick(doubleDice, die1, die2)
    }
  }

  handleEndTurnButtonClick () {
    this.setState({
      doublesComment: '',
      passGoComment: '',
      chanceComment: '',
      communityComment: '',
      moveTokenButtonVisible: false,
      diceRollButtonVisible: false,
      endTurnButtonVisible: false,
      buyPropertyButtonVisible: false,
      buyPropertyComment: ''
    })
    sock.end({ gameID: this.props.gameID, pos: this.props.userPosArray[this.props.index], index: this.props.index })
  }

  handleMoveTokenButtonClick (doubles, die1, die2) {
    let userPosition = (this.props.userPosArray[this.props.index] + die1 + die2) % 40
    this.props.dispatch(setUserPositions(userPosition, this.props.index))
    let squareType = rules.PositionType[userPosition]
    if (squareType === 'CHANCE') {
      this.setState({
        cardButtonVisible: true,
        card: false
      })
    } else if (squareType === 'COMMUNITY_CHEST') {
      this.setState({
        cardButtonVisible: true,
        card: true
      })
    } else if (squareType === 'GO_TO_JAIL' || doubles === 3) {
      this.props.dispatch(setUserPositions(10, this.props.index))
      this.setState({
        moveTokenButtonVisible: false,
        endTurnButtonVisible: true
      })
    } else if (squareType === 'PROPERTY') {
      if (this.propertyIsOwned(userPosition) === false) {
        this.setState({
          buyPropertyButtonVisible: true,
          moveTokenButtonVisible: false,
          endTurnButtonVisible: true
        })
      } else {
        // propertyIsOwned returns the ownerNumber
        let propertyOwner = this.propertyIsOwned(userPosition)
        let rentOwed = 0
        let propName = ''
        this.state.userProperties[propertyOwner].forEach(prop => {
          if (prop.Position === userPosition) {
            propName = prop.PropertyObj.NAME
            rentOwed = prop.PropertyObj.RENT[prop.Houses]
          }
        })
        this.setState({
          payRentButtonVisible: true,
          payRentComment: `You landed on ${propName}. Pay ${rentOwed} to ${this.state.userNames[propertyOwner]}.`,
          endTurnButtonVisible: false,
          moveTokenButtonVisible: false,
          rentOwed: rentOwed,
          propertyOwner: propertyOwner
        })
      }
    } else if (doubles > 0) {
      console.log('inside doubles')
      this.setState({
        moveTokenButtonVisible: false,
        diceRollButtonVisible: true
      })
      // todo: for now the below works for every other space not specified
    } else {
      this.setState({
        moveTokenButtonVisible: false,
        endTurnButtonVisible: true
      })
    }
    // this.handleLandOnOrPassGo(oldCurrentUserPosition, updatedCurrentUserPosition, jail)
  }

  // handleLandOnOrPassGo (oldCurrentUserPosition, updatedCurrentUserPosition, jail) {
  //   if (!jail) {
  //     if (updatedCurrentUserPosition < oldCurrentUserPosition) {
  //       let updatedUserMoney = this.state.userMoney
  //       updatedUserMoney[this.props.index] += 200
  //       this.setState({
  //         userMoney: updatedUserMoney
  //       })
  //     }
  //   }
  // }

  changeButton () {
    this.setState({ cardButtonVisible: false })
  }

  increaseFunds (value) {
    let updatedUserMoney = this.state.userMoney
    updatedUserMoney[this.props.index] += value
    this.setState({
      userMoney: updatedUserMoney
    })
  }

  reduceFunds (value) {
    let updatedUserMoney = this.state.userMoney
    updatedUserMoney[this.props.index] -= value
    this.setState({
      userMoney: updatedUserMoney
    })
  }

  // this.propertyIsOwned = this.propertyIsOwned.bind(this)
  // this.payRent = this.payRent.bind(this)

  propertyIsOwned (propertyPosition) {
    let ownerNumber = false
    this.state.userProperties.forEach((propertyArray, index) => {
      propertyArray.forEach((propertyObj) => {
        if (propertyObj.Position === propertyPosition) ownerNumber = index
      })
    })
    return ownerNumber
  }

  handlePayRentButtonClick () {
    let currentUser = this.props.index
    let propertyOwner = this.state.propertyOwner
    let rentOwed = this.state.rentOwed
    let updatedUserMoney = this.state.userMoney
    let doubles = this.state.doubles

    if (updatedUserMoney[currentUser] < rentOwed) {
      this.setState({
        payRentComment: `You owe ${rentOwed}, but only have ${updatedUserMoney[currentUser]}`
      })
    } else {
      updatedUserMoney[currentUser] -= rentOwed
      updatedUserMoney[propertyOwner] += rentOwed
      if (!doubles) {
        this.setState({
          userMoney: updatedUserMoney,
          payRentComment: '',
          propertyOwner: '',
          rentOwed: 0,
          payRentButtonVisible: false,
          endTurnButtonVisible: true
        })
      } else if (doubles) {
        this.setState({
          userMoney: updatedUserMoney,
          payRentComment: '',
          propertyOwner: '',
          rentOwed: 0,
          payRentButtonVisible: false,
          endTurnButtonVisible: false,
          diceRollButtonVisible: true
        })
      }
    }
  }

  handleBuyPropertyButtonClick () {
    let propertyPosition = this.props.userPosArray[this.props.index]
    let propertiesArray = this.state.userProperties[this.props.index]
    // console.log('diceRoll.jsx line 382 handleBuyPropertyButtonClick propertiesArray = ', propertiesArray, Array.isArray(propertiesArray))
    let propertyPrice = 0
    let newProperty = { PropertyObj: {}, Mortgaged: false, Houses: 0, Position: propertyPosition }
    rules.Properties.forEach((property) => {
      if (property.BOARD_POSITION === propertyPosition) {
        propertyPrice = property.PRICE
        newProperty.PropertyObj = property
        propertiesArray.push(newProperty)
        console.log('propertiesArray = ', propertiesArray, propertiesArray.length, Array.isArray(propertiesArray))
      }
    })
    if (this.state.userMoney[this.props.index] < propertyPrice) {
      this.setState({
        buyPropertyComment: 'You cannot afford this property :(',
        endTurnButtonVisible: true
      })
    } else {
      this.reduceFunds(propertyPrice)
      let updatedUserProperties = this.state.userProperties
      updatedUserProperties[this.props.index] = propertiesArray
      this.setState({
        userProperties: updatedUserProperties,
        buyPropertyComment: `You bought ${newProperty.PropertyObj.NAME}!`,
        buyPropertyButtonVisible: false,
        endTurnButtonVisible: true
      })
    }
  }

  mortgageProperty (propertyPosition) {
    let tempProperty = this.state.property
    let mortgageAmount = 0
    tempProperty.forEach((property) => {
      if (property.Position === propertyPosition) {
        property.Mortgaged = true
        mortgageAmount = property.PropertyObj.MORTGAGE_PRICE
      }
    })
    this.increaseFunds(mortgageAmount)
    this.setState({
      property: tempProperty
    })
  }

  unMortgageProperty (propertyPosition) {
    let tempProperty = this.state.property
    let unMortgageAmount = 0
    tempProperty.forEach((property) => {
      if (property.Position === propertyPosition && property.Mortgaged) {
        property.Mortgaged = false
        unMortgageAmount = property.PropertyObj.UNMORTGAGE_PRICE
      }
    })
    this.reduceFunds(unMortgageAmount)
    this.setState({
      property: tempProperty
    })
  }

  buyHouse (propertyPosition) {
    let propertiesArray = this.state.property
    let housePrice = 0
    let numberOfPropsNeededForMonopoly = 0
    let propertyGroup = ''
    propertiesArray.forEach((property) => {
      if (property.Position === propertyPosition && property.PropertyObj.ALLOWS_HOUSES && property.Houses < 5) {
        housePrice = property.PropertyObj.HOUSE_PRICE
        numberOfPropsNeededForMonopoly = property.PropertyObj.NUMBER_OF_PROPERTIES_IN_GROUP
        propertyGroup = property.PropertyObj.PROPERTY_GROUP
        property.Houses += 1
      }
    })
    let propertiesInGroupCount = propertiesArray.reduce((numberOfPropertiesInGroup, property) => {
      if (property.PropertyObj.PROPERTY_GROUP === propertyGroup) {
        numberOfPropertiesInGroup += 1
      }
    }, 0)
    if (numberOfPropsNeededForMonopoly === propertiesInGroupCount && this.state.money >= housePrice) {
      this.reduceFunds(housePrice)
      this.setState({
        property: propertiesArray
      })
    } else {
      if (this.state.money < housePrice) {
        console.log('You do not have sufficient funds to purchase additional houses')
      } else {
        console.log(`You need ${numberOfPropsNeededForMonopoly} properties in order to have a monopoly, but you only have ${propertiesInGroupCount}.`)
      }
    }
  }

  sellHouse (propertyPosition) {
    let propertiesArray = this.state.property
    let houseSalePrice = 0
    propertiesArray.forEach((property) => {
      if (property.Position === propertyPosition && property.Houses > 0) {
        houseSalePrice = property.PropertyObj.HOUSE_SALE_PRICE
        property.Houses -= 1
      }
    })
    this.increaseFunds(houseSalePrice)
    this.setState({
      property: propertiesArray
    })
  }

  render () {
    return (
      <div className='user-positions_dice-roll_div'>
        <div className='dice-roll_div'>
          <div className='buttons_div'>
            <div className='dice-roll-btn_div'>
              {this.state.diceRollButtonVisible
                ? <div>
                  <Button secondary fluid onClick={() => { this.handleDiceRollButtonClick() }}>Roll Dice</Button>
                </div> : null
              }
            </div>
            <div className='move-token-btn_div'>
              {this.state.moveTokenButtonVisible
                ? <div>
                  <Button secondary fluid onClick={() => { this.handleMoveTokenButtonClick() }}>  Move Your Token! </Button>
                </div> : null
              }
            </div>
            {
              this.state.cardButtonVisible ? <Card button={() => { this.changeButton() }} card={this.state.card} number={this.state.numOfPlayers} /> : null
            }
            <div className='buy-property-btn_div'>
              {this.state.buyPropertyButtonVisible
                ? <div>
                  <Button secondary fluid onClick={() => { this.handleBuyPropertyButtonClick() }}>  Buy This Property. </Button>
                </div> : null
              }
            </div>
            <div className='pay-rent-btn_div'>
              {this.state.payRentButtonVisible
                ? <div>
                  <div className='rent-comment'>
                    {this.state.payRentComment}
                  </div>
                  <Button secondary fluid onClick={() => { this.handlePayRentButtonClick() }}>  Pay Rent. </Button>
                </div> : null
              }
            </div>
            <div className='end-turn-btn_div'>
              {this.state.endTurnButtonVisible
                ? <div>
                  <div className='chance-comment_div'>
                    {this.state.chanceComment}
                  </div>
                  <div className='community-comment_div'>
                    {this.state.communityComment}
                  </div>
                  <div className='property-comment_div'>
                    {this.state.buyPropertyComment}
                  </div>
                  <Button secondary fluid onClick={() => { this.handleEndTurnButtonClick() }}>  End Turn. </Button>
                </div> : null
              }
            </div>
          </div>
        </div>
        <div className='UserMoney_div'>
          {`Everyone's Money ${[this.props.userCashArray]}`}
        </div>
        <div className='CurrentUser_div'>
          <div className='CurrentUserMoney'>
            {`You have: $${this.props.userCashArray[this.props.index]}`}
          </div>
          <div className='CurrentUserProperties'>
            <div>
              Properties : {this.props.index === -1 ? null : this.state.userProperties[this.props.index].map(e => ' ' + e.PropertyObj.NAME)}
              {this.props.index === -1 ? null : this.state.userProperties[this.props.index].forEach(propObj => console.log(propObj.PropertyObj.NAME))}
            </div>
          </div>
        </div>
        <div className='UserPositions'>
          <div className='CurrentUser' />
          <div className='UserPositionsArray' />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
    gameID: state.gameID,
    userID: state.userID,
    userPosArray: state.userPosArray,
    index: state.index,
    userPropertiesArray: state.userPropertiesArray,
    userCashArray: state.userCashArray
  }
}
DiceRoll.propTypes = {
  dice: React.PropTypes.func.isRequired,
  userMoney: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  username: React.PropTypes.string.isRequired,
  gameID: React.PropTypes.number.isRequired,
  userID: React.PropTypes.string.isRequired,
  userPosArray: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired,
  userPropertiesArray: React.PropTypes.array.isRequired,
  userCashArray: React.PropTypes.array.isRequired
}

export default connect(mapStateToProps)(DiceRoll)
