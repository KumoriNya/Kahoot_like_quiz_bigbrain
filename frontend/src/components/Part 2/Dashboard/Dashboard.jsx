import React from 'react';
import { ApiCall } from '../../../helpers';
import CreateGame from './CreateGame';
import DetailedQuizInfo from './DetailedQuizInfo';
import ButtonDeleteQuiz from './ButtonDeleteQuiz';
import ButtonEditQuiz from './ButtonEditQuiz';
import GameHandler from '../../Part 3/GameHandler';

function Dashboard () {
  const [newGameCreated, setNewGameCreated] = React.useState(false);
  const [quizzes, setQuizzes] = React.useState([]);
  const [gameDeleted, setGameDeleted] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);

  function updateQuizzes (data) {
    const rawQuizzes = data.quizzes;
    rawQuizzes.sort(function (a, b) {
      return new Date(b.createdAt) - new Date(a.createdAt);
    })
    setQuizzes(rawQuizzes);
  }

  React.useEffect(async () => {
    await ApiCall('GET', '/admin/quiz', '', updateQuizzes);
  }, [newGameCreated, gameDeleted, gameStarted]);

  return <>
    Dashboard! list games...<br /><br />
    {quizzes.map(quiz => (
      <>
        <DetailedQuizInfo quiz={quiz}/>
        <GameHandler
          quiz={quiz}
          gameStarted={gameStarted}
          setGameStarted={setGameStarted}
        />
        <br />
        <ButtonDeleteQuiz
          quizId={quiz.id}
          gameDeleted={gameDeleted}
          setGameDeleted={setGameDeleted}/>
        <ButtonEditQuiz quizId={quiz.id}/>
        <br />
        <br />
      </>
    ))}

    <br /><hr /><br />
    <CreateGame newGameCreated={newGameCreated} setNewGameCreated={setNewGameCreated}/>
  </>;
}

export default Dashboard;
