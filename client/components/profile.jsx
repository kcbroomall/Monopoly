import React, { Component } from 'react'
import axios from 'axios'
import Nav from './nav'

class Profile extends Component {
  constructor (props) {
    super(props)
    this.state = {
      queryResults: []
    }
    this.getChats = this.getChats.bind(this)
  }

  getChats (e) {
    e.preventDefault()
    let room = document.getElementById('room').value
    let keyword = document.getElementById('keyword').value
    let date = document.getElementById('date').value
    document.getElementById('keyword').value = ''
    axios.post('/chats', { room: room, keyword: keyword, date: date })
      .then((res) => {
        this.setState({ queryResults: res.data })
      })
      .catch((err) => console.error(err))
  }

  render () {
    let queryResults = this.state.queryResults.map((result) => {
      return <li className='oneChat'>Sender: {result.sender} Room: {result.room} <br />Message: {result.message}</li>
    })
    return (
      <div>
        <Nav />
        <div className='container marginTop'>
          <div className='row'>
            <div className='col-md-6 col-md-offset-3 text-center'>
              <h1>Search your chats!</h1>
              <p> Enter Your Search Criteria Below! </p>
              <form role='form' onSubmit={this.getChats}>
                <div className='form-group'>
                  <div className='input-group'>
                    <input type='text' className='form-control' placeholder='Enter keywords here...' id='keyword' />
                  </div>
                </div>
                <div className='row filterRow'>
                  <div className='col-md-4'>
                    <select id='room' name='room' className='selectpicker'>
                      <option>All Rooms</option>
                      <option value='lobby'>Lobby</option>
                      <option value='board'>Board</option>
                    </select>
                  </div>
                  <div className='col-md-4'>
                    <select id='date' className='selectpicker'>
                      <option>This Week</option>
                      <option value='thisWeek'>This Month</option>
                      <option value='thisYear'>This Year</option>
                    </select>
                  </div>
                  <div className='col-md-4'>
                    <button type='submit' className=' btn btn-lg btn-success'>Show chats</button>
                  </div>
                </div>
              </form>
              <p> You have total of {this.state.queryResults.length} messages </p>
              <div className='chatWindow'>
                <ul>
                  {queryResults}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default Profile
