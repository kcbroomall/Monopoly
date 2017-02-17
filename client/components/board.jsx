import React, { Component } from 'react'
import Symbol from './Symbol'
import DiceRoll from './dice_roll'
import Player from './player'
// import rules from '../static/rules.js'

class Board extends Component {
  constructor (props) {
    super(props)
    this.dice = this.dice.bind(this)

    this.state = {
      user0: [97, 97],
      user0_money: 1550,
      user1: [97, 97],
      user2: [97, 97],
      user3: [97, 97],
      user4: [97, 97],
      user5: [97, 97],
      user6: [97, 97],
      user7: [97, 97]
    } // [top, left]
  }

  dice (userPositionsArray, userMoney) {
    console.log('pos array',userPositionsArray)
    // console.log('user Money', userMoney)
    const location = [
      [97, 97], [97, 83], [97, 75], [97, 66.5], [97, 58.5], [97, 50], [97, 42], [97, 34], [97, 25.5], [97, 17.5], [97, 2.5],
      [84.5, 2.5], [76.4, 2.5], [68.2, 2.5], [60, 2.5], [51.8, 2.5], [43.5, 2.5], [35.4, 2.5], [27.1, 2.5], [19, 2.5], [7, 2.5],
      [7, 17.5], [7, 25.5], [7, 34], [7, 42], [7, 50], [7, 58.5], [7, 66.5], [7, 75], [7, 83],
      [7, 97], [19, 97], [27.1, 97], [35.4, 97], [43.5, 97], [51.8, 97], [60, 97], [68.2, 97], [76.4, 97], [84.5, 97]
    ] // [bottom, left, right, top]
    const money = [3000]
    this.setState({
      user0: location[userPositionsArray[0]],
      user0_money: money[0],
      user1: location[userPositionsArray[1]],
      user2: location[userPositionsArray[2]],
      user3: location[userPositionsArray[3]],
      user4: location[userPositionsArray[4]],
      user5: location[userPositionsArray[5]],
      user6: location[userPositionsArray[6]],
      user7: location[userPositionsArray[7]]
    })
  }
  render () {
    return (
      <div>
        <DiceRoll dice={this.dice} userMoney={this.userMoney} />
        <Player name='RJ' piece='Hat' />
        <div className='board parent'>
          <Symbol className='token0' left={`${this.state.user0[1]}%`} top={`${this.state.user0[0]}%`} userNumber={0} money={`${this.state.user0_money}`}/>
          <Symbol className='token1' left={`${this.state.user1[1]}%`} top={`${this.state.user1[0] - 2}%`} userNumber={1} />
          <Symbol className='token2' left={`${this.state.user2[1]}%`} top={`${this.state.user2[0] - 4}%`} userNumber={2} />
          <Symbol className='token3' left={`${this.state.user3[1]}%`} top={`${this.state.user3[0] - 6}%`} userNumber={3} />
          <Symbol className='token4' left={`${this.state.user4[1] - 2}%`} top={`${this.state.user4[0]}%`} userNumber={4} />
          <Symbol className='token5' left={`${this.state.user5[1] - 2}%`} top={`${this.state.user5[0] - 2}%`} userNumber={5} />
          <Symbol className='token6' left={`${this.state.user6[1] - 2}%`} top={`${this.state.user6[0] - 4}%`} userNumber={6} />
          <Symbol className='token7' left={`${this.state.user7[1] - 2}%`} top={`${this.state.user7[0] - 6}%`} userNumber={7} />
          <div className='wire'>
            <div className='flexcol'>
              <div className='flexrow'>
                <div className='top' id='Position20'>
                  20
                </div>
                <div className='item' id='Position21'>
                  21
                </div>
                <div className='item' id='Position22'>
                  22
                </div>
                <div className='item' id='Position23'>
                  23
                </div>
                <div className='item' id='Position24'>
                  24
                </div>
                <div className='item' id='Position25'>
                  25
                </div>
                <div className='item' id='Position26'>
                  26
                </div>
                <div className='item' id='Position27'>
                  27
                </div>
                <div className='item' id='Position28'>
                  28
                </div>
                <div className='item' id='Position29'>
                  29
                </div>
                <div className='top' id='Position30'>
                  30
                </div>
              </div>
              <div className='flexmiddle'>
                <div className='flexside'>
                  <div className='item' id='Position19'>
                    19
                  </div>
                  <div className='item' id='Position18'>
                    18
                  </div>
                  <div className='item' id='Position17'>
                    17
                  </div>
                  <div className='item' id='Position16'>
                    16
                  </div>
                  <div className='item' id='Position15'>
                    15
                  </div>
                  <div className='item' id='Position14'>
                    14
                  </div>
                  <div className='item' id='Position13'>
                    13
                  </div>
                  <div className='item' id='Position12'>
                    12
                  </div>
                  <div className='item' id='Position11'>
                    11
                  </div>
                </div>
                <div className='flexside'>
                  <div className='item' id='Position31'>
                    31
                  </div>
                  <div className='item' id='Position32'>
                    32
                  </div>
                  <div className='item' id='Position33'>
                    33
                  </div>
                  <div className='item' id='Position34'>
                    34
                  </div>
                  <div className='item' id='Position35'>
                    35
                  </div>
                  <div className='item' id='Position36'>
                    36
                  </div>
                  <div className='item' id='Position37'>
                    37
                  </div>
                  <div className='item' id='Position38'>
                    38
                  </div>
                  <div className='item' id='Position39'>
                    39
                  </div>
                </div>
              </div>
              <div className='flexrow'>
                <div className='top' id='Position10'>
                  10
                </div>
                <div className='item' id='Position9'>
                  9
                </div>
                <div className='item' id='Position8'>
                  8
                </div>
                <div className='item' id='Position7'>
                  7
                </div>
                <div className='item' id='Position6'>
                  6
                </div>
                <div className='item' id='Position5'>
                  5
                </div>
                <div className='item' id='Position4'>
                  4
                </div>
                <div className='item' id='Position3'>
                  3
                </div>
                <div className='item' id='Position2'>
                  2
                </div>
                <div className='item' id='Position1'>
                  1
                </div>
                <div className='top' id='Position0'>
                  0
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Board
