import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Image, Modal, Icon, Message } from 'semantic-ui-react'
import sock from '../helper/socket'
import { setCash, setUserProperties } from './store/actionCreators'
class ShowOffer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      counterOffer: null,
      open: false
    }
    this.close = this.close.bind(this)
    this.acceptOffer = this.acceptOffer.bind(this)
  }

  acceptOffer () {
    const offer = Number(this.props.offer)
    let ownerPropertyArray = ([...this.props.userPropertiesArray[this.props.playerIndex]])
    let buyerPropertyArray = ([...this.props.userPropertiesArray[this.props.offerIndex]])
    this.props.dispatch(setCash(offer, this.props.playerIndex))
    this.props.dispatch(setCash(-offer, this.props.offerIndex))
    sock.updateMoney({ gameID: this.props.gameID, money: -offer, index: this.props.offerIndex })
    sock.updateMoney({ gameID: this.props.gameID, money: offer, index: this.props.playerIndex })
    const soldProperty = ownerPropertyArray.splice(this.props.position, 1).pop()
    this.props.dispatch(setUserProperties(ownerPropertyArray, this.props.playerIndex))
    sock.updateProps({ gameID: this.props.gameID, properties: ownerPropertyArray, index: this.props.playerIndex })
    soldProperty.Monopoly = false
    let propGroup = soldProperty.PropertyObj.PROPERTY_GROUP
    let numberForMonopoly = soldProperty.PropertyObj.NUMBER_OF_PROPERTIES_IN_GROUP
    let propCount = 0
    buyerPropertyArray.push(soldProperty)
    buyerPropertyArray.forEach(property => {
      if (property.PropertyObj.PROPERTY_GROUP === propGroup) {
        propCount += 1
      }
    })
    if (propCount === numberForMonopoly && propGroup !== 'Utilities' && propGroup !== 'Stations') {
      buyerPropertyArray.forEach(property => {
        if (property.PropertyObj.PROPERTY_GROUP === propGroup) {
          property.Monopoly = true
        }
      })
    }
    this.props.dispatch(setUserProperties(buyerPropertyArray, this.props.offerIndex))
    sock.updateProps({ gameID: this.props.gameID, properties: buyerPropertyArray, index: this.props.offerIndex })
    this.props.setShowOffer()
  }
  close () {
    this.props.setShowOffer()
  }

  render () {
    return (
      <Modal open={this.props.open} basic size='small'>
        <Header icon='archive' content='Offer' />
        <Modal.Content>
          <Image wrapped size='medium' centered src={`Property_Cards/${this.props.userPropertiesArray[this.props.playerIndex][this.props.position].Position}.png`} />
          <Modal.Description>
            <Header>Someone Made an offer</Header>
            <Message>
              {this.props.offer}
            </Message>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => {
            this.close()
          }}>
            <Icon name='remove' /> Decline
      </Button>
          <Button color='green' inverted onClick={() => {
            this.acceptOffer()
          }}>
            <Icon name='checkmark' /> Accept
      </Button>
        </Modal.Actions>
      </Modal>
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

ShowOffer.propTypes = {
  gameID: React.PropTypes.number.isRequired,
  playerUsername: React.PropTypes.string.isRequired,
  userCashArray: React.PropTypes.array.isRequired,
  userPropertiesArray: React.PropTypes.array.isRequired,
  index: React.PropTypes.number.isRequired,
  position: React.PropTypes.number.isRequired,
  offer: React.PropTypes.string.isRequired,
  offerIndex: React.PropTypes.number.isRequired,
  playerIndex: React.PropTypes.number.isRequired,
  playerName: React.PropTypes.string.isRequired,
  setShowOffer: React.PropTypes.func.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  open: React.PropTypes.bool.isRequired

}
export default connect(mapStateToProps)(ShowOffer)

