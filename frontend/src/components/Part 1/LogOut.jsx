import React from 'react';

import { ApiCall } from '../../helpers';

function LogOut ({ onSuccess }) {
  const payload = {};
  async function logout () {
    ApiCall('POST', '/admin/auth/logout', payload, onSuccess);
  }

  return (
        <>
          <button onClick={logout}>Log Out</button>
        </>
  )
}

export default LogOut
