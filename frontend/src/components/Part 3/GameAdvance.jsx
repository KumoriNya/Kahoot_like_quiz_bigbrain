import React from 'react';
import { useParams } from 'react-router-dom'

import { ApiCall } from '../../helpers';
import ButtonStopQuiz from './ButtonStopQuiz';
import DisplayQuestion from './DisplayQuestion';
import QuestionDifficulty from './QuestionDifficulty';
import PlayerPerformance from './PlayerPerformance';

function GameAdvance () {
  const [newQuestion, setNewQuestion] = React.useState(false)
  const [isGameActive, setActive] = React.useState(true)
  const [position, setPosition] = React.useState(-9)
  const [questions, setQuestions] = React.useState([''])
  const [startAt, setStartAt] = React.useState('')
  const [results, setResults] = React.useState('')
  const param = useParams()
  const quizId = param.quizId
  const sessionId = param.sessionId
  function successfulAdvance () {
    setNewQuestion(!newQuestion)
    setActive(true)
    console.log('Advanced')
  }
  function goToNextQuestion () {
    ApiCall('POST', `/admin/quiz/${quizId}/advance`, {}, successfulAdvance)
  }
  function showStatus (data) {
    // console.log(data)
    const results = data.results
    // Results contains: active, players, questions
    setStartAt(results.isoTimeLastQuestionStarted)
    setActive(results.active)
    setPosition(results.position)
    // Questions contains: hasMultipleAnswers, duration, points, correctAnswersIndexeslist
    setQuestions(results.questions)
    // console.log(results.questions, questions)
  }
  async function intialise () {
    await ApiCall('GET', `/admin/session/${sessionId}/status`, {}, showStatus)
    // await ApiCall('GET', `/admin/session/${sessionId}/results`, {}, showStatus)
  }
  React.useEffect(() => {
    intialise()
  }, [position, newQuestion])
  // When game finishes,
  //   Bar/Line chart showing a breakdown of what percentage of people (y) got questions (x) correct
  //   Average response time for each question
  function display (data) {
    const result = data.results
    const toBeSet = []
    console.log(`Results: ${result}`)
    console.log(result.length)
    for (let i = 0; i < result.length; i++) {
      const performance = {}
      performance.name = result[i].name
      performance.answers = result[i].answers
      toBeSet.push(performance)
    }
    setResults(toBeSet)
  }
  function fetchResult () {
    ApiCall('GET', `/admin/session/${sessionId}/results`, {}, display)
  }
  React.useEffect(() => {
    if (!isGameActive) {
      fetchResult()
    }
  }, [])
  return <>
  {isGameActive
    ? <>
      Advancing {sessionId}<br />
      <button onClick={goToNextQuestion}>Start Next Question</button>
      <button onClick={intialise}>See Info</button><br/>
      <DisplayQuestion position={position} questions={questions} startAt={startAt} fetchResult={fetchResult}/><br/>
      <ButtonStopQuiz quizId={quizId} sessionId={sessionId} />
    </>
    : <>
      Game Finished!
      <button onClick={fetchResult}>See Result</button><br />
      {results !== '' &&
        <><QuestionDifficulty results={results} questionInfo={questions}/>{
        results.map(result => (<><PlayerPerformance name={result.name} answers={result.answers}/></>))
      }</>}
    </>
  }
  </>
}

export default GameAdvance;
