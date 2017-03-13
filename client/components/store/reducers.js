import {
  SET_GAME_ID,
  SET_USERNAME,
  SET_USER_ID,
  SET_USERS_POSITIONS,
  SET_INDEX,
  SET_MESSAGE_ID,
  SET_USERS_PROPERTIES,
  SET_USERS_MONEY,
  SET_USERS_JAIL,
  SET_USERS_JAIL_FREE,
  SET_MYINDEX,
  SET_CASH,
  SET_PLAYERS,
  SET_PLAYER_PROPS,
  SET_DEFAULT_STATE,
  SET_MOVE_TOKEN,
  SET_DICE_ROLL,
  SET_BANKRUPTCY,
  SET_CARD_BUTTON,
  SET_END_TURN,
  SET_FREE_CARD,
  SET_GO_BUTTON,
  SET_INCOME_TAX,
  SET_JAIL_ROLL,
  SET_LUXURY_BUTTON,
  SET_PAY_FINE,
  SET_PAY_RENT,
  SET_STATE,
  SET_BUY_PROPERTY,
  SET_BUTTONS,
  SET_MORTGAGE_BUTTON
} from './actions'
const DEFAULT_STATE = {
  gameID: 0,
  username: '',
  userID: '',
  userPosArray: [0, 0, 0, 0, 0, 0, 0, 0],
  playerIndex: -1,
  index: 0,
  messageID: 0,
  players: [],
  userPropertiesArray: [[], [], [], [], [], [], [], []],
  jailPositions: [0, 0, 0, 0, 0, 0, 0, 0],
  userCashArray: [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
  userMoneyArray: [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
  jailFreeArray: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
  diceRollButton: false,
  moveTokenButton: false,
  cardButton: false,
  setGoButton: false,
  endTurnButton: false,
  incomeTaxButton: false,
  luxuryButton: false,
  payRent: false,
  bankruptcyButton: false,
  payFineButton: false,
  jailRollDiceButton: false,
  buyPropertyButton: false,
  freeCardButton: false,
  mortgageButton: false
}

const setGameID = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { gameID: action.id })
  return newState
}
const setUsername = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { username: action.username })
  return newState
}
const setUserID = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { userID: action.userID })
  return newState
}
const setIndex = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { index: action.index })
  return newState
}
const setPlayerIndex = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { playerIndex: action.index })
  return newState
}
const setUserPosition = (state, action) => {
  let newArr = [...state.userPosArray.slice(0, action.index),
    action.userPos,
    ...state.userPosArray.slice(action.index + 1)]
  const newState = {}
  Object.assign(newState, state, { userPosArray: newArr })
  return newState
}
const setMessageID = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { messageID: action.messageID })
  return newState
}
const setUserProperties = (state, action) => {
  let newArr = [...state.userPropertiesArray.slice(0, action.index),
    action.userProperties,
    ...state.userPropertiesArray.slice(action.index + 1)]
  const newState = {}
  Object.assign(newState, state, { userPropertiesArray: newArr })
  return newState
}
const setUserCash = (state, action) => {
  let cash = state.userCashArray[action.index] + action.cash
  let newArr = [...state.userCashArray.slice(0, action.index),
    cash,
    ...state.userCashArray.slice(action.index + 1)]
  const newState = {}
  Object.assign(newState, state, { userCashArray: newArr })
  return newState
}
const setUserMoney = (state, action) => {
  let newArr = [...state.userMoneyArray.slice(0, action.index),
    action.userMoney,
    ...state.userMoneyArray.slice(action.index + 1)]
  const newState = {}
  Object.assign(newState, state, { userMoneyArray: newArr })
  return newState
}
const setUserJail = (state, action) => {
  let newArr = [...state.jailPositions.slice(0, action.index),
    action.userJail,
    ...state.jailPositions.slice(action.index + 1)]
  const newState = {}
  Object.assign(newState, state, { jailPositions: newArr })
  return newState
}
const setUserJailFree = (state, action) => {
  let newArr = [...state.jailFreeArray.slice(0, action.index),
    action.jailFreeArray,
    ...state.jailFreeArray.slice(action.index + 1)]
  const newState = {}
  Object.assign(newState, state, { jailFreeArray: newArr })
  return newState
}
const setPlayersArray = (state, action) => {
  let newState = {}
  let newArray = [...action.playersArray]
  Object.assign(newState, state, { players: newArray })
  return newState
}
const setPlayerProps = (state, action) => {
  let player = state.players[action.index]
  player.userPosition = action.playerProps
  let newArr = [...state.players.slice(0, action.index),
    player,
    ...state.players.slice(action.index + 1)]
  const newState = {}
  Object.assign(newState, state, { players: newArr })
  return newState
}
const setDefault = (state, action) => {
  const newState = {}
  Object.assign(newState, state, DEFAULT_STATE)
  return newState
}
const setState = (state, action) => {
  const newState = {}
  Object.assign(newState, state, action.state)
  return newState
}
const setMove = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { moveTokenButton: action.flag })
  return newState
}
const setDiceRoll = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { diceRollButton: action.flag })
  return newState
}
const setBankruptcy = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { bankruptcyButton: action.flag })
  return newState
}
const setCardButton = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { cardButton: action.flag })
  return newState
}
const setEndTurn = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { endTurnButton: action.flag })
  return newState
}
const setFreeCard = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { freeCardButton: action.flag })
  return newState
}
const setGoButton = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { setGoButton: action.flag })
  return newState
}
const setIncomeTax = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { incomeTaxButton: action.flag })
  return newState
}
const setJailRoll = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { jailRollDiceButton: action.flag })
  return newState
}
const setLuxuryButton = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { luxuryButton: action.flag })
  return newState
}
const setPayFine = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { payFineButton: action.flag })
  return newState
}
const setPayRent = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { payRent: action.flag })
  return newState
}
const setMortgage = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { mortgageButton: action.flag })
  return newState
}
const setBuyProperty = (state, action) => {
  const newState = {}
  Object.assign(newState, state, { buyPropertyButton: action.flag })
  return newState
}

