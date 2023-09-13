import React from 'react';
import ButtonStopQuiz from './ButtonStopQuiz';
import ButtonCopyGameLink from './ButtonCopyGameLink';
import ButtonStartQuiz from './ButtonStartQuiz';

function GameHandler (quiz) {
  const [currentSessionId, setCurrentSessionId] = React.useState('')
  const originalQuiz = quiz.quiz
  const origSetGameStarted = quiz.setGameStarted
  console.log(quiz.quiz)

  return (
    <>
    {
    !(originalQuiz.active)
      ? <ButtonStartQuiz
            quiz={originalQuiz}
            setGameStarted={origSetGameStarted}
            setCurrentSessionId = {setCurrentSessionId}
            />
      : (<>
        Current Session Id: {currentSessionId}<br />
        <ButtonCopyGameLink quiz={originalQuiz}/>
        <br/>
        <ButtonStopQuiz
            // quiz={originalQuiz}
            // setGameStarted={origSetGameStarted}
            quizId = {originalQuiz.id}
            sessionId = {originalQuiz.active}
            />
        </>)
    }
    </>
  )
}

export default GameHandler
