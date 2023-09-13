import React from 'react';
import { ApiCall } from '../../../helpers';

function DetailedQuizInfo (quiz) {
  const [detailedQuiz, setDetailedQuiz] = React.useState({});
  const originalQuiz = quiz.quiz

  // const imageCard = styled('img') ({
  //   width: '150px',
  //   height: '150px',
  // })

  function updateQuizInfo (data) {
    const detailedQuizInfo = {}
    detailedQuizInfo.name = data.name
    detailedQuizInfo.numQuestions = data.questions.length
    detailedQuizInfo.thumbnail = data.thumbnail
    detailedQuizInfo.duration = 0
    if (data.questions) {
      for (const question of data.questions) {
        if (question.duration && !isNaN(question.duration)) {
          detailedQuizInfo.duration += parseInt(question.duration)
        }
      }
    }
    detailedQuizInfo.active = data.active ? 'true' : 'false'

    setDetailedQuiz(detailedQuizInfo);
  }

  React.useEffect(async () => {
    await ApiCall('GET', `/admin/quiz/${originalQuiz.id}`, '', updateQuizInfo);
  }, [originalQuiz.id]);
  return <>
  <div>
    Title: {detailedQuiz.name}<br/>
    Number of questions: {detailedQuiz.numQuestions}<br/>
    Thumbnail: {detailedQuiz.thumbnail === null ? 'No thumbnail' : <img width={'150px'} height={'150px'} src={`${detailedQuiz.thumbnail}`} />}<br/>
    Duration: {detailedQuiz.duration}<br/>
    Active: {detailedQuiz.active}<br/>
  </div>
  </>
}

export default DetailedQuizInfo;
