import React, { Component } from 'react'
import { Button, Header, Container, Segment, Icon, Divider, Message } from 'semantic-ui-react'
import { rules } from '../static/rules'

class Player extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: props.name,
      piece: props.piece,
      money: 1500,
      property: ['house'],
      // todo: property: [{'PropertyObj': {PropertyObj}, 'Mortaged': false, 'Houses': 0,
      // 'Position': 0}],
      hasCommunityChestGetOutOfJailFree: false,
      hasChanceGetOutOfJailFree: false,
      userQueueNumber: 0,
      inJail: false,
      // todo: inJail: false, 1, 2,
      turn: false
    }
    this.increaseFunds = this.increaseFunds.bind(this)
    this.reduceFunds = this.reduceFunds.bind(this)
    this.buyProperty = this.buyProperty.bind(this)
    this.mortgageProperty = this.mortgageProperty.bind(this)
    this.unMortgageProperty = this.unMortgageProperty.bind(this)
    this.buyHouse = this.buyHouse.bind(this)
    this.sellHouse = this.sellHouse.bind(this)
  }

  increaseFunds (value) {
    this.setState = {
      money: (this.state.money + value)
    }
  }

  reduceFunds (value) {
    this.setState = {
      money: (this.state.money - value)
    }
  }

  buyProperty (propertyPosition) {
    let propertiesArray = this.state.property
    let propertyPrice = 0
    let newProperty = { PropertyObj: {}, Mortgaged: false, Houses: 0, Position: propertyPosition }
    rules.Properties.forEach((property) => {
      if (property.BOARD_POSITION === propertyPosition) {
        propertyPrice = property.PRICE
        newProperty.PropertyObj = property
        propertiesArray.push(newProperty)
      }
    })
    this.reduceFunds(propertyPrice)
    this.setState = {
      property: propertiesArray
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
    this.setState = {
      property: tempProperty
    }
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
    this.setState = {
      property: tempProperty
    }
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
      this.setState = {
        property: propertiesArray
      }
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
    this.setState = {
      property: propertiesArray
    }
  }

  handleChanceCard () {
    let propertiesArray = this.state.property
    let houseSalePrice = 0
    propertiesArray.forEach((property) => {
      if (property.Position === propertyPosition && property.Houses > 0) {
        houseSalePrice = property.PropertyObj.HOUSE_SALE_PRICE
        property.Houses -= 1
      }
    })
    this.increaseFunds(houseSalePrice)
    this.setState = {
      property: propertiesArray
    }
  }

  render () {
    return (
      <Container className='pcard'>
        <Segment raised vertical compact className='content'>
          <Header as='h6' icon textAlign='center'>
            <Icon name='users' circular />
            <Header.Content>
              {this.state.name}
            </Header.Content>
          </Header>
          <Divider />
          <Message>
            {this.state.money}
          </Message>
          <Button secondary fluid>Roll Dice</Button>
        </Segment>
      </Container>
    )
  }
}

Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  piece: React.PropTypes.string.isRequired
}
export default Player
