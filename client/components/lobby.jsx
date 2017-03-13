import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import sock from '../helper/socket'
import { connect } from 'react-redux'
import { setUsername, setGameID, setUserID, setMyIndex, setDefaultState, setState } from './store/actionCreators'
import Toast from './toast'
import axios from 'axios'
import LoadGame from './LoadGame'
import { Input, Button, List, Image, Menu, Message } from 'semantic-ui-react'
import escape from 'lodash.escape'
import Nav from './nav'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Paper from 'material-ui/Paper'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'

class Lobby extends Component {
  constructor (props) {
    super(props)
    this.state = {
      button: false,
      join: true,
      start: false,
      messages: [],
      showToast: false,
      comment: '',
      queryResults: [],
      pendingGames: [],
      resume: true,
      games: {},
      auth: false,
      promise: false,
      userMessage: '',
      showGames: true,
      showNewGameButton: true,
      onlineUsers: {},
      startGame: false
    }

    this.props.dispatch(setDefaultState())
    this.props.dispatch(setUsername(window.localStorage.displayname))
    this.props.dispatch(setUserID(window.localStorage.id))
    sock.userJoined({ id: window.localStorage.id, displayName: window.localStorage.displayname, picture: window.localStorage.picture })
    this.joinGame = this.joinGame.bind(this)
    this.newGame = this.newGame.bind(this)
    this.startGame = this.startGame.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
    this.getChats = this.getChats.bind(this)
    this.signOut = this.signOut.bind(this)
    this.message = this.message.bind(this)
    this.setShowGames = this.setShowGames.bind(this)
  }

  componentWillMount () {
    axios.post('/tokenauth', { token: window.localStorage.token })
      .then((res) => {
        if (res.data.validToken) {
          this.setState({auth: true})
        }
      })
      .catch((err) => console.error(err))
      .then(() => {
        this.setState({promise: true})
      })
  }

  componentDidMount () {
    sock.socket.on('user joined', (data) => {
      this.setState({onlineUsers: data})
    })
    sock.socket.on('get games', (data) => {
      this.setState({ games: data })
    })
    sock.socket.on('update games', (data) => {
      this.setState({ games: data })
    })
    sock.socket.on('new game', (data) => {
      this.setState({ games: data.newGame })
    })

    sock.socket.on('pending games', (pendingGames) => {
      this.setState({ pendingGames })
    })

    sock.socket.on('your index', (data) => {
      this.props.dispatch(setMyIndex(data.index))
      if (data.newGame) {
        this.setState({games: data.newGame})
      }
    })

    sock.socket.on('player joined', (data) => {
      this.setState({
        join: false,
        start: true,
        showToast: true,
        comment: 'Player joined'
      })
      this.setState({
      })
      this.props.dispatch(setGameID(data.gameID))
    })

    sock.socket.on('player started', (data) => {
      this.setState({
        join: true,
        startGame: true
      })
    })

    sock.socket.on('receive-message', (msgInfo) => {
      let messages = [...this.state.messages]
      messages.push(msgInfo)
      this.setState({ messages })
    })

    sock.socket.on('load state', (state) => {
      this.props.dispatch(setState(state))
      this.setState({ resume: false })
    })
  }

  newGame () {
    this.setState({showNewGameButton: false})
    sock.newGame({ username: this.props.username, userID: this.props.userID, picture: window.localStorage.picture })
  }

  joinGame () {
    this.setState({showNewGameButton: false})
    this.setState({ join: false })
    sock.join({ username: this.props.username, userID: this.props.userID, gameID: this.props.gameID, picture: window.localStorage.picture })
  }

  startGame () {
    sock.start({ gameID: this.props.gameID })
  }

  submitMessage (e) {
    document.getElementById('message').value = ''
    let sender = this.props.username
    let room = 'lobby'
    let msgInfo = { sender: sender, message: this.state.userMessage, room: room, picture: window.localStorage.picture }
    JSON.stringify(msgInfo)
    sock.socket.emit('new-message', msgInfo)
  }

  message (e) {
    this.setState({userMessage: e.target.value})
  }

  handleGameClick (gameID) {
    this.setState({ join: false })
    this.props.dispatch(setGameID(gameID))
    window.localStorage.setItem('gameID', gameID)
  }

