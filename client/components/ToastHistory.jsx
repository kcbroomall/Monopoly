import React, { Component } from 'react'
import { Header, Container, Segment, Divider, List } from 'semantic-ui-react'
import sock from '../helper/socket'

class ToastHistory extends Component {
  constructor (props) {
    super(props)
    this.state = {
      comments: []
    }
  }

  componentDidMount () {
    sock.socket.on('receive-comment', (comment) => {
      let comments = this.state.comments
      comments.push(comment)
      this.setState({ comments: comments })
    })
  }
  render () {
    return (
      <Container className='toastHistory'>
        <Segment raised vertical compact className='content'>
          <Header as='h6' icon textAlign='center'>
            <Header.Content>Activity Logs</Header.Content>
          </Header>
          <Divider />
          <List className='history' items={this.state.comments.map((comment, i) => {
            return <li key={i}>{comment}</li>
          })} />
        </Segment>
      </Container>
    )
  }

}

ToastHistory.propTypes = {
  message: React.PropTypes.string.isRequired
}
export default ToastHistory
