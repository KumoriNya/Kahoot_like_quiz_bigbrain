import React from 'react';
import { useParams } from 'react-router-dom';

import { ApiCall } from '../../helpers';
import YoutubeEmbed from '../Part 2/Edit Quiz/YoutubeEmbed';
// import Timer from './Timer';

function PlayGame () {
  const param = useParams();
  const playerId = param.playerId;
  const url = `/play/${playerId}`
  const [isGameStarted, setGameStarted] = React.useState(false)
  const [hasGameStart, setHasGameStarted] = React.useState(false)

  const [title, setTitle] = React.useState('')
  const [answersList, setAnswers] = React.useState([])
  const [correctAnswers, setCorrectAnswers] = React.useState([])
  const [duration, setDuration] = React.useState('')
  const [startAt, setStartAt] = React.useState('')
  const [hasMultiple, setMultiple] = React.useState(false)
  const [responses, setResponses] = React.useState([])
  const [inTime, setInTime] = React.useState(true)
  const [qUrl, setUrl] = React.useState('')
  const [isVideo, setIsVideo] = React.useState(false)
  const [embed, setEmbed] = React.useState('')

  function hasGameStarted (data) {
    console.log(data.started)
    setGameStarted(data.started)
    if (data.started) {
      setHasGameStarted(data.started)
    }
  }

  React.useEffect(() => {
    if (!isGameStarted) {
      ApiCall('GET', url + '/status', {}, hasGameStarted)
    }
    if (hasGameStart && !isGameStarted) {
      getResult()
    }
  }, [isGameStarted, inTime])

  React.useEffect(() => {
    if (isGameStarted) {
      getQuestionInfo()
    }
    if (!inTime) {
      getAnswer()
    }
  }, [inTime, isGameStarted])
  function updateQuestion (data) {
    setCorrectAnswers([])
    setInTime(true)
    const question = data.question
    console.log(question)

    const _title = question.question
    setTitle(_title)

    const _answersList = question.answersList
    setAnswers(_answersList)

    const multiple = question.hasMultipleAnswers
    setMultiple(multiple)

    const questionStart = question.isoTimeLastQuestionStarted
    setStartAt(questionStart)

    const duration = question.duration
    setDuration(parseInt(duration, 10))

    const qUrl = question.url
    let embedId = ''
    if (qUrl.includes('youtu.be/')) {
      embedId = qUrl.split('/')[qUrl.split('/').length - 1]
      setIsVideo(true)
      setEmbed(embedId)
    } else if (qUrl.includes('www.youtube.com/watch?v=')) {
      embedId = qUrl.split('=')[1]
      setIsVideo(true)
      setEmbed(embedId)
    }
    setUrl(qUrl)
  }

  function getQuestionInfo () {
    ApiCall('GET', url + '/question', {}, updateQuestion);
  }

  function submitAnswer (index) {
    if (hasMultiple) {
      if (!responses.includes(index)) {
        responses.push(index)
      }
      console.log(`Current: ${responses}`)
    } else {
      const newList = [index]
      setResponses(newList)
      console.log(`Current: ${responses}`)
    }
    console.log(`Current Answers: ${responses}`)
    const res = {}
    res.answerIds = responses
    ApiCall('PUT', url + '/answer', res)
  }

  const [seconds, setSeconds] = React.useState('')

  React.useEffect(() => {
    const t = new Date(startAt)
    t.setSeconds(t.getSeconds() + parseInt(duration))
    const interval = window.setInterval(() => {
      const dif = parseInt((new Date(t) - new Date()) / 1000, 10)
      setSeconds(dif)
      if (seconds !== 0) {
        setSeconds(seconds => seconds - 1)
      }
      if (seconds === 0 || seconds < 0) {
        setInTime(false)
      }
    }, 1000);
    return () => clearInterval(interval)
  }, [seconds, answersList])

  function processResults (data) {
    console.log(data)
  }

  function getResult () {
    ApiCall('GET', url + '/results', {}, processResults);
  }

  function getAnswer () {
    ApiCall('GET', url + '/answer', {}, (data) => setCorrectAnswers(data.answerIds));
  }

  return <>
    The Game {isGameStarted ? 'has' : 'has not'} started. {isGameStarted ? '' : 'Please Wait'}
    <button onClick={getQuestionInfo}>Get Question</button><br/>
    <button onClick={getResult}>Get Result</button><br/>
    Question Title: {title}<br/>
    {typeof qUrl !== 'undefined'
      ? qUrl !== undefined && qUrl.includes('data:image') && qUrl.includes(';base64,')
        ? <>Image: <img width={'150px'} height={'150px'} src={`${qUrl}`}/></>
        : <>{isVideo && <>Video:<br /><YoutubeEmbed embedId={embed} /></>}</>
      : 'No provided link or image'
    }<br />
    Question Answers:<br/>{answersList.map((answer, index) => (
      <>
        <button onClick={() => submitAnswer(index)}>Answer{index}: {answer}</button>{correctAnswers.includes(index) && 'Correct Answer!'}<br/>
      </>
    ))}
    {inTime
      ? <>
        {/* Answer By: {t.toString()} */}
        <p>Time Remaining:</p>
        <p>{seconds} seconds</p>
        {/* <Timer stopBy={t} setInTime={setInTime}/> */}
        </>
      : <><button onClick={getAnswer}>Get Answer</button><br/></>
    }
  </>
}

export default PlayGame;
