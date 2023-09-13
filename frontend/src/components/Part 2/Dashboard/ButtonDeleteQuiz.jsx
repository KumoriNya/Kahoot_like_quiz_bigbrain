import React from 'react';
import { ApiCall } from '../../../helpers';

function ButtonDeleteQuiz ({ quizId, gameDeleted, setGameDeleted }) {
  function alertSuccessfulDelete () {
    alert('Deleted quiz successfully')
    setGameDeleted(!gameDeleted)
    console.log('Fetching will be activated due to game deleted');
  }
  function Delete () {
    ApiCall('DELETE', `/admin/quiz/${quizId}`, {}, alertSuccessfulDelete);
  }

  return <>
    <button onClick={Delete}>Delete</button>
  </>
}

export default ButtonDeleteQuiz;