const setButtons = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {
    moveTokenButton: false,
    cardButton: false,
    setGoButton: false,
    endTurnButton: false,
    incomeTaxButton: false,
    luxuryButton: false,
    payRent: false,
    bankruptcyButton: false,
    payFineButton: false,
    jailRollDiceButton: false,
    buyPropertyButton: false,
    freeCardButton: false
  })
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_GAME_ID:
      return setGameID(state, action)

    case SET_USERNAME:
      return setUsername(state, action)

    case SET_USER_ID:
      return setUserID(state, action)

    case SET_USERS_POSITIONS:
      return setUserPosition(state, action)

    case SET_INDEX:
      return setIndex(state, action)

    case SET_MESSAGE_ID:
      return setMessageID(state, action)

    case SET_USERS_PROPERTIES:
      return setUserProperties(state, action)

    case SET_CASH:
      return setUserCash(state, action)

    case SET_USERS_MONEY:
      return setUserMoney(state, action)

    case SET_USERS_JAIL:
      return setUserJail(state, action)

    case SET_USERS_JAIL_FREE:
      return setUserJailFree(state, action)

    case SET_MYINDEX:
      return setPlayerIndex(state, action)

    case SET_PLAYERS:
      return setPlayersArray(state, action)

    case SET_PLAYER_PROPS:
      return setPlayerProps(state, action)

    case SET_DEFAULT_STATE:
      return setDefault(state, action)

    case SET_STATE:
      return setState(state, action)

    case SET_MOVE_TOKEN:
      return setMove(state, action)

    case SET_DICE_ROLL:
      return setDiceRoll(state, action)

    case SET_BANKRUPTCY:
      return setBankruptcy(state, action)

    case SET_CARD_BUTTON:
      return setCardButton(state, action)

    case SET_END_TURN:
      return setEndTurn(state, action)

    case SET_FREE_CARD:
      return setFreeCard(state, action)

    case SET_GO_BUTTON:
      return setGoButton(state, action)

    case SET_INCOME_TAX:
      return setIncomeTax(state, action)

    case SET_JAIL_ROLL:
      return setJailRoll(state, action)

    case SET_LUXURY_BUTTON:
      return setLuxuryButton(state, action)

    case SET_PAY_FINE:
      return setPayFine(state, action)

    case SET_PAY_RENT:
      return setPayRent(state, action)

    case SET_BUY_PROPERTY:
      return setBuyProperty(state, action)

    case SET_BUTTONS:
      return setButtons(state, action)

    case SET_MORTGAGE_BUTTON:
      return setMortgage(state, action)

    default:
      return state
  }
}
export default rootReducer
