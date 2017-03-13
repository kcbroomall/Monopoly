import React, { Component } from 'react'
import rules from '../static/rules'
import userNames from './user_order'
import sock from '../helper/socket'
import { connect } from 'react-redux'
import { setUserPositions, setIndex, setUserProperties, setUserMoney, setUserJail } from './store/actionCreators'
import { Button, List } from 'semantic-ui-react'
import Card from './Cards'
class DiceRoll extends Component {
  constructor (props) {
    super(props)
    this.handleDiceRollButtonClick = this.handleDiceRollButtonClick.bind(this)
    this.handleMoveTokenButtonClick = this.handleMoveTokenButtonClick.bind(this)
    this.handleEndTurnButtonClick = this.handleEndTurnButtonClick.bind(this)
    this.handleLandOnOrPassGo = this.handleLandOnOrPassGo.bind(this)
    this.handleGoButtonClick = this.handleGoButtonClick.bind(this)
    this.increaseFunds = this.increaseFunds.bind(this)
    this.reduceFunds = this.reduceFunds.bind(this)
    this.propertyIsOwned = this.propertyIsOwned.bind(this)
    this.handleBuyPropertyButtonClick = this.handleBuyPropertyButtonClick.bind(this)
    this.handlePayRentButtonClick = this.handlePayRentButtonClick.bind(this)
    this.handlePayIncomeTaxButtonClick = this.handlePayIncomeTaxButtonClick.bind(this)
    this.handlePayLuxuryTaxButtonClick = this.handlePayLuxuryTaxButtonClick.bind(this)
    this.mortgageProperty = this.mortgageProperty.bind(this)
    this.unMortgageProperty = this.unMortgageProperty.bind(this)
    this.buyHouse = this.buyHouse.bind(this)
    this.sellHouse = this.sellHouse.bind(this)
    this.handleCardButtonClick = this.handleCardButtonClick.bind(this)
    this.handleJailPayFineButtonClick = this.handleJailPayFineButtonClick.bind(this)
    this.handleJailRollDoublesButtonClick = this.handleJailRollDoublesButtonClick.bind(this)
    this.handleJailFreeCardButtonClick = this.handleJailFreeCardButtonClick.bind(this)

    this.state = {
      dice: [0, 0],
      diceSum: 0,
      diceSumComment: '',
      doubles: 0,
      doublesComment: '',
      squareTypeComment: '',
      moveTokenButtonVisible: false,
      // needs to be updated gamestate authentication
      cardButtonVisible: false,
      card: true,
      userNames: [userNames[0][0], userNames[1][0], userNames[2][0], userNames[3][0], userNames[4][0], userNames[5][0], userNames[6][0], userNames[7][0]],
      jailPositions: [0, 0, 0, 0, 0, 0, 0, 0],
      userPropertiesArray: [[], [], [], [], [], [], [], []],
      userProertiesObj: [{ properties: [], mortgage: [] }, { properties: [], mortgage: [] }, { properties: [], mortgage: [] }, { properties: [], mortgage: [] }, { properties: [], mortgage: [] },
      { properties: [], mortgage: [] }, { properties: [], mortgage: [] }, { properties: [], mortgage: [] }],
      userJailFreeCardArray: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      userMoneyArray: [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
      passGoComment: '',
      jailComment: '',
      goButtonVisible: false,
      diceRollButtonVisible: false,
      // needs to be updated gamestate authentication
      endTurnButtonVisible: false,
      buyPropertyComment: '',
      buyPropertyButtonVisible: false,
      incomeTaxButtonVisible: false,
      mortgageButtonVisible: false,
      incomeTaxComment: '',
      jailPayFineComment: '',
      luxuryTaxButtonVisible: false,
      luxuryTaxComment: '',
      jailRollDoublesComment: '',
      rentOwed: 0,
      propertyOwner: '',
      payRentComment: '',
      payRentButtonVisible: false,
      comment: '',
      isBankruptArray: [false, false, false, false, false, false, false, false],
      bankruptcyButtonVisible: false,
      jailPayFineButtonVisible: false,
      jailRollDoublesButtonVisible: false,
      jailFreeCardButtonVisible: false
    }
  }
  // componentWillReceiveProps (nextProps) {
  //   // sock.updateProps({ gameID: nextProps.gameID, pos: nextProps.userPropertiesArray[nextProps.index], index: nextProps.index })
  // }

  componentDidMount () {
    sock.socket.on('yourTurn', (data) => {
      console.log('bankruptcyButtonVisible', this.state.bankruptcyButtonVisible)
    })
    sock.socket.on('update properties', (data) => {
      console.log('diceRoll js update properties! socket func! data = ', data)
      let updatedUserPropertiesArray = [...this.state.userPropertiesArray]
      updatedUserPropertiesArray[data.index] = data.properties
      this.setState({ userPropertiesArray: updatedUserPropertiesArray })
      // this.props.dispatch(setUserProperties(data.userProperties, data.index))
    })
    sock.socket.on('update money', (data) => {
      let updatedUserMoneyArray = [...this.state.userMoneyArray]
      updatedUserMoneyArray[data.index] = data.money
      this.setState({ userMoneyArray: updatedUserMoneyArray })
      this.props.dispatch(setUserMoney(data.money, data.index))
    })
    sock.socket.on('receive-comment', (comment) => {
      console.log(comment)
      this.setState({ comment: comment })
    })
  }

  handleDiceRollButtonClick () {
    const die1 = 1 + Math.floor((6 * Math.random()))
    const die2 = 1 + Math.floor((6 * Math.random()))

    // const die1 = 5
    // const die2 = 5
    if (this.props.userPosArray[this.props.index] + die1 + die2 === 30) {
      this.setState({
        dice: [die1, die2],
        diceSum: die1 + die2,
        diceSumComment: `${this.props.username} rolled ${die1 + die2}, landing on Go-To-Jail. Go To Jail. Go Directly To Jail. Do Not Pass Go. Do Not Collect $200.`,
        doubles: 0,
        doublesComment: '',
        buyPropertyComment: '',
        squareTypeComment: '',
        jailComment: '',
        diceRollButtonVisible: false,
        moveTokenButtonVisible: true,
        endTurnButtonVisible: false
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} rolled ${die1 + die2}, landing on Go-To-Jail. Go To Jail. Go Directly To Jail. Do Not Pass Go. Do Not Collect $200.` })
    } else if (die1 === die2) {
      let doublesComment = `${this.props.username} rolled doubles. Move ${die1 + die2} spaces on the board, and roll again.`
      if (this.state.doubles === 2) {
        doublesComment = `${this.props.username} rolled doubles three times in a row. Go To Jail. Go Directly To Jail. Do not Pass Go. Do Not Collect $200.`
      }
      this.setState({
        dice: [die1, die2],
        diceSum: die1 + die2,
        diceSumComment: doublesComment,
        doubles: this.state.doubles + 1,
        doublesComment: '',
        buyPropertyComment: '',
        squareTypeComment: '',
        diceRollButtonVisible: false,
        moveTokenButtonVisible: true,
        endTurnButtonVisible: false
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: doublesComment })
    } else {
      this.setState({
        dice: [die1, die2],
        diceSum: die1 + die2,
        diceSumComment: `${this.props.username} rolled ${die1 + die2}. Move ${die1 + die2} spaces on the board.`,
        doubles: 0,
        doublesComment: '',
        buyPropertyComment: '',
        squareTypeComment: '',
        diceRollButtonVisible: false,
        moveTokenButtonVisible: true,
        endTurnButtonVisible: false
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} rolled ${die1 + die2}. Move ${die1 + die2} spaces on the board.` })
    }
  }

