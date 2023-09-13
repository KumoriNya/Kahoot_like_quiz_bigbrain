import React from 'react';
import { useParams } from 'react-router-dom';

import FormQuestion from './FormQuestion';
// TODO: When submitting question from form, update with edit/backend?
// TODO: More options for answers
function FormCreateQuestion ({ isQuestionCreated, setIsQuestionCreated, buttonSwitcher }) {
  const param = useParams();
  return (
    <>
    <FormQuestion quizId={param.quizId} isQuestionCreated={isQuestionCreated} setIsQuestionCreated={setIsQuestionCreated} buttonSwitcher={buttonSwitcher}/>
    </>
  )
}

export default FormCreateQuestion
