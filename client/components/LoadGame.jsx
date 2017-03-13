import React from 'react'
import { Button } from 'semantic-ui-react'
import sock from '../helper/socket'
import { Link } from 'react-router-dom'
const LoadGame = (props) => {
  const loadGame = (gameID) => {
    sock.loadGame({gameID, id: window.localStorage.id, userID: window.localStorage.id})
  }
  return (
    <div>
      {
        props.pendingGames.map((game, index) => {
          return (props.load ? <Button fluid key={game.gameID} onClick={() => { loadGame(game.gameID) }}>
            Load {game.gameID}
          </Button> : <Link to='/board'>
            <Button fluid key={index}>
            Resume Now
             </Button>
          </Link>)
        })
      }
    </div>
  )
}

LoadGame.propTypes = {
  pendingGames: React.PropTypes.array.isRequired,
  load: React.PropTypes.bool.isRequired
}
export default LoadGame
