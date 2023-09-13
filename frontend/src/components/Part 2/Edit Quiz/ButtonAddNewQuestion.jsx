import React from 'react';
import FormCreateQuestion from './FormCreateQuestion';

function ButtonAddNewQuestion ({ isQuestionCreated, setIsQuestionCreated }) {
  const [createQuestionButton, setCreateQuestionButton] = React.useState(true);
  const [showCreateQuestionForm, setCreateQuestionForm] = React.useState(false);

  function SwitchCreateCancel () {
    setCreateQuestionButton(!createQuestionButton);
    setCreateQuestionForm(!showCreateQuestionForm);
  }
  return (<>
        {createQuestionButton
          ? <button onClick={() => { SwitchCreateCancel() }}>Add Question</button>
          : <button onClick={() => { SwitchCreateCancel() }}>Cancel Add Question</button>
        }
        <br />
        {
          showCreateQuestionForm &&
          <FormCreateQuestion
            isQuestionCreated={isQuestionCreated}
            setIsQuestionCreated={setIsQuestionCreated}
            buttonSwitcher={SwitchCreateCancel}
          />
        }
      </>)
}

export default ButtonAddNewQuestion;
