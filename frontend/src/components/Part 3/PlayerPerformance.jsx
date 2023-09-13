import React from 'react';

function PlayerPerformance ({ name, answers, playerPerformance, setPerformance, responseTimeList, setResponseTimeList, correctRate, setCorrectRate }) {
  const [responses, setResponses] = React.useState([])
  React.useEffect(() => {
    setResponses(answers)
  }, [])

  return (<>
    Player name: {name}<br/>
    Question Responses:<br/>
    {responses.map((response, index) => {
      // Do all the computation and update using set before returning
      const responseTime = parseInt((new Date(response.answeredAt) - new Date(response.questionStartedAt)) / 1000, 10)
      return (<>
        Question {index + 1}
        : {response.correct ? 'Correct' : 'Incorrect'}
        {response.answeredAt !== null && `Answered in: ${responseTime} seconds`}<br/>
      </>)
    })}
  </>)
}

export default PlayerPerformance;
