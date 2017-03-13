import React, { Component } from 'react'
import {List, Segment, Divider} from 'semantic-ui-react'
import sock from '../helper/socket'
import escape from 'lodash.escape'
class Chat extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      messages: []
    }
    this.submitMessage = this.submitMessage.bind(this)
  }
  componentDidMount () {
    sock.socket.on('receive-message', (msgInfo) => {
      let messages = this.state.messages
      messages.push(msgInfo)
      this.setState({ messages: messages })
    })
  }

  submitMessage () {
    let message = escape(document.getElementById('chatBox').value)
    document.getElementById('chatBox').value = ''
    let sender = this.state.name
    let room = 'board'
    let msgInfo = {sender: sender, message: message, room: room}

    JSON.stringify(msgInfo)
    sock.socket.emit('new-message', escape(msgInfo))
  }

  render () {
    let messages = this.state.messages.map((msg, i) => {
      return <li key={i}>{msg.sender}: {msg.message}</li>
    })
    return (
      <Segment vertical compact className='content'>
        <Divider />
        <List items={messages} />
        <input id='chatBox' name='chatBox' type='text' />
        <button onClick={this.submitMessage}>Send</button>
      </Segment>
    )
  }
}

Chat.propTypes = {
  name: React.PropTypes.string.isRequired
}

export default Chat
