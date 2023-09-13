import React from 'react';
import { ApiCall } from '../../../helpers';

function CreateGameForm ({ newGameCreated, setNewGameCreated, buttonSwitcher }) {
  const [gameName, setGameName] = React.useState('');
  async function createNewGame () {
    await ApiCall('POST', '/admin/quiz/new', { name: gameName });
    buttonSwitcher();
    setNewGameCreated(!newGameCreated);
    console.log('Fetching will be activated due to new game created');
  }
  return <>
    <br />
    Name: <input value={gameName} onChange={(e) => setGameName(e.target.value)} />
    <br />
    <button onClick={createNewGame}>Create New Game</button>
  </>
}

export default CreateGameForm
