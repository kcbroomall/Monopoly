import React, { Component } from 'react'
import { render } from 'react-dom'
import { HashRouter as Router, Route, hashHistory } from 'react-router-dom'
import Board from './components/board'
import Land from './components/landing'
import Signup from './components/signup'
import Lobby from './components/lobby'
import { Provider } from 'react-redux'
import store from './components/store/store'
import Auth from './components/auth'
import Profile from './components/profile'
import Team from './components/team'
import Nav from './components/nav'

class App extends Component {
  render () {
    return (
      <Router history={hashHistory}>
        <Provider store={store}>
          <div>
            <Route exact path='/' component={Land} />
            <Route path='/board' component={Board} />
            <Route path='/signup' component={Signup} />
            <Route path='/lobby' component={Lobby} />
            <Route path='/auth' component={Auth} />
            <Route path='/profile' component={Profile} />
            <Route path='/team' component={Team} />
            <Route path='/nav' component={Nav} />
          </div>
        </Provider>
      </Router>
    )
  }
}

render(<App />, document.getElementById('container'))
