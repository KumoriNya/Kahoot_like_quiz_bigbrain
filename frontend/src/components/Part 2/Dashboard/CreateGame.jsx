import React from 'react';
import FormCreateGame from './FormCreateGame';

function CreateGame ({ newGameCreated, setNewGameCreated }) {
  const [createGameButton, setCreateGameButton] = React.useState(true);
  const [showCreateGameForm, setCreateGameForm] = React.useState(false);

  function SwitchCreateCancel () {
    setCreateGameButton(!createGameButton);
    setCreateGameForm(!showCreateGameForm);
  }

  return (<>
    {createGameButton
      ? <button onClick={() => { SwitchCreateCancel() }}>Create Game</button>
      : <button onClick={() => { SwitchCreateCancel() }}>Cancel Create Game</button>
    }
    {showCreateGameForm &&
      <FormCreateGame
        newGameCreated={newGameCreated}
        setNewGameCreated={setNewGameCreated}
        buttonSwitcher={SwitchCreateCancel}
      />
    }
  </>)
}

export default CreateGame;
