import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonEditQuestion ({ currentQuizId, question }) {
  const navigate = useNavigate();
  return (
    <>
    <br></br>
    <button onClick={() => { navigate(`/admin/quiz/${currentQuizId}/${question.id}`) }}>Edit Question</button>
    <br></br>
  </>
  )
}

export default ButtonEditQuestion;
