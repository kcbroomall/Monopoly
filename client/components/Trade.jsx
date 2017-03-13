import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Input, Label } from 'semantic-ui-react'
import sock from '../helper/socket'
import escape from 'lodash.escape'

class Trade extends Component {
  constructor (props) {
    super(props)
    this.state = {
      offer: 0,
      open: false
    }
    this.handleOffer = this.handleOffer.bind(this)
  }

  open () {
    this.setState({ open: true })
  }

  close () {
    this.setState({ open: false })
  }

  handleOffer (e) {
    this.setState({ offer: +escape(e.target.value) || 0 })
  }

  offer () {
    sock.trade(this.props.socket, this.state.offer, this.props.position, this.props.playerIndex)
    this.setState({ open: false })
  }

  render () {
    return (
      <div>
        <Button color='black' onClick={() => this.open()}>Trade</Button>
        <Modal open={this.state.open} onClose={this.close} closeIcon='close'>
          <Modal.Header>Trade {this.props.property}</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={`Property_Cards/${this.props.userPropertiesArray[this.props.otherIndex][this.props.position].Position}.png`} />
            <Modal.Description>
              <Header>Trade with {this.props.playerUsername}</Header>
              <Input labelPosition='right' type='text' placeholder='Offer'>
                <Label basic>$</Label>
                <input onChange={this.handleOffer} />
                <Label>.00</Label>
              </Input>
            </Modal.Description>
          </Modal.Content>
          <Button onClick={() => this.close()}>close</Button>
          <Button onClick={() => this.offer()}>Offer</Button>
        </Modal>
      </div>
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

Trade.propTypes = {
  gameID: React.PropTypes.number.isRequired,
  playerUsername: React.PropTypes.string.isRequired,
  userCashArray: React.PropTypes.array.isRequired,
  userPropertiesArray: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  owner: React.PropTypes.number.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  property: React.PropTypes.string.isRequired,
  socket: React.PropTypes.string.isRequired,
  otherIndex: React.PropTypes.number.isRequired
}
export default connect(mapStateToProps)(Trade)

