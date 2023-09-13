import React from 'react';
import { useNavigate } from 'react-router-dom';

function PlayJoin () {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = React.useState('');
  return (
    <>
      Hey!
      Session id: <input value={sessionId} onChange={(e) => setSessionId(e.target.value)} />
      <button onClick={() => { navigate(`/play/join/${sessionId}`) }}>Confirm</button>
    </>
  )
}

export default PlayJoin;
