import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonEditQuiz ({ quizId }) {
  const navigate = useNavigate();
  function setEditButton () {
    localStorage.setItem('quizToEditId', quizId);
    navigate(`/admin/quiz/${quizId}`);
  }

  return <>
    <button onClick={setEditButton}>Edit</button>
  </>
}

export default ButtonEditQuiz
