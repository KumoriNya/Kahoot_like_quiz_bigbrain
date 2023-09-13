import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

import LogOut from './Part 1/LogOut';

function Site ({ setToken }) {
  const location = useLocation();
  const navigate = useNavigate();
  function successfulLogOut () {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('quizToEditId');
    navigate('/signin');
  }
  return (<>
    <header>
      <nav>
        {!['/signup', '/signin'].includes(location.pathname)
          ? <>
              <LogOut onSuccess={successfulLogOut} />
              <button onClick={() => navigate('/dashboard')}>Dashboard</button>
            </>
          : <>
              <button onClick={() => navigate('/signup')}>Sign up</button>|
              <button onClick={() => navigate('/signin')}> Sign in</button>
            </>
        }
      </nav>
    </header>
    <br></br>
    <main>
      <Outlet />
    </main>
  </>)
}

export default Site;
