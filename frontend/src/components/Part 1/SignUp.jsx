import React from 'react';
import { Link } from 'react-router-dom';

import { ApiCall } from '../../helpers';

function SignUp ({ onSuccess }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [name, setName] = React.useState('')

  async function register () {
    const payload = {
      email,
      password,
      name,
    }
    ApiCall('POST', '/admin/auth/register', payload, onSuccess);
  }

  return (
        <>
            email: <input id={'email'} value={email} onChange={(e) => setEmail(e.target.value)}/><br />
            password: <input id={'password'} value={password} onChange={(e) => setPassword(e.target.value)}/><br />
            name: <input id={'name'} value={name} onChange={(e) => setName(e.target.value)}/><br />
            <button onClick={register}>Register</button>
            <hr />
            <Link to='/signin'>Already a user? Sign in now</Link>
        </>
  )
}

export default SignUp
