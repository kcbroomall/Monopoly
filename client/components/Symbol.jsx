import React from 'react'

const Symbol = (props) => {
  const left = props.left
  const top = props.top

  return (
    <div className='symbol' style={{ left, top }}>
      <img id='tophat' alt='' src={`${props.picture}`} />
    </div>
  )
}

Symbol.propTypes = {
  left: React.PropTypes.string.isRequired,
  top: React.PropTypes.string.isRequired,
  picture: React.PropTypes.string.isRequired
}

export default Symbol
