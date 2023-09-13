import React from 'react';
import { ApiCall } from '../../helpers';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

// function ButtonStopQuiz (quiz) {
function ButtonStopQuiz ({ quizId, sessionId }) {
  const navigate = useNavigate()

  function stopQuiz () {
    // const originalQuiz = quiz.quiz
    // ApiCall('POST', `/admin/quiz/${originalQuiz.id}/end`, {}, null);
    ApiCall('POST', `/admin/quiz/${quizId}/end`, {});

    Swal.fire({
      title: 'Would you like to view the results?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        // navigate(`/results/${originalQuiz.active}`)
        navigate(`/admin/quiz/${quizId}/advance/${sessionId}`)
      }
    })

    // quiz.setGameStarted(false)
  }

  return <button onClick={stopQuiz}>Stop Quiz</button>
}

export default ButtonStopQuiz
