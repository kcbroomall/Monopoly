import React, { Component } from 'react'
import sock from '../helper/socket'
import { connect } from 'react-redux'
import {
  setIndex,
  setUserJail,
  setUserJailFree,
  setCash,
  setMoveToken,
  setDiceRoll,
  setCardButton,
  setEndTurn,
  setLuxury,
  setBuyProperty,
  setGoButton,
  setJailRoll,
  setPayFine,
  setFreeCard,
  setPayRent,
  setIncomeTax,
  setButtons,
  setBankruptcy
} from './store/actionCreators'
import { Button, List, Modal, Image } from 'semantic-ui-react'
import Card from './Cards'
import Move from './moveToken'
import BuyProperty from './BuyProperty'
import Toast from './toast'
import comments from '../helper/comment'
import Mortgage from './MortgageProperty'
import UnMortgage from './UnMortgage'
import BuyHouse from './BuyHouse'
import SellHouse from './SellHouse'
import Bankrupt from './Bankrupt'

class DiceRoll extends Component {
  constructor (props) {
    super(props)
    this.state = {
      dice: [0, 0],
      diceSum: 0,
      comment: '',
      doubles: 0,
      card: true,
      userJailFreeCardArray: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
      rentOwed: 0,
      propertyOwner: -1,
      isBankruptArray: [false, false, false, false, false, false, false, false],
      showToast: false,
      numOfPlayers: -1,
      goFlag: false,
      mortgageButtonVisible: true,
      doubleRailRoadRentMultiplier: false,
      specialCardButton: 0,
      cardModal: false
    }
    this.props.dispatch(setButtons())
    this.setStates = this.setStates.bind(this)
    this.increaseFunds = this.increaseFunds.bind(this)
    this.reduceFunds = this.reduceFunds.bind(this)
    this.checkBankruptcy = this.checkBankruptcy.bind(this)
  }

