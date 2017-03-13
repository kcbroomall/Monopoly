import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar'
import { Link } from 'react-router-dom'

const Nav = (props) => {
  const username = window.localStorage.displayname || 'Guest'
  return (
    <MuiThemeProvider>
      <Toolbar className='headers'>
        <ToolbarTitle text='Hackopoly' className='title' />
        <ToolbarTitle text={`Welcome ${username}`} className='name' />
        <Link to='/team'><FlatButton label='Team' primary className='signout' /> </Link>
        <Link to='/profile'><FlatButton label='Chat Search' primary className='signout' /> </Link>
        <Link to='/'><FlatButton label='Sign Out' primary className='signout' /> </Link>
      </Toolbar>
    </MuiThemeProvider>
  )
}

export default Nav
