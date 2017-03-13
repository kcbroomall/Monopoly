import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Message, Card, List, Image } from 'semantic-ui-react'
import Trade from './Trade'
class OtherPlayers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userObj: {}
    }
  }

  render () {
    return (
      <Card>
        <Card.Content>
          <Image floated='right' size='mini' src={`${this.props.picture}`} />
          <Card.Header>
            {this.props.playerUsername}
          </Card.Header>
          <Card.Description>
            <Message>
              ${this.props.userCashArray[this.props.otherPlayerIndex]}
            </Message>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {this.props.playerIndex === this.props.index ? <List items={this.props.userPropertiesArray[this.props.otherPlayerIndex].map((e, index) => {
            return <div key={index} className={e.PropertyObj.PROPERTY_GROUP} >{e.PropertyObj.NAME}
              <Trade playerUsername={this.props.playerUsername}
                property={e.PropertyObj.NAME}
                socket={this.props.socket}
                position={index}
                owner={this.props.otherPlayerIndex}
                otherIndex={this.props.otherPlayerIndex} />
            </div>
          })} /> : null
          }
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    gameID: state.gameID,
    players: state.players,
    userCashArray: state.userCashArray,
    userPropertiesArray: state.userPropertiesArray,
    index: state.index,
    playerIndex: state.playerIndex
  }
}

OtherPlayers.propTypes = {
  gameID: React.PropTypes.number.isRequired,
  playerUsername: React.PropTypes.string.isRequired,
  picture: React.PropTypes.string.isRequired,
  userCashArray: React.PropTypes.array.isRequired,
  otherPlayerIndex: React.PropTypes.number.isRequired,
  userPropertiesArray: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  socket: React.PropTypes.string.isRequired
}
export default connect(mapStateToProps)(OtherPlayers)
