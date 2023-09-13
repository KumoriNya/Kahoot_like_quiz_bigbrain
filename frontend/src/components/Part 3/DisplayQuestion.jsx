import React from 'react';
import { useParams } from 'react-router-dom';

import Timer from '../Part 4/Timer';
import { ApiCall } from '../../helpers';

function DisplayQuestion ({ questions, position, startAt, fetchResult }) {
  const [inTime, setInTime] = React.useState(true)
  const param = useParams();

  function display (data) {
    console.log(data)
  }

  function hey () {
    const sessinoId = param.sessionId
    ApiCall('GET', `/admin/session/${sessinoId}/status`, {}, display)
  }

  if (typeof questions === 'undefined' || questions[0] === '') {
    // React.useEffect(() => {
    //   console.log(startAt)
    // }, [])
    return (<>
      Initialisng
    </>)
  } else if (position === -1) {
    return (
      <>When ready to start game, click Start Next Question</>)
  } else {
    const currentQuestion = questions[position]
    const t = new Date(startAt)
    t.setSeconds(t.getSeconds() + parseInt(currentQuestion.duration))
    return (
      <>Current Question Title is: {currentQuestion.question}<br/>
        Question Answers: {currentQuestion.answersList.map((answer, index) => (
      <><button>Answer{index}: {answer}</button></>
      ))}<br/>
      <button onClick={hey}>Try Urls</button><br/>
      {inTime
        ? <>
          Duration: {currentQuestion.duration}<br/>
          StopAt: {t.toString()}
          <Timer stopBy={t} setInTime={setInTime}/></>
        : <><button onClick={fetchResult}>See Result</button><br /></>
      }
    </>)
  }
}

export default DisplayQuestion;
