import React from 'react';
import { ApiCall } from '../../helpers';

function ButtonStartQuiz (quiz) {
  async function startGame () {
    const originalQuiz = quiz.quiz

    await ApiCall('POST', `/admin/quiz/${originalQuiz.id}/start`, {}, null);
    // Get session id
    await ApiCall('GET', `/admin/quiz/${originalQuiz.id}`, '', displaySessionId);

    function displaySessionId (data) {
      console.log(data)
      alert(`Session ID is ${data.active}`)
      quiz.setCurrentSessionId(data.active)
      quiz.setGameStarted(true)
    }
  }
  return <button onClick={startGame}>Start Quiz</button>
}

export default ButtonStartQuiz
