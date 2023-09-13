import React from 'react';
import { Link } from 'react-router-dom';

import { ApiCall } from '../../helpers';

function SignIn ({ onSuccess }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function login () {
    const payload = {
      email,
      password,
    }
    ApiCall('POST', '/admin/auth/login', payload, onSuccess);
  }

  return (
        <>
            email: <input id={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/><br />
            password: <input id={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/><br />
            <button onClick={login}>Login</button>
            <hr />
            <Link to='/signup'>Not yet a user? Sign up now</Link>
        </>
  )
}

export default SignIn
