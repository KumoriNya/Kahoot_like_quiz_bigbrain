import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ApiCall } from '../../helpers';

function PlayJoinedSession () {
  const navigate = useNavigate();
  const param = useParams();
  const sessionId = param.sessionId;
  const [name, setName] = React.useState('');
  const [playerId, setPlayerId] = React.useState('');
  function setId (data) {
    console.log(playerId)
    setPlayerId(data.playerId)
    localStorage.setItem('playerId', data.playerId)
    localStorage.setItem('sessionId', sessionId)
    navigate(`/play/${data.playerId}/`)
  }
  async function confirmName () {
    if (name === '') {
      setName(name)
      alert('Please enter a name')
      return
    }
    const payload = {}
    payload.name = name
    await ApiCall('POST', `/play/join/${sessionId}`, payload, setId)
  }
  React.useEffect(() => {
    if (localStorage.getItem('sessionId') === sessionId && localStorage.getItem('playerId')) {
      navigate(`/play/${localStorage.getItem('playerId')}/`)
    } else {
      if (localStorage.getItem('sessionId')) {
        localStorage.removeItem('sessionId')
      }
      if (localStorage.getItem('playerId')) {
        localStorage.removeItem('playerId')
      }
    }
  }, [])
  return (
    <>
      Hey!
      You are about to join game with session id: {sessionId}.<br/>
      Please enter your name:<input value={name} onChange={(e) => { setName(e.target.value) }}/><br/>
      <button onClick={confirmName}>Confirm</button><br/>
    </>
  )
}

export default PlayJoinedSession;
