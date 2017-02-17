import React from 'react'

const Symbol = function (props) {
  // console.log('in symbol.js left = ', props.left, 'top = ', props.top)
  // console.log('money for user0', props.money)
  const left = props.left
  const top = props.top
  const userNumber = props.userNumber
  const position = props.position
  const userImages = [
    'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAIhAAAAJGFmNWU1YzNhLWJjY2YtNDgzOS1iNzc1LTkyYjY1NzhlMWRkYw.jpg',
    'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAMcAAAAJGU0YTBkZTc4LTdiNWQtNDZmYi1iOWE1LTkwNDdkNjQwYmRhNw.jpg',
    'https://pbs.twimg.com/profile_images/625466783818887168/O3TO0NvV.jpg',
    'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAYiAAAAJGYzZGYxOTkwLTM0NjAtNDEwMC05ZWUzLWZkNGJmYjM5M2VlYg.jpg',
    'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAO9AAAAJGFhOTdmN2MzLTFjODktNDY5MS1hZWM5LWQyMTNmNGUzMTRmNA.jpg',
    'https://pbs.twimg.com/profile_images/755922773504032768/DaK4yY4f.jpg',
    'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAeqAAAAJGE1ODJjYjdhLTRjZTgtNDU5Mi1hOTlhLTIwM2JmMzNkOTYzZQ.jpg',
    'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAfWAAAAJDIyM2MxYmRmLTU4NGItNGI0Ny05ZjIwLThhZGM1ZWQ4ZjM2Nw.jpg'
  ]

  // 'http://www.spore.com/static/avatar/500/231/078/black-top-hat.jpg'
  // 'Jeremy', 'Kyle', 'RJ', 'Joseph', 'Jeff', 'Justin', 'Jerry', 'Nino']
  return (
    <div className='symbol' style={{ left, top }}>
      <img id='tophat' alt='' src={userImages[userNumber]} />
    </div>
  )
}

Symbol.propTypes = {
  left: React.PropTypes.string.isRequired,
  top: React.PropTypes.string.isRequired,
  userNumber: React.PropTypes.number.isRequired
}

export default Symbol