  getChats (e) {
    e.preventDefault()
    let room = document.getElementById('room').value
    let keyword = escape(document.getElementById('keyword').value)
    let date = document.getElementById('date').value
    document.getElementById('keyword').value = ''
    axios.post('/chats', { room: room, keyword: keyword, date: date })
      .then((res) => {
        this.setState({ queryResults: res.data })
      })
      .catch((err) => console.error(err))
  }

  signOut () {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('displayname')
    window.localStorage.removeItem('id')
    this.setState({ promise: false })
  }

  setShowGames (bool) {
    this.setState({showGames: bool})
  }
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <Nav />
          {this.state.startGame ? <Redirect to={{ pathname: '/board' }} /> : null}
          <div className='lobby' >
            <div className='chat'>
              <div className='chat-container'>
                <Paper className='paper-chat' zDepth={5}>
                  <Toolbar className='headers' >
                    <ToolbarTitle text='CHAT' className='title' />
                  </Toolbar>
                  <div className='messages'>
                    { this.state.messages.map((msg, i) => {
                      return <List key={i}>
                        <List.Item>
                          <Image avatar src={`${msg.picture}`} />
                          <List.Content>
                            <List.Header as='a'>{msg.sender}</List.Header>
                            <List.Description>{msg.message}</List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    })}
                  </div>
                  <Input fluid placeholder='Type Here' id='message' onChange={this.message} action={<Button size='large' color='red' onClick={(e) => this.submitMessage(e)}> SEND </Button>} />
                </Paper>
              </div>
            </div>
            <div className='col'>
              <div className='users'>
                <div className='user-container'>
                  <Paper className='paper-chat' zDepth={5}>
                    <Toolbar className='headers'>
                      <ToolbarTitle text='ONLINE USERS' className='title' />
                    </Toolbar>
                    { Object.keys(this.state.onlineUsers).map((user, i) => {
                      return <List key={i}>
                        <List.Item>
                          <Image avatar src={`${this.state.onlineUsers[user].picture}`} />
                          <List.Description as='a'>{this.state.onlineUsers[user].displayName}</List.Description>
                        </List.Item>
                      </List>
                    })}
                  </Paper>
                </div>
              </div>
              <div className='game'>
                <div className='user-container'>
                  <Paper className='paper-chat' zDepth={5}>
                    <Toolbar className='headers'>
                      <ToolbarTitle text='GAMES' className='title' />
                    </Toolbar>
                    <Menu widths={2} className='gameMenu'>
                      <Menu.Item name='Join New Games' onClick={() => this.setShowGames(true)} />
                      <Menu.Item name='Resume Old Games' onClick={() => this.setShowGames(false)} />
                    </Menu>
                    {this.state.showGames ? <div className='showMenuGame' ><div className='show-games'>
                      {Object.keys(this.state.games).map((item) => {
                        return <Button fluid key={item} onClick={() => { this.handleGameClick(this.state.games[item]) }}> GAME: {item} </Button>
                      })}
                    </div>

                      {this.state.start ? <div className='start'><Button color='green' size='massive' onClick={this.startGame}> START GAME </Button></div> : this.state.showNewGameButton ? <Button.Group size='massive' fluid>
                        <Button color='green' onClick={() => this.newGame()}>NEW GAME</Button>
                        <Button.Or />
                        <Button color='black' disabled={this.state.join} onClick={() => this.joinGame()}>JOIN</Button>
                      </Button.Group> : this.state.join
                      ? <Message className={'message'}>
                        <Message.Header>WAITING FOR MORE PLAYERS</Message.Header>
                      </Message> : <Message className={'message'}>
                        <Message.Header>WAITING FOR PLAYERS TO JOIN</Message.Header>
                      </Message>} </div>
                       : <div className='showMenuGame' >
                         <LoadGame pendingGames={this.state.pendingGames} load={this.state.resume} />
                       </div>
                  }
                  </Paper>
                </div>
              </div>
            </div>
          </div>
          <Toast message={this.state.comment} show={this.state.showToast} />
        </div>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.username,
    gameID: state.gameID,
    userID: state.userID,
    messageID: state.messageID,
    playerIndex: state.playerIndex,
    bankruptcyButton: state.bankruptcyButton
  }
}

Lobby.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  username: React.PropTypes.string.isRequired,
  gameID: React.PropTypes.number.isRequired,
  userID: React.PropTypes.string.isRequired,
  messageID: React.PropTypes.number.isRequired
}
export default connect(mapStateToProps)(Lobby)