  componentDidMount () {
    sock.socket.on('yourTurn', (data) => {
      if (this.props.bankruptcyButton === false) {
        window.localStorage.setItem('pIndex', data.index)
        this.props.dispatch(setIndex(data.index))
        this.props.dispatch(setDiceRoll(true))
        this.props.dispatch(setPayFine(true))
        this.props.dispatch(setJailRoll(true))
        this.props.dispatch(setFreeCard(true))
        this.setState({
          numOfPlayers: data.numOfPlayers,
          comment: 'It is your turn',
          mortgageButtonVisible: true,
          showToast: true,
          doubleRailRoadRentMultiplier: false,
          goFlag: false,
          specialCardButton: 0,
          doubles: 0
        })
      } else {
        this.props.dispatch(setEndTurn(true))
        this.setState({
          comment: 'You are bankrupt :( Please hit the end turn button to pass to other players',
          showToast: true
        })
      }
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: `It is ${this.props.username}'s turn.` })
    })
    sock.socket.on('update money', (data) => {
      this.props.dispatch(setCash(data.money, data.index))
    })
    sock.socket.on('update jail free', (data) => {
      this.props.dispatch(setUserJailFree(data.jailFreeArray, data.index))
    })
    sock.socket.on('receive-comment', (comment) => {
      this.setState({ comment, showToast: true })
    })
    this.props.setComment({comment: this.state.comment})
  }

  handleDiceRollButtonClick () {
    this.props.dispatch(setButtons())
    const die1 = 1 + Math.floor((6 * Math.random()))
    const die2 = 1 + Math.floor((6 * Math.random()))
    if (this.state.specialCardButton) {
      let newComment = `${this.props.username} rolled a ${die1 + die2}!`
      this.props.dispatch(setMoveToken(true))
      this.props.dispatch(setDiceRoll(false))
      this.setState({
        comment: newComment,
        showToast: true,
        dice: [die1, die2]
      })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
    } else if (this.props.jailPositions[this.props.index]) {
      if (die1 === die2) {
        let updatedJailPositionsArray = [...this.props.jailPositions]
        updatedJailPositionsArray[this.props.index] = 0

        this.props.dispatch(setUserJail(updatedJailPositionsArray[this.props.index], this.props.index))
        this.props.dispatch(setMoveToken(true))
        this.props.dispatch(setDiceRoll(false))
        this.props.dispatch(setJailRoll(false))
        let newComment = comments.jailDoubles(this.props.username, die1 + die2)
        this.setState({ comment: newComment, showToast: true, dice: [die1, die2] })
        sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      } else {
        let updatedJailPositionsArray = [...this.props.jailPositions]
        updatedJailPositionsArray[this.props.index] += 1

        this.props.dispatch(setUserJail(updatedJailPositionsArray[this.props.index], this.props.index))

        this.props.dispatch(setEndTurn(true))
        this.props.dispatch(setJailRoll(false))

        let newComment = comments.jailNotDoubles(this.props.username)
        this.setState({ comment: newComment, showToast: true, dice: [die1, die2] })
        sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      }
    } else {
      let doubles = 0
      if (die1 === die2) {
        doubles = this.state.doubles + 1
        let newComment = comments.rollDoubles(this.props.username, die1 + die2)
        this.setState({ comment: newComment, showToast: true, dice: [die1, die2] })
        sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      }
      if (die1 !== die2) {
        let newComment = comments.diceRoll(this.props.username, die1 + die2)
        this.setState({ comment: newComment, showToast: true, dice: [die1, die2] })
        sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      }
      this.props.dispatch(setDiceRoll(false))
      this.props.dispatch(setMoveToken(true))
      this.props.dispatch(setBuyProperty(false))
      this.setState({
        diceSum: die1 + die2,
        doubles: doubles,
        dice: [die1, die2]
      })
    }
  }

  handleEndTurnButtonClick () {
    this.props.dispatch(setButtons())
    this.props.dispatch(setEndTurn(false))
    this.props.dispatch(setBuyProperty(false))
    sock.end({ gameID: this.props.gameID, pos: this.props.userPosArray[this.props.index], index: this.props.index, comment: '' })
    // the below is needed to re-render
    this.setState({
      mortgageButtonVisible: false
    })
  }

  setStates (obj) {
    this.setState(obj)
  }

  handleGoButtonClick () {
    this.props.dispatch(setCash(200, this.props.index))
    sock.updateMoney({
      gameID: this.props.gameID,
      money: 200,
      index: this.props.index
    })

    let doubles = this.state.doubles
    this.props.dispatch(setEndTurn(!doubles))
    this.props.dispatch(setGoButton(false))
    this.props.dispatch(setDiceRoll(!!doubles))
  }

  handleCardButtonClick () {
    this.props.dispatch(setCardButton(false))
  }

  increaseFunds (value) {
    this.props.dispatch(setCash(value, this.props.index))
    sock.updateMoney({ gameID: this.props.gameID, money: value, index: this.props.index })
  }

  reduceFunds (value) {
    this.props.dispatch(setCash(-value, this.props.index))
    sock.updateMoney({ gameID: this.props.gameID, money: -value, index: this.props.index })
  }

  handlePayRentButtonClick () {
    let currentUser = this.props.playerIndex
    let propertyOwner = this.state.propertyOwner
    let rentOwed = this.state.rentOwed
    let updatedUserMoney = this.props.userCashArray[currentUser]
    let doubles = this.state.doubles
    if (updatedUserMoney < rentOwed) {
      let newComment = comments.rentInsufficientFunds(this.props.username, rentOwed, updatedUserMoney[currentUser])
      this.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
    } else {
      let newComment = comments.rentPaid(this.props.username, 'the property owner', rentOwed)
      this.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      this.props.dispatch(setCash(-rentOwed, currentUser))
      this.props.dispatch(setCash(rentOwed, propertyOwner))
      sock.updateMoney({ gameID: this.props.gameID, money: -rentOwed, index: currentUser })
      sock.updateMoney({ gameID: this.props.gameID, money: rentOwed, index: propertyOwner })
      this.props.dispatch(setPayRent(false))
      this.props.dispatch(setEndTurn(!doubles))
      this.props.dispatch(setDiceRoll(!!doubles))
    }
  }

  handlePayIncomeTaxButtonClick () {
    let doubles = this.state.doubles
    let updatedUserMoneyArray = this.props.userCashArray
    if (updatedUserMoneyArray[this.props.index] < 200) {
      this.props.dispatch(setEndTurn(false))
      this.props.dispatch(setMoveToken(false))
      let newComment = comments.incomeTaxInsufficientFunds(this.props.username)
      this.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
    } else {
      let newComment = comments.incomeTaxPaid(this.props.username)
      this.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      this.props.dispatch(setCash(-200, this.props.index))
      sock.updateMoney({
        gameID: this.props.gameID,
        money: -200,
        index: this.props.index
      })
      this.props.dispatch(setIncomeTax(false))
      this.props.dispatch(setEndTurn(!doubles))
      this.props.dispatch(setDiceRoll(!!doubles))
    }
  }

  handlePayLuxuryTaxButtonClick () {
    let doubles = this.state.doubles
    let updatedUserMoneyArray = this.props.userCashArray
    if (updatedUserMoneyArray[this.props.index] < 100) {
      this.props.dispatch(setEndTurn(false))
      this.props.dispatch(setMoveToken(false))
      let newComment = comments.luxuryTaxInsufficientFunds(this.props.username)
      this.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
    } else {
      let newComment = comments.luxuryTaxPaid(this.props.username)
      this.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      this.props.dispatch(setCash(-100, this.props.index))
      sock.updateMoney({
        gameID: this.props.gameID,
        money: -100,
        index: this.props.index
      })
      this.props.dispatch(setLuxury(false))
      this.props.dispatch(setEndTurn(!doubles))
      this.props.dispatch(setDiceRoll(!!doubles))
    }
  }

  handleJailPayFineButtonClick () {
    if (this.props.userCashArray[this.props.index] < 50) {
      let newComment = comments.jailFineInsufficientFunds(this.props.username)
      this.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      this.checkBankruptcy()
    } else {
      this.props.dispatch(setCash(-50, this.props.index))
      sock.updateMoney({ gameID: this.props.gameID, money: -50, index: this.props.index })
      let updatedJailPositions = [...this.props.jailPositions]
      updatedJailPositions[this.props.index] = 0
      this.props.dispatch(setUserJail(updatedJailPositions[this.props.index], this.props.index))
      this.props.dispatch(setDiceRoll(true))
      this.props.dispatch(setPayFine(false))
      this.props.dispatch(setJailRoll(false))
      this.props.dispatch(setFreeCard(false))
    }
  }

  handleJailFreeCardButtonClick () {
    if (this.props.jailFreeArray[this.props.index][0] === 0 && this.props.jailFreeArray[this.props.index][1] === 0) {
      let newComment = `${this.props.username} does not have any jail free cards.`
      this.setState({ comment: newComment, showToast: true })
      sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
    } else {
      if (this.props.jailFreeArray[this.props.index][0] === 1) {
        let updatedJailFreeArray = [...this.props.jailFreeArray]
        updatedJailFreeArray[this.props.index][0] = 0
        this.props.dispatch(setUserJailFree(updatedJailFreeArray[this.props.index], this.props.index))
        sock.updateJailFree({ gameID: this.props.gameID, jailFreeArray: updatedJailFreeArray[this.props.index], index: this.props.index })
        let newComment = `${this.props.username} used the community chest Get-Out-Of-Jail Free card.`
        this.setState({ comment: newComment, showToast: true })
        sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      } else if (this.props.jailFreeArray[this.props.index][1] === 1) {
        let updatedJailFreeArray = [...this.props.jailFreeArray]
        updatedJailFreeArray[this.props.index][1] = 0
        this.props.dispatch(setUserJailFree(updatedJailFreeArray[this.props.index], this.props.index))
        sock.updateJailFree({ gameID: this.props.gameID, jailFreeArray: updatedJailFreeArray[this.props.index], index: this.props.index })
        let newComment = `${this.props.username} used the chance Get-Out-Of-Jail Free card.`
        this.setState({ comment: newComment, showToast: true })
        sock.socket.emit('comment', { gameID: this.props.gameID, comment: newComment })
      }
      let updatedJailPositions = [...this.props.jailPositions]
      updatedJailPositions[this.props.index] = 0
      this.props.dispatch(setUserJail(updatedJailPositions[this.props.index], this.props.index))
      this.props.dispatch(setDiceRoll(true))
      this.props.dispatch(setPayFine(false))
      this.props.dispatch(setJailRoll(false))
      this.props.dispatch(setFreeCard(false))
    }
  }

  checkBankruptcy () {
    let usersProperties = [...this.props.userPropertiesArray[this.props.index]]
    let count = 0
    usersProperties.forEach((property) => {
      if (property.Mortgaged) count++
    })
    if (count === usersProperties.length) {
      this.props.dispatch(setBankruptcy(true))
    }
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
              {(this.props.diceRollButton && !this.props.payRent && !this.props.jailPositions[this.props.index] && !this.props.setGoButton)
                ? <div>
                  <div>{this.props.index === -1 ? null : `${this.props.username}, it is your turn. Roll the dice!`}</div>
                  <Button secondary fluid onClick={() => { this.handleDiceRollButtonClick() }}>Roll Dice</Button>
                </div> : null
              }
            </div>
            <div className='move-token-btn_div'>
              {this.props.moveTokenButton
                ? <div>
                  <Move
                    setState={this.setStates}
                    doubles={this.state.doubles}
                    diceSum={this.state.diceSum}
                    dice={this.props.dice}
                    dies={this.state.dice}
                    specialCardButton={this.state.specialCardButton}
                    doubleRailRoadRentMultiplier={this.state.doubleRailRoadRentMultiplier}
                    userNames={this.state.userNames}
                    goFlag={this.state.goFlag}
                    propertyIsOwned={this.propertyIsOwned}
                  />
                </div> : null
              }
            </div>
            {
              (this.props.cardButton && !this.props.setGoButton) ? <Card button={() => { this.handleCardButtonClick() }}
                card={this.state.card}
                jailFreeArray={this.props.jailFreeArray}
                dice={this.props.dice}
                doubles={this.state.doubles}
                numOfPlayers={this.state.numOfPlayers}
                doubleRailRoadRentMultiplier={this.state.doubleRailRoadRentMultiplier}
                setState={this.setStates}
              /> : null
            }
            {
              this.state.cardModal
                ? <Modal id='card-modal' open={this.state.cardModal} wrapped centered >
                  <Modal.Content image>
                    <Image wrapped size='medium' centered src={`${this.state.card ? 'community' : 'chance'}/${this.state.cardID}.png`} />
                  </Modal.Content>
                  <Button onClick={() => { this.setState({ cardModal: false }) }}> Close </Button>
                </Modal> : null
            }
            <div className='buy-property-btn_div'>
              {(this.props.buyPropertyButton && (!this.props.setGoButton || this.state.goFlag))
                ? <div>
                  <BuyProperty doubles={this.state.doubles} setState={this.setStates} userNames={this.state.userNames} diceSum={this.state.diceSum} />
                </div> : null
              }
            </div>
            <div className='pass-go-btn_div'>
              {(this.props.setGoButton && !this.state.goFlag)
                ? <div>
                  <Button secondary fluid onClick={() => { this.handleGoButtonClick() }}>  Collect $200. </Button>
                </div> : null
              }
            </div>
            <div className='income-tax-btn_div'>
              {this.props.incomeTaxButton
                ? <div>
                  <Button secondary fluid onClick={() => { this.handlePayIncomeTaxButtonClick() }}>  Pay $200 in income tax. </Button>
                </div> : null
              }
            </div>
            <div className='luxury-tax-btn_div'>
              {this.props.luxuryButton
                ? <div>
                  <Button secondary fluid onClick={() => { this.handlePayLuxuryTaxButtonClick() }}>  Pay $100 in luxury tax. </Button>
                </div> : null
              }
            </div>
            <div className='pay-rent-btn_div'>
              {(this.props.payRent && (!this.props.setGoButton || this.state.goFlag))
                ? <div>
                  <div className='rent-comment'>
                    {this.state.payRentComment}
                  </div>
                  <Button secondary fluid onClick={() => { this.handlePayRentButtonClick() }}>  Pay Rent. </Button>
                </div> : null
              }
            </div>
            <div className='end-turn-btn_div'>
              {(this.props.endTurnButton && !this.props.luxuryButton && (!this.props.setGoButton || this.state.goFlag) && !this.props.incomeTaxButton && !this.props.payRent && !this.props.cardButton)
                ? <div>
                  <Button secondary fluid onClick={() => { this.handleEndTurnButtonClick() }}>  End Turn. </Button>
                </div> : null
              }
            </div>
            <div className='bankruptcy-btn_div'>
              {this.props.bankruptcyButton
                ? <div>
                  <Bankrupt setState={this.setStates} />
                </div> : null
              }
            </div>
          </div>
          <div className='jail_div'>
            {(this.props.jailPositions[this.props.index] && !this.props.endTurnButton)
              ? <div>
                <div> {this.props.payFineButton ? (this.props.jailPositions[this.props.index] === 3) ? 'This is your 3rd turn in jail. Pay $50 or use a Get Out of Jail Free card' : 'You are in jail. Pay $50 to get out immediately, try to roll doubles,' +
                    ' or use a Get Out of Jail Free card' : 'You are in jail :( '} </div>
                <div className='jail-pay-fine-btn_div'>
                  {(this.props.payFineButton && !this.props.endTurnButton)
                    ? <div>

                      <Button secondary fluid onClick={() => {
                        this.handleJailPayFineButtonClick()
                      }}> Pay $50. </Button>
                    </div> : null
                  }
                </div>
                <div className='jail-roll-doubles-btn_div'>
                  {(this.props.jailRollDiceButton && !this.props.endTurnButton && this.props.jailPositions[this.props.index] < 3)
                    ? <div>
                      <Button secondary fluid onClick={() => {
                        this.handleDiceRollButtonClick()
                      }}> Attempt to roll doubles. </Button>
                    </div> : null
                  }
                </div>
                <div className='jail-free-card-btn_div'>
                  {(this.props.freeCardButton && !this.props.endTurnButton)
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
        <div className='CurrentUserJailFree'>
          {(this.props.jailFreeArray[this.props.playerIndex][0] === 1 && this.props.jailFreeArray[this.props.playerIndex][1] === 1)
            ? `You have both the community chest and the chance Get-Out-Of-Jail Free cards.`
            : (this.props.jailFreeArray[this.props.playerIndex][0] === 1) ? `You have the community chest Get-Out-Of-Jail Free card.`
              : (this.props.jailFreeArray[this.props.playerIndex][1] === 1) ? `You have the chance Get-Out-Of-Jail Free card.` : null
          }
        </div>
        <div className='CurrentUserProperties'>
          <div>
            {this.props.index === -1 ? null : !this.props.userPropertiesArray[this.props.playerIndex].length ? null : <div>Properties: <List items={this.props.userPropertiesArray[this.props.playerIndex].map((e, index) => {
              return <div key={index} className={e.PropertyObj.PROPERTY_GROUP} >{e.PropertyObj.NAME}
                {(this.state.mortgageButtonVisible) ? <span>{e.Mortgaged ? <UnMortgage propertyName={e.PropertyObj.NAME} reduceFunds={this.reduceFunds} cash={this.props.userCashArray[this.props.playerIndex]} setState={this.setStates} />
                  : <Mortgage propertyName={e.PropertyObj.NAME} increaseFunds={this.increaseFunds} setState={this.setStates} />}
                  {e.Monopoly ? <BuyHouse propertyPosition={e.Position}
                    propertyGroup={e.PropertyObj.PROPERTY_GROUP}
                    reduceFunds={this.reduceFunds}
                    houses={e.Houses}
                    numberNeeded={e.PropertyObj.NUMBER_OF_PROPERTIES_IN_GROUP}
                    setState={this.setStates}
                    setHouse={this.props.setHouse} /> : null}
                  {e.Houses > 0 ? <SellHouse propertyPosition={e.Position}
                    increaseFunds={this.increaseFunds}
                    houses={e.Houses}
                    setState={this.setStates}
                    setHouse={this.props.setHouse}
                     /> : null}</span> : null} </div>
                })} /></div>}
          </div>
        </div>
        <Toast message={this.state.comment} show={this.state.showToast} />
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
    index: state.index,
    playerIndex: state.playerIndex,
    userCashArray: state.userCashArray,
    jailFreeArray: state.jailFreeArray,
    diceRollButton: state.diceRollButton,
    moveTokenButton: state.moveTokenButton,
    cardButton: state.cardButton,
    setGoButton: state.setGoButton,
    endTurnButton: state.endTurnButton,
    incomeTaxButton: state.incomeTaxButton,
    luxuryButton: state.luxuryButton,
    payRent: state.payRent,
    bankruptcyButton: state.bankruptcyButton,
    payFineButton: state.payFineButton,
    jailRollDiceButton: state.jailRollDiceButton,
    buyPropertyButton: state.buyPropertyButton,
    freeCardButton: state.freeCardButton,
    comment: state.comment
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
  index: React.PropTypes.number.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  userPropertiesArray: React.PropTypes.array.isRequired,
  userCashArray: React.PropTypes.array.isRequired,
  jailFreeArray: React.PropTypes.array.isRequired,
  diceRollButton: React.PropTypes.bool.isRequired,
  moveTokenButton: React.PropTypes.bool.isRequired,
  cardButton: React.PropTypes.bool.isRequired,
  setGoButton: React.PropTypes.bool.isRequired,
  endTurnButton: React.PropTypes.bool.isRequired,
  incomeTaxButton: React.PropTypes.bool.isRequired,
  luxuryButton: React.PropTypes.bool.isRequired,
  payRent: React.PropTypes.bool.isRequired,
  bankruptcyButton: React.PropTypes.bool.isRequired,
  payFineButton: React.PropTypes.bool.isRequired,
  jailRollDiceButton: React.PropTypes.bool.isRequired,
  freeCardButton: React.PropTypes.bool.isRequired,
  buyPropertyButton: React.PropTypes.bool.isRequired,
  setComment: React.PropTypes.func.isRequired,
  setHouse: React.PropTypes.func.isRequired,
  comment: React.PropTypes.string.isRequired
}

export default connect(mapStateToProps)(DiceRoll)
