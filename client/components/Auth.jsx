import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
export default class Auth extends Component {
  constructor (props, context) {
    super(props)
    this.state = {
      promise: false,
      auth: false
    }
  }

  componentWillMount () {
    axios.get('/get-info')
      .then((res) => {
        window.localStorage.setItem('token', res.data.token)
        window.localStorage.setItem('displayname', res.data.user.displayName)
        window.localStorage.setItem('id', res.data.user.id)
        window.localStorage.setItem('picture', res.data.picture)
      })
      .catch((err) => console.log(err))
      .then(() => {
        axios.post('/tokenauth', { token: window.localStorage.token })
          .then((res) => {
            if (res.data.validToken) {
              this.setState({auth: true})
            }
          })
          .catch((err) => console.error(err))
          .then(() => {
            this.setState({promise: true})
          })
      })
  }

  render () {
    return (
      <div>
        {
           this.state.promise ? this.state.auth ? <Redirect to={{ pathname: '/lobby' }} /> : <Redirect to={{ pathname: '/' }} /> : null
        }
      </div>
    )
  }
}
