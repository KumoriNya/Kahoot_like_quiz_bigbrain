import React from 'react';

function QuestionDifficulty ({ results, questionInfo }) {
  const [summary, setSummary] = React.useState({})
  const [isInitialised, setInitialised] = React.useState(false)
  console.log(results, questionInfo)

  React.useEffect(() => {
    console.log('ini')
    computeResultSummary()
    console.log(summary)
  }, [])

  function computeResultSummary () {
    const resultSummary = { playerSummarys: [], responseTimeSummarys: [], responseCorrectnessSummarys: [], }
    for (const resultIndex in results) {
      const playerSummary = {}
      const result = results[resultIndex]
      const name = result.name
      playerSummary.name = name
      playerSummary.value = 0
      const answers = result.answers
      for (const answerIndex in answers) {
        const currentResponse = answers[answerIndex]
        let responseTime = 0
        if (currentResponse.questionStartedAt !== null && currentResponse.answeredAt !== null) {
          responseTime = parseInt((new Date(currentResponse.answeredAt) - new Date(currentResponse.questionStartedAt)) / 1000, 10)
        }
        // First time adding responseTime for question no.i, and push
        if (parseInt(resultSummary.responseTimeSummarys.length) === parseInt(answerIndex)) {
          const responseTimeSummary = { questionIndex: answerIndex }
          responseTimeSummary.totalResponseTime = 0
          responseTimeSummary.totalParticipants = 0
          resultSummary.responseTimeSummarys.push(responseTimeSummary)
        }
        // Update
        resultSummary.responseTimeSummarys[answerIndex].totalResponseTime = resultSummary.responseTimeSummarys[answerIndex].totalResponseTime + responseTime
        resultSummary.responseTimeSummarys[answerIndex].totalParticipants = resultSummary.responseTimeSummarys[answerIndex].totalParticipants + 1

        if (parseInt(resultSummary.responseCorrectnessSummarys.length) === parseInt(answerIndex)) {
          const responseCorrectnessSummary = { questionIndex: answerIndex }
          responseCorrectnessSummary.correct = 0
          responseCorrectnessSummary.wrong = 0
          resultSummary.responseCorrectnessSummarys.push(responseCorrectnessSummary)
        }
        if (currentResponse.correct) {
          resultSummary.responseCorrectnessSummarys[answerIndex].correct = resultSummary.responseCorrectnessSummarys[answerIndex].correct + 1
          playerSummary.value = playerSummary.value + parseInt(questionInfo[answerIndex].points)
        } else {
          resultSummary.responseCorrectnessSummarys[answerIndex].wrong = resultSummary.responseCorrectnessSummarys[answerIndex].wrong + 1
        }
      }
      resultSummary.playerSummarys.push(playerSummary)
    }
    setSummary(resultSummary)
    setInitialised(true)
    console.log(JSON.stringify(resultSummary))
  }
  return (<>
    { isInitialised
      ? <>
        {summary.playerSummarys.sort((a, b) => b.value - a.value).map((result, index) => (index < 5 && <>{ result.name } got { result.value }<br/></>))}
        {summary.responseTimeSummarys.sort((a, b) => a.questionIndex - b.questionIndex).map(result => (<>
          Question{ result.questionIndex } average time is { result.totalResponseTime / result.totalParticipants }<br/>
        </>))}
        {summary.responseCorrectnessSummarys.sort((a, b) => a.questionIndex - b.questionIndex).map(result => (<>
          Question{ result.questionIndex } correct rate { result.correct / (result.correct + result.wrong) }<br/>
        </>))}
        </>
      : <>Loading Summary</>
    }<br/>
  </>)
}

export default QuestionDifficulty;
