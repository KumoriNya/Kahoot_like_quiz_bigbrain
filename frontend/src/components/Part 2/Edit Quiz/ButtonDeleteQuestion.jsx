import React from 'react';
import { ApiCall } from '../../../helpers';

function DeleteQuestionButton ({ question, quizInfo, quizId, isQuestionDeleted, setIsQuestionDeleted }) {
  async function deleteQuestion () {
    const questionToDeleteId = question.id
    const removedQuestionList = quizInfo.questions.filter(question => question.id !== questionToDeleteId)

    const payload = {
      questions: removedQuestionList,
      name: quizInfo.name,
      thumbnail: quizInfo.thumbnail
    }
    console.log(quizInfo)
    await ApiCall('PUT', `/admin/quiz/${quizId}`, payload);

    alert('Question deleted successfully')
    setIsQuestionDeleted(!isQuestionDeleted)
  }

  return <button onClick={deleteQuestion}>Delete Question</button>
}

export default DeleteQuestionButton