  handleEndTurnButtonClick () {
    this.setState({
      passGoComment: '',
      dice: [0, 0],
      chanceComment: '',
      diceSumComment: '',
      communityComment: '',
      squareTypeComment: '',
      moveTokenButtonVisible: false,
      diceRollButtonVisible: false,
      endTurnButtonVisible: false,
      goButtonVisible: false,
      buyPropertyButtonVisible: false,
      buyPropertyComment: '',
      jailRollDoublesComment: '',
      jailPayFineButtonVisible: false,
      jailRollDoublesButtonVisible: false,
      jailFreeCardButtonVisible: false,
      mortgageButtonVisible: false
    })
    sock.socket.emit('comment', { gameID: this.props.gameID, comment: `` })
    sock.end({ gameID: this.props.gameID, pos: this.props.userPosArray[this.props.index], index: this.props.index })
  }

  handleMoveTokenButtonClick () {
    let jail = false
    let doubles = this.state.doubles
    let die1 = this.state.dice[0]
    let die2 = this.state.dice[1]
    let oldUserPosition = this.props.userPosArray[this.props.index]
    let userPosition = (this.props.userPosArray[this.props.index] + die1 + die2) % 40
    console.log('in handleMoveTokenButtonClick userPosArray = ', this.props.userPosArray)
    console.log('in handleMoveTokenButtonClick userPosition = ', userPosition)
    this.props.dispatch(setUserPositions(userPosition, this.props.index))
    this.props.dice(userPosition, this.props.index, true)
    let squareType = rules.PositionType[userPosition]

    if (squareType === 'GO_TO_JAIL' || doubles === 3) {
      jail = true
      this.props.dispatch(setUserPositions(10, this.props.index))
      this.props.dice(10, this.props.index, true)
      let updatedJailPositions = [...this.state.jailPositions]
      updatedJailPositions[this.props.index] = 1
      this.setState({
        moveTokenButtonVisible: false,
        jailPositions: updatedJailPositions,
        endTurnButtonVisible: true
      })
    } else if (squareType === 'CHANCE') {
      this.setState({
        cardButtonVisible: true,
        moveTokenButtonVisible: false,
        diceSumComment: '',
        squareTypeComment: 'You landed on a chance space. Pick a card!',
        card: false
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on a chance space.` })
    } else if (squareType === 'COMMUNITY_CHEST') {
      this.setState({
        cardButtonVisible: true,
        moveTokenButtonVisible: false,
        diceSumComment: '',
        squareTypeComment: 'You landed on a community chest space. Pick a card!',
        card: true
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on a community chest space.` })
    } else if (squareType === 'PROPERTY') {
      if (this.propertyIsOwned(userPosition) === false) {
        let cost = 0
        let propertyName = ''
        rules.Properties.forEach(prop => {
          if (prop.BOARD_POSITION === userPosition) {
            cost = prop.PRICE
            propertyName = prop.NAME
          }
        })
        this.setState({
          buyPropertyButtonVisible: true,
          moveTokenButtonVisible: false,
          diceSumComment: '',
          squareTypeComment: `You landed on ${propertyName}, and can buy it for $${cost}.`,
          endTurnButtonVisible: true
        })
        sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on ${propertyName}, and can buy it for $${cost}.` })
        if (doubles) {
          this.setState({
            endTurnButtonVisible: false,
            diceSumComment: '',
            diceRollButtonVisible: true
          })
        }
      } else {
        let propertyOwner = this.propertyIsOwned(userPosition)
        let rentOwed = 0
        let propName = ''
        let mortgagedFlag = false
        this.state.userPropertiesArray[propertyOwner].forEach(prop => {
          if (prop.Position === userPosition) {
            propName = prop.PropertyObj.NAME
            if (prop.Mortgaged) {
              mortgagedFlag = true
            } else if (prop.PropertyObj.PROPERTY_GROUP === 'Utilities') {
              let utilityCount = -1
              this.state.userPropertiesArray[propertyOwner].forEach(prop => {
                if (prop.PropertyObj.PROPERTY_GROUP === 'Utilities') {
                  utilityCount += 1
                }
              })
              rentOwed = (die1 + die2) * (prop.PropertyObj.RENT[utilityCount])
            } else if (prop.PropertyObj.PROPERTY_GROUP === 'Stations') {
              let stationCount = -1
              this.state.userPropertiesArray[propertyOwner].forEach(prop => {
                if (prop.PropertyObj.PROPERTY_GROUP === 'Stations') {
                  stationCount += 1
                }
              })
              rentOwed = prop.PropertyObj.RENT[stationCount]
            } else {
              rentOwed = prop.PropertyObj.RENT[prop.Houses]
            }
          }
        })
        console.log('!!!!!!!!!!!!! in diceRolljsx line 259 this.state = ', this.state)
        this.setState({
          payRentButtonVisible: true,
          payRentComment: `You landed on ${propName}. Pay $${rentOwed} in rent.`,
          endTurnButtonVisible: false,
          moveTokenButtonVisible: false,
          rentOwed: rentOwed,
          propertyOwner: propertyOwner
        })
        sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on ${propName}. Pay $${rentOwed} in rent.` })
        if (propertyOwner === this.props.index) {
          this.setState({
            payRentButtonVisible: false,
            payRentComment: `You landed on ${propName}, but you already own it.`,
            endTurnButtonVisible: !doubles,
            diceRollButtonVisible: !!doubles,
            moveTokenButtonVisible: false,
            rentOwed: rentOwed,
            diceSumComment: '',
            propertyOwner: propertyOwner
          })
        } else if (mortgagedFlag) {
          this.setState({
            payRentButtonVisible: false,
            payRentComment: `You landed on ${propName}, but it is mortgaged.`,
            endTurnButtonVisible: !doubles,
            diceRollButtonVisible: !!doubles,
            moveTokenButtonVisible: false,
            rentOwed: rentOwed,
            diceSumComment: '',
            propertyOwner: propertyOwner
          })
        } else {
          this.setState({
            payRentButtonVisible: true,
            payRentComment: `You landed on ${propName}. Pay $${rentOwed} in rent.`,
            endTurnButtonVisible: false,
            moveTokenButtonVisible: false,
            diceSumComment: '',
            rentOwed: rentOwed,
            propertyOwner: propertyOwner
          })
        }
      }
    } else if (squareType === 'GO') {
      this.setState({
        squareTypeComment: 'You landed on GO. Collect $200!',
        diceSumComment: '',
        goButtonVisible: true,
        moveTokenButtonVisible: false
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on GO. Collect $200!` })
      if (!doubles) {
        this.setState({
          endTurnButtonVisible: true,
          diceRollButtonVisible: false
        })
      }
      if (doubles) {
        this.setState({
          diceRollButtonVisible: true,
          endTurnButtonVisible: false
        })
      }
    } else if (squareType === 'FREE_PARKING') {
      this.setState({
        squareTypeComment: 'You landed on Free Parking. Nothing happens.',
        diceSumComment: '',
        moveTokenButtonVisible: false
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on Free Parking. Nothing happens.` })
      if (!doubles) {
        this.setState({
          endTurnButtonVisible: true,
          diceSumComment: ''
        })
      }
      if (doubles) {
        this.setState({
          diceSumComment: '',
          diceRollButtonVisible: true
        })
      }
    } else if (squareType === 'JAIL') {
      this.setState({
        squareTypeComment: 'You landed on Jail, but you are just visiting.',
        diceSumComment: '',
        moveTokenButtonVisible: false
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on Jail. But ${this.props.username} is just visiting.` })
      if (!doubles) {
        this.setState({
          diceSumComment: '',
          endTurnButtonVisible: true
        })
      }
      if (doubles) {
        this.setState({
          diceSumComment: '',
          diceRollButtonVisible: true
        })
      }
    } else if (squareType === 'INCOME_TAX') {
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on Income Tax. Pay $200.` })
      this.setState({
        moveTokenButtonVisible: false,
        endTurnButtonVisible: false,
        diceSumComment: '',
        incomeTaxButtonVisible: true,
        squareTypeComment: 'You landed on Income Tax. Pay $200.',
        userPositions: userPosition
      })
    } else if (squareType === 'LUXURY_TAX') {
      this.setState({
        moveTokenButtonVisible: false,
        endTurnButtonVisible: false,
        diceSumComment: '',
        luxuryTaxButtonVisible: true,
        squareTypeComment: 'You landed on Luxury Tax. Pay $100.',
        userPositions: userPosition
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} landed on Luxury Tax. Pay $100.` })
    }
    this.handleLandOnOrPassGo(oldUserPosition, userPosition, jail)
  }

  handleLandOnOrPassGo (oldUserPosition, userPosition, jail) {
    if (!jail && userPosition < oldUserPosition) {
      console.log('in handleLandOnOrPassGo userPosition, oldUserPosition = ', userPosition, oldUserPosition)
      let goComment = 'You passed GO. Collect $200.'
      if (this.state.squareTypeComment === 'You landed on GO. Collect $200!') {
        goComment = ''
      }
      this.setState({
        passGoComment: goComment,
        endTurnButtonVisible: false,
        moveTokenButtonVisible: false,
        goButtonVisible: true
      })
    }
  }

  handleGoButtonClick () {
    let updatedUserMoneyArray = [...this.state.userMoneyArray]
    updatedUserMoneyArray[this.props.index] += 200
    this.props.dispatch(setUserMoney(updatedUserMoneyArray[this.props.index], this.props.index))
    sock.updateMoney({
      gameID: this.props.gameID,
      money: updatedUserMoneyArray[this.props.index],
      index: this.props.index
    })

    let doubles = this.state.doubles
    if (!doubles) {
      this.setState({
        endTurnButtonVisible: true,
        userMoneyArray: updatedUserMoneyArray,
        diceSumComment: '',
        passGoComment: '',
        goButtonVisible: false,
        diceRollButtonVisible: false,
        squareTypeComment: ''
      })
    }
    if (doubles) {
      this.setState({
        diceRollButtonVisible: true,
        userMoneyArray: updatedUserMoneyArray,
        diceSumComment: '',
        passGoComment: '',
        goButtonVisible: false,
        endTurnButtonVisible: false,
        squareTypeComment: ''
      })
    }
  }

  handleCardButtonClick () {
    let doubles = this.state.doubles
    this.setState({
      cardButtonVisible: false,
      endTurnButtonVisible: !doubles,
      diceRollButtonVisible: !!doubles,
      squareTypeComment: ''
    })
  }

  increaseFunds (value) {
    let updatedUserMoney = this.state.userMoneyArray
    updatedUserMoney[this.props.index] += value
    this.setState({
      userMoney: updatedUserMoney
    })
  }

  reduceFunds (value) {
    let updatedUserMoney = this.state.userMoneyArray
    updatedUserMoney[this.props.index] -= value
    this.setState({
      userMoney: updatedUserMoney
    })
  }

  propertyIsOwned (propertyPosition) {
    let ownerNumber = false
    this.state.userPropertiesArray.forEach((propertyArray, index) => {
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
    let updatedUserMoney = [...this.state.userMoneyArray]
    let doubles = this.state.doubles
    console.log('in diceRolljs handlePayRentButtonClick currentUser = ', currentUser, ' propertyOwner = ', propertyOwner, ' rentOwed = ', rentOwed)
    if (updatedUserMoney[currentUser] < rentOwed) {
      this.setState({
        payRentComment: `You owe ${rentOwed}, but only have ${updatedUserMoney[currentUser]}`
      })
      checkBankruptcy()
    } else {
      updatedUserMoney[currentUser] -= rentOwed
      updatedUserMoney[propertyOwner] += rentOwed
      this.setState({
        userMoneyArray: updatedUserMoney,
        payRentComment: '',
        propertyOwner: '',
        rentOwed: 0,
        payRentButtonVisible: false,
        endTurnButtonVisible: !doubles,
        diceRollButtonVisible: !!doubles
      })
      this.props.dispatch(setUserMoney(updatedUserMoney[currentUser], currentUser))
      sock.updateMoney({ gameID: this.props.gameID, money: updatedUserMoney[currentUser], index: currentUser })
      this.props.dispatch(setUserMoney(updatedUserMoney[propertyOwner], propertyOwner))
      sock.updateMoney({ gameID: this.props.gameID, money: updatedUserMoney[propertyOwner], index: propertyOwner })
    }
  }

  handlePayIncomeTaxButtonClick () {
    let doubles = this.state.doubles
    let updatedUserMoneyArray = [...this.state.userMoneyArray]
    if (updatedUserMoneyArray[this.props.index] < 200) {
      this.setState({
        squareTypeComment: 'You do not have enough money to pay the $200 income tax.',
        endTurnButtonVisible: false,
        moveTokenButtonVisible: false
      })
      checkBankruptcy()
    } else {
      updatedUserMoneyArray[this.props.index] -= 200
      this.props.dispatch(setUserMoney(updatedUserMoneyArray[this.props.index], this.props.index))
      sock.updateMoney({
        gameID: this.props.gameID,
        money: updatedUserMoneyArray[this.props.index],
        index: this.props.index
      })
      if (!doubles) {
        this.setState({
          userMoneyArray: updatedUserMoneyArray,
          moveTokenButtonVisible: false,
          incomeTaxButtonVisible: false,
          endTurnButtonVisible: true,
          squareTypeComment: ''
        })
      }
      if (doubles > 0) {
        this.setState({
          userMoneyArray: updatedUserMoneyArray,
          moveTokenButtonVisible: false,
          endTurnButtonVisible: false,
          incomeTaxButtonVisible: false,
          diceRollButtonVisible: true,
          squareTypeComment: ''
        })
      }
    }
  }

  handlePayLuxuryTaxButtonClick () {
    let doubles = this.state.doubles
    let updatedUserMoneyArray = [...this.state.userMoneyArray]
    if (updatedUserMoneyArray[this.props.index] < 100) {
      this.setState({
        squareTypeComment: 'You do not have enough money to pay the $100 luxury tax.',
        endTurnButtonVisible: false,
        moveTokenButtonVisible: false
      })
      checkBankruptcy()
    } else {
      updatedUserMoneyArray[this.props.index] -= 100
      this.props.dispatch(setUserMoney(updatedUserMoneyArray[this.props.index], this.props.index))
      sock.updateMoney({
        gameID: this.props.gameID,
        money: updatedUserMoneyArray[this.props.index],
        index: this.props.index
      })
      if (!doubles) {
        this.setState({
          userMoneyArray: updatedUserMoneyArray,
          moveTokenButtonVisible: false,
          endTurnButtonVisible: true,
          luxuryTaxButtonVisible: false,
          squareTypeComment: ''
        })
      }
      if (doubles > 0) {
        this.setState({
          userMoneyArray: updatedUserMoneyArray,
          moveTokenButtonVisible: false,
          endTurnButtonVisible: false,
          luxuryTaxButtonVisible: false,
          diceRollButtonVisible: true,
          squareTypeComment: ''
        })
      }
    }
  }

  handleBuyPropertyButtonClick () {
    let propertyPosition = this.props.userPosArray[this.props.index]
    let propertiesArray = [...this.state.userPropertiesArray[this.props.index]]
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

    // if (this.state.userMoneyArray[this.props.index] < 1000) {
    //   this.setState({bankruptcyButtonVisible: true})
    // }

    if (this.state.userMoneyArray[this.props.index] < propertyPrice) {
      this.setState({
        buyPropertyComment: 'You cannot afford this property :(',
        endTurnButtonVisible: true,
        buyPropertyButtonVisible: true,
        squareTypeComment: '',
        moveTokenButtonVisible: false
      })
      if (this.state.doubles) {
        this.setState({
          endTurnButtonVisible: false,
          squareTypeComment: '',
          diceRollButtonVisible: true
        })
      }
    } else {
      let updatedUserMoneyArray = [...this.state.userMoneyArray]
      updatedUserMoneyArray[this.props.index] -= propertyPrice
      this.props.dispatch(setUserMoney(updatedUserMoneyArray[this.props.index], this.props.index))
      sock.updateMoney({ gameID: this.props.gameID, money: updatedUserMoneyArray[this.props.index], index: this.props.index })

      let updatedUserProperties = [...this.state.userPropertiesArray]

      updatedUserProperties[this.props.index] = propertiesArray
      // if (updatedUserMoneyArray[this.props.index] < 1000) {
      //   this.setState({bankruptcyButtonVisible:true})
      // }
      this.setState({
        buyPropertyComment: `You bought ${newProperty.PropertyObj.NAME}, cost $${newProperty.PropertyObj.PRICE}`,
        userMoneyArray: updatedUserMoneyArray,
        buyPropertyButtonVisible: false,
        endTurnButtonVisible: true,
        squareTypeComment: '',
        moveTokenButtonVisible: false,
        userPropertiesArray: updatedUserProperties
      })
      if (this.state.doubles) {
        this.setState({
          endTurnButtonVisible: false,
          squareTypeComment: '',
          diceRollButtonVisible: true
        })
      }
      this.props.dispatch(setUserProperties(updatedUserProperties, this.props.index))
      sock.updateProps({ gameID: this.props.gameID, properties: updatedUserProperties[this.props.index], index: this.props.index })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `${this.props.username} bought ${newProperty.PropertyObj.NAME}!` })
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

  handleJailPayFineButtonClick () {
    if (this.state.userMoneyArray[this.props.index] < 50) {
      this.setState({
        jailPayFineComment: 'You cannot afford the $50 fine.'
      })
      checkBankruptcy()
    } else {
      let updatedUserMoneyArray = [...this.state.userMoneyArray]
      console.log('in diceRoll handleJailPayFineButtonClick before money = ', updatedUserMoneyArray[this.props.index])
      updatedUserMoneyArray[this.props.index] -= 50
      console.log('in diceRoll handleJailPayFineButtonClick after money = ', updatedUserMoneyArray[this.props.index] - 50)
      this.props.dispatch(setUserMoney(updatedUserMoneyArray[this.props.index], this.props.index))
      sock.updateMoney({ gameID: this.props.gameID, money: updatedUserMoneyArray[this.props.index], index: this.props.index })

      let updatedJailPositions = [...this.state.jailPositions]
      updatedJailPositions[this.props.index] = 0
      this.props.dispatch(setUserJail(updatedJailPositions[this.props.index], this.props.index))

      console.log('in diceRoll js line 649 handleJailPayFineButtonClick has been invoked')
      this.setState({
        diceRollButtonVisible: true,
        jailPositions: updatedJailPositions,
        userMoneyArray: updatedUserMoneyArray,
        jailComment: '',
        jailPayFineComment: '',
        jailPayFineButtonVisible: false,
        jailRollDoublesButtonVisible: false,
        jailFreeCardButtonVisible: false
      })
    }
  }

  handleJailRollDoublesButtonClick () {
    const die1 = 1 + Math.floor((6 * Math.random()))
    const die2 = 1 + Math.floor((6 * Math.random()))
    // show dice
    this.setState({
      dice: [die1, die2]
    })
    if (die1 === die2) {
      let updatedJailPositionsArray = [...this.state.jailPositions]
      updatedJailPositionsArray[this.props.index] = 0
      this.setState({
        moveTokenButtonVisible: true,
        diceSumComment: `You rolled doubles and left jail. Move ${die1 + die2} spaces.`,
        jailPositions: updatedJailPositionsArray,
        jailRollDoublesButtonVisible: false,
        diceRollButtonVisible: false
      })
    } else {
      let updatedJailPositionsArray = [...this.state.jailPositions]
      console.log(`this was turn #${updatedJailPositionsArray[this.props.index]} in jail.`)
      updatedJailPositionsArray[this.props.index] += 1
      console.log(`now it will be turn #${updatedJailPositionsArray[this.props.index]} in jail.`)
      this.setState({
        jailRollDoublesComment: 'You did not roll doubles :(.',
        endTurnButtonVisible: true,
        jailPositions: updatedJailPositionsArray,
        jailRollDoublesButtonVisible: false
      })
    }
  }

  handleJailFreeCardButtonClick () {
    if (this.state.userJailFreeCardArray[this.props.index][0] === 0 && this.state.userJailFreeCardArray[this.props.index][1] === 0) {

    }
    // check if a user has a jail free card
    // if so,
    // remove user's jail free card
    // set jail to 0
    // set jailcomment to ''
    // make diceRollButtonVisible
    // if not,
    // say, you do not own a jail free card
    // make jail free card button disappear
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
    if (numberOfPropsNeededForMonopoly === propertiesInGroupCount && this.state.userMoneyArray[this.props.index] >= housePrice) {
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

  checkBankruptcy () {
    console.log('check bankruptcy invoked')
    let usersProperties = [...this.state.userPropertiesArray]
    if (userProperties[this.props.index].length === 0) {
      console.log('bankruptcy!')
      this.setState({ bankruptcyButtonVisible: true })
    }
  }

  handleBankruptcyButtonClick () {
    console.log('bankrupt button click')
    let currentUser = this.props.index
    let updatedUserMoney = [...this.state.userMoneyArray]
    let updatedUserProperties = [...this.state.userPropertiesArray]
    updatedUserMoney[currentUser] = 0
    updatedUserProperties[currentUser] = []
    this.setState({
      userMoneyArray: updatedUserMoney,
      userPropertiesArray: updatedUserProperties,
      diceRollButtonVisible: false
    })
  }

  handleMortgageButtonClick (propertyName) {
    console.log(this.state.userPropertiesArray[this.props.index])
    // console.log('proerty name', propertyName)
    let usersProperties = [...this.state.userPropertiesArray]
    let updatedUserMoneyArray = [...this.state.userMoneyArray]
    // console.log('before', updatedUserMoneyArray[this.props.index])
    let updatedUserProperties = [...this.state.userPropertiesArray]
    updatedUserProperties[this.props.index].forEach((property, i, arr) => {
      if (property.PropertyObj.NAME === propertyName) {
        updatedUserMoneyArray[this.props.index] += property.PropertyObj.MORTGAGE_PRICE
        arr.splice(i, 1)
      }
    })
    this.setState({
      userMoneyArray: updatedUserMoneyArray,
      userPropertiesArray: updatedUserProperties
    })
  }

  render () {
    return (
      <div className='user-positions_dice-roll_div'>
        <div className='dice-roll_div'>
          <div className='dice_div'>
            <div>{this.state.dice[0] ? `die1: ${this.state.dice[0]}` : null}</div>
            <div>{this.state.dice[1] ? `die2: ${this.state.dice[1]}` : null}</div>
          </div>
          <div className='buttons_div'>
            <div className='dice-roll-btn_div'>
              {(this.state.diceRollButtonVisible && !this.state.payRentButtonVisible && !this.state.jailPositions[this.props.index] && !this.state.cardButtonVisible)
                ? <div>
                  <div>{this.props.index === -1 ? null : `${this.props.username} it is your turn. Roll the dice!`}</div>
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
              (this.state.cardButtonVisible && !this.state.goButtonVisible)
                ? <Card button={() => { this.handleCardButtonClick() }} card={this.state.card} number={this.state.numOfPlayers} /> : null
            }
            <div className='buy-property-btn_div'>
              {(this.state.buyPropertyButtonVisible && !this.state.goButtonVisible)
                ? <div>
                  <Button secondary fluid onClick={() => { this.handleBuyPropertyButtonClick() }}>  Buy This Property. </Button>
                </div> : null
              }
            </div>
            <div className='pass-go-btn_div'>
              {this.state.goButtonVisible
                ? <div>
                  <div>{this.state.passGoComment}</div>
                  <Button secondary fluid onClick={() => { this.handleGoButtonClick() }}>  Collect $200. </Button>
                </div> : null
              }
            </div>
            <div className='income-tax-btn_div'>
              {this.state.incomeTaxButtonVisible
                ? <div>
                  <div>{this.state.incomeTaxComment}</div>
                  <Button secondary fluid onClick={() => { this.handlePayIncomeTaxButtonClick() }}>  Pay $200 in income tax. </Button>
                </div> : null
              }
            </div>
            <div className='luxury-tax-btn_div'>
              {this.state.luxuryTaxButtonVisible
                ? <div>
                  <div>{this.state.luxuryTaxComment}</div>
                  <Button secondary fluid onClick={() => { this.handlePayLuxuryTaxButtonClick() }}>  Pay $100 in luxury tax. </Button>
                </div> : null
              }
            </div>
            <div className='pay-rent-btn_div'>
              {(this.state.payRentButtonVisible && !this.state.goButtonVisible)
                ? <div>
                  <div className='rent-comment'>
                    {this.state.payRentComment}
                  </div>
                  <Button secondary fluid onClick={() => { this.handlePayRentButtonClick() }}>  Pay Rent. </Button>
                </div> : null
              }
            </div>
            <div className='end-turn-btn_div'>
              {(this.state.endTurnButtonVisible && !this.state.luxuryTaxButtonVisible && !this.state.goButtonVisible && !this.state.incomeTaxButtonVisible && !this.state.payRentButtonVisible)
                ? <div>
                  <Button secondary fluid onClick={() => { this.handleEndTurnButtonClick() }}>  End Turn. </Button>
                </div> : null
              }
            </div>
            <div className='bankruptcy-btn_div'>
              {this.state.bankruptcyButtonVisible
                ? <div>
                  <Button secondary fluid onClick={() => { this.handleBankruptcyButtonClick() }}> Bankruptcy. </Button>
                </div> : null
              }
            </div>
          </div>
          <div className='jail_div'>
            {(this.state.jailPositions[this.props.index] && !this.state.endTurnButtonVisible)
              ? <div className='jail-buttons_div'>
                <div> {this.state.jailPayFineButtonVisible
                  ? (this.state.jailPositions[this.props.index] === 3 ? 'This is your 3rd turn in' +
                    ' jail. You must Pay $50 to get out immeidately or use a Get Out of Jail' +
                    ' Free Card'
                    : 'You are in jail. Pay $50 to get out immediately, try to roll doubles, or use' +
                    ' a Get Out of Jail Free card') : 'You are in jail :( '}
                </div>
                <div className='jail-pay-fine-btn_div'>
                  {(this.state.jailPayFineButtonVisible && !this.state.endTurnButtonVisible)
                    ? <div>
                      <div>{this.state.jailPayFineComment}</div>
                      <Button secondary fluid onClick={() => {
                        this.handleJailPayFineButtonClick()
                      }}> Pay $50. </Button>
                    </div> : null
                  }
                </div>
                <div className='jail-roll-doubles-btn_div'>
                  {(this.state.jailRollDoublesButtonVisible && !this.state.endTurnButtonVisible && this.state.jailPositions[this.props.index] < 3)
                    ? <div>
                      <Button secondary fluid onClick={() => {
                        this.handleJailRollDoublesButtonClick()
                      }}> Attempt to roll doubles. </Button>
                    </div> : null
                  }
                </div>
                <div className='jail-free-card-btn_div'>
                  {(this.state.jailFreeCardButtonVisible && !this.state.endTurnButtonVisible)
                    ? <div>
                      <Button secondary fluid onClick={() => {
                        this.handleJailFreeCardButtonClick()
                      }}> Use a jail free card. </Button>
                    </div> : null
                  }
                </div>
              </div> : null
            }
          </div>
        </div>
        <div className='UserMoney_div'>
          {`Everyone's Money ${[this.state.userMoneyArray]}`}
        </div>
        <div className='Comments_div'>
          <div className='dice-sum-comment_div'>
            {this.state.diceSumComment}
          </div>
          <div className='doubles-comment_div'>
            {this.state.doublesComment}
          </div>
          <div className='pass-go-comment_div'>
            {this.state.passGoComment}
          </div>
          <div className='chance-comment_div'>
            {this.state.chanceComment}
          </div>
          <div className='community-comment_div'>
            {this.state.communityComment}
          </div>
          <div className='jail-roll-doubles-comment_div'>
            {this.state.jailRollDoublesComment}
          </div>
          <div className='property-comment_div'>
            {this.state.buyPropertyComment}
          </div>
          <div className='squaretype-comment_div'>
            {this.state.squareTypeComment}
          </div>
        </div>
        <div className='CurrentUser_div'>
          <div className='CurrentUserMoney'>
            {this.props.index === -1 ? null : `You have: $${this.state.userMoneyArray[this.props.playerIndex]}`}
          </div>
          <div className='CurrentUserProperties'>
            <div>
              Properties : {this.props.index === -1 ? null : <List items={this.state.userPropertiesArray[this.props.playerIndex].map(e => {
                return <div>
                  {e.PropertyObj.NAME}
                  {this.state.mortgageButtonVisible
                    ? <button onClick={() => { this.handleMortgageButtonClick(e.PropertyObj.NAME) }} >
                      Mortgage
                    </button> : null
                  }
                </div>
              })} />}
            </div>
          </div>
        </div>
        <div className='UserPositions'>
          <div className='CurrentUser' />
          <div className='UserPositionsArray' />
        </div>
        <div className='comment'>
          {this.state.comment}
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
    userPropertiesArray: state.userPropertiesArray,
    jailPositions: state.jailPositions,
    userMoneyArray: state.userMoneyArray,
    index: state.index,
    playerIndex: state.playerIndex,
    userCashArray: state.userCashArray
  }
}

DiceRoll.propTypes = {
  dice: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  username: React.PropTypes.string.isRequired,
  gameID: React.PropTypes.number.isRequired,
  userID: React.PropTypes.string.isRequired,
  userPosArray: React.PropTypes.array.isRequired,
  jailPositions: React.PropTypes.array.isRequired,
  userMoneyArray: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  userPropertiesArray: React.PropTypes.array.isRequired,
  userCashArray: React.PropTypes.array.isRequired
}
export default connect(mapStateToProps)(DiceRoll)
