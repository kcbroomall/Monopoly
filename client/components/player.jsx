import React, { Component } from 'react'
import { Header, Container, Segment, Divider, Message, Image } from 'semantic-ui-react'
import DiceRoll from './dice_roll2'
import { connect } from 'react-redux'
import Chat from './chat'

class Player extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name
    }
  }

  componentWillReceiveProps (prev) {
    this.setState({ name: prev.name })
  }

  render () {
    return (
      <Container className='pcard'>
        <Segment raised vertical compact className='content'>
          <Header as='h6' icon textAlign='center'>
            <Image src={`${window.localStorage.picture}`} size='mini' shape='circular' />
            <Header.Content>
              {this.state.name}
            </Header.Content>
          </Header>
          <Divider />
          <Message>
            ${this.props.userCashArray[this.props.playerIndex]}
          </Message>
          <DiceRoll dice={this.props.dice} setComment={this.props.setComment} setHouse={this.props.setHouse} />
          <Chat name={this.props.username} />
        </Segment>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    username: state.username,
    userCashArray: state.userCashArray,
    playerIndex: state.playerIndex
  }
}
Player.propTypes = {
  username: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  piece: React.PropTypes.string.isRequired,
  dice: React.PropTypes.func.isRequired,
  userCashArray: React.PropTypes.array.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  setComment: React.PropTypes.func.isRequired,
  setHouse: React.PropTypes.func.isRequired
}
export default connect(mapStateToProps)(Player)
