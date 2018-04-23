import React from 'react'
import { Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const NotLoggedIn = () => (
  <Message warning>
    <Message.Header>Please create an account or log in!</Message.Header>
    <a href={process.env.REACT_APP_LOGIN}>
      <button style={{ marginTop: 20, color: 'white' }}>Register/Login</button>
    </a>
  </Message>
)

export default NotLoggedIn