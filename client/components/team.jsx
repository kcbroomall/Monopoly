import React from 'react'
import { Card, Image } from 'semantic-ui-react'
import Nav from './nav'

const Team = () => {
  return (
    <div>
      <Nav />
      <div className='container marginTop' >
        <div className='row'>
          <div className='col-md-6 col-md-offset-3 text-center'>
            <h1>Our Team</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-4 marginTop'>
            <Card>
              <Image src='team/KC.jpg' />
              <Card.Content>
                <Card.Header className='text-center'>Kyle Cameron</Card.Header>
                <Card.Description className='text-center'>
                  Product Owner | Software Engineer
                  <a href='https://github.com/kcbroomall'><Image src='github.png' size='mini' className='social-space' /></a>
                  <a href='http://www.linkedin.com/in/kyle-cameron'><Image src='linkedin.png' size='mini' /> </a>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>

          <div className='col-md-4 marginTop'>
            <Card>
              <Image src='team/RJ.jpg' />
              <Card.Content>
                <Card.Header className='text-center'>RJ Mohammad</Card.Header>
                <Card.Description className='text-center'>
                  Software Engineer <br />
                  <a href='https://github.com/rjmohammad'><Image src='github.png' size='mini' className='social-space' /> </a>
                  <a href='https://www.linkedin.com/in/rj-mohammad/'><Image src='linkedin.png' size='mini' /></a>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>

          <div className='col-md-4 marginTop'>
            <Card>
              <Image src='team/jeremy.jpg' />
              <Card.Content>
                <Card.Header className='text-center'>Jinwei Lin</Card.Header>
                <Card.Description className='text-center'>
                  Scrum Master | Software Engineer
                  <a href='http://github.com/jinweilin8'><Image src='github.png' size='mini' className='social-space' /> </a>
                  <a href='http://linkedin.com/in/jinwei-lin8'><Image src='linkedin.png' size='mini' /></a>
                </Card.Description>
              </Card.Content>
            </Card>
          </div>
        </div>

        <div className='contentContainer marginTop'>
          <div className='row'>
            <div className='col-md-6 col-md-offset-3 text-center'>
              <h1>Tech Stack</h1>
            </div>
          </div>
          <div className='row marginTech'>
            <div className='col-md-3'>
              <img src='techStack/react.png' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/redux.png' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/react-router.png' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/webpack.png' className='techPic' />
            </div>
          </div>

          <div className='row marginTech'>
            <div className='col-md-3'>
              <img src='techStack/semantic.png' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/bootstrap.png' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/facebookAPI.jpg' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/socket.png' className='techPic' />
            </div>
          </div>

          <div className='row marginTech'>
            <div className='col-md-3'>
              <img src='techStack/expressjs.jpg' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/passport.png' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/mysql.png' className='techPic' />
            </div>
            <div className='col-md-3'>
              <img src='techStack/mongodb.png' className='techPic' />
            </div>
          </div>

          <div className='row marginTech'>
            <div className='col-md-6'>
              <img src='techStack/knex.png' className='techPic2' />
            </div>
            <div className='col-md-6'>
              <img src='techStack/jwt.png' className='techPic2' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Team
