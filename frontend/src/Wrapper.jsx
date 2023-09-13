import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import Site from './components/Site';
import SignUp from './components/Part 1/SignUp';
import SignIn from './components/Part 1/SignIn';
import Dashboard from './components/Part 2/Dashboard/Dashboard';
import EditQuiz from './components/Part 2/Edit Quiz/EditQuiz';
import EditQuestion from './components/Part 2/Edit Quiz/Edit_Question/EditQuestion';
import PlayJoin from './components/Part 4/PlayJoin';
import PlayJoinedSession from './components/Part 4/PlayJoinedSession';
import PlayGame from './components/Part 4/PlayGame';
import GameAdvance from './components/Part 3/GameAdvance';

function Wrapper () {
  const [token, setToken] = React.useState(null);
  const [globalLoad, setGlobalLoad] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  function setTokenInStorage (data) {
    const _token = data.token;
    setToken(_token);
    localStorage.setItem('token', _token);
    navigate('dashboard');
    console.log(token)
  }
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'))
    }
  }, [])
  React.useEffect(function () {
    if (localStorage.getItem('token')) { // signed in
      setToken(localStorage.getItem('token'));
      if (['/signup', '/signin'].includes(location.pathname)) {
        navigate('/dashboard');
      }
    } else { // not signed in
      if (!['/signup', '/signin', '/play/join', '/play/join/:sessionId', '/play/:playerId'].includes(location.pathname) &&
          !location.pathname.includes('/play')) {
        console.log(location.pathname)
        navigate('/signin');
      }
    }
    setGlobalLoad(false);
  }, []);

  if (globalLoad) {
    return <>Loading...</>
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Site setToken={setToken} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp onSuccess={setTokenInStorage} />} />
          <Route path="/signin" element={<SignIn onSuccess={setTokenInStorage} />} />
          <Route path="/admin/quiz/:quizId" element={<EditQuiz />} />
          <Route path="/admin/quiz/:quizId/:questionId" element={<EditQuestion />} />
          <Route path="/play/join" element={<PlayJoin/>} />
          <Route path="/play/join/:sessionId" element={<PlayJoinedSession />} />
          <Route path="/play/:playerId" element={<PlayGame />} />
          {/* What's below */}
          <Route path="/admin/quiz/:quizId/advance/:sessionId" element={<GameAdvance />} />
          <Route path="/results/:sessionId" element={<>Results</>} />
        </Route>
      </Routes>
    </>
  );
}

export default Wrapper;
