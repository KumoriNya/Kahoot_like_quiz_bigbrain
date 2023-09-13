import React from 'react';
import { useParams } from 'react-router-dom';

import FormQuestion from '../FormQuestion';
function EditQuestion () {
  const param = useParams();

  return (
  <FormQuestion quizId={param.quizId} questionId={parseInt(param.questionId, 10)}/>
  )
}

export default EditQuestion
