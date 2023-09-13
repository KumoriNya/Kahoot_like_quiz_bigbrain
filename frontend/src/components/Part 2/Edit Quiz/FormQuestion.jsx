import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ApiCall, getRandomNumber } from '../../../helpers';
import UrlConvert from './UrlConvert';
// TODO: probabliy dont need setQuizToEdit
function FormQuestion ({ quizId, questionId, isQuestionCreated, setIsQuestionCreated, buttonSwitcher }) {
  const [questionToEditId, setQuestionId] = React.useState('');
  const quizToEditId = quizId;

  React.useEffect(() => {
    if (questionId !== undefined) {
      // console.log('Edit')
      setQuestionId(parseInt(questionId, 10))
    } else {
      // console.log('Create')
      setQuestionId(parseInt(getRandomNumber(), 10))
    }
  }, [])

  const [quizToEdit, setQuizToEdit] = React.useState({});
  const [question, setQuestion] = React.useState('')
  const [hasMultipleAnswers, setHasMultipleAnswers] = React.useState(false)
  const [duration, setDuration] = React.useState('')
  const [points, setPoints] = React.useState('')
  const [url, setUrl] = React.useState('')
  const [isUrlValid, setIsUrlValid] = React.useState(false)
  const [videoEmbedId, setEmbedId] = React.useState('')
  const [answersList, setAnswersList] = React.useState(['', ''])
  const [correctAnswersIndexesList, setCorrectAnswersIndexesList] = React.useState([''])

  const navigate = useNavigate();
  // console.log(param);

  // 1. Get quiz
  React.useEffect(async () => {
    await ApiCall('GET', `/admin/quiz/${quizToEditId}`, '', initialiseQuestionInfo);
  }, []);

  function initialiseQuestionInfo (data) {
    setQuizToEdit(data)
    updateQuestionInfo()
  }

  function updateQuestionInfo () {
    for (const question in quizToEdit.questions) {
      const currentQuestion = quizToEdit.questions[question]
      // console.log(currentQuestion)
      if (questionToEditId === currentQuestion.id) {
        console.log(currentQuestion)
        setQuestion(currentQuestion.question)
        setDuration(currentQuestion.duration)
        setHasMultipleAnswers(currentQuestion.hasMultipleAnswers)
        if (currentQuestion.url !== '' && typeof currentQuestion.url !== 'undefined' && currentQuestion.url.length < 1000) {
          setUrl(currentQuestion.url)
          setIsUrlValid(true)
        } else {
          if (typeof currentQuestion.url !== 'undefined') {
            setUrl(currentQuestion.url)
            setIsUrlValid(true)
          }
        }
        setPoints(currentQuestion.points)
        setAnswersList(currentQuestion.answersList)
        setCorrectAnswersIndexesList(currentQuestion.correctAnswersIndexesList)
      }
    }
  }

  React.useEffect(() => {
    updateQuestionInfo()
  }, [quizToEdit])

  async function confirmQuestionInfo () {
    if (correctAnswersIndexesList[0] === '') {
      alert('You have not set any question to be the correct answer')
      console.log(correctAnswersIndexesList)
      return
    }
    console.log(quizToEditId)
    console.log(questionToEditId)
    console.log(quizToEdit)

    // 3. Edit new question
    const questionInfo = {}
    questionInfo.id = questionToEditId
    questionInfo.question = question
    questionInfo.hasMultipleAnswers = hasMultipleAnswers;
    questionInfo.duration = duration
    questionInfo.points = points
    if (isUrlValid) {
      if (url !== '' && url !== 'Currently an image') {
        questionInfo.url = url
        console.log(`To be updated url: ${url}`)
      }
    }
    if (videoEmbedId !== '') {
      questionInfo.videoEmbedId = videoEmbedId
    }
    questionInfo.answersList = answersList
    questionInfo.correctAnswersIndexesList = correctAnswersIndexesList

    // 2. Get all questions except the question to edit
    const questionListWithoutEditedQuestion = quizToEdit.questions.filter(question => parseInt(question.id) !== parseInt(questionToEditId))
    // // 4. Add new question to previous questions
    const completeQuestionList = [...questionListWithoutEditedQuestion, questionInfo]

    // const newList = []
    // for (const questionIndex in quizToEdit.questions) {
    //   console.log(quizToEdit.questions[questionIndex])
    //   if (quizToEdit.questions[questionIndex].questionId !== questionToEditId) {
    //     newList.push(quizToEdit.questions[questionIndex])
    //     console.log('Updated', newList)
    //   } else {
    //     newList.push(questionInfo)
    //     console.log('Updated', newList)
    //   }
    // }
    // console.log(`Prev: ${completeQuestionList}, New: ${newList}`)

    // 5. Update quiz on backend
    const payload = {
      questions: completeQuestionList,
      name: quizToEdit.name,
      thumbnail: quizToEdit.thumbnail
    }
    await ApiCall('PUT', `/admin/quiz/${quizToEditId}`, payload);

    alert('Question uploaded successfully')
    if (buttonSwitcher !== undefined) {
      buttonSwitcher()
      setIsQuestionCreated(!isQuestionCreated)
    }

    // 6. Update page
    goToParentQuiz();
  }
  function goToParentQuiz () {
    navigate(`/admin/quiz/${quizToEditId}`)
    if (buttonSwitcher !== undefined) {
      buttonSwitcher()
    }
  }
  function addAnswerSpace () {
    const newAnswerList = [...answersList];
    newAnswerList.push('');
    setAnswersList(newAnswerList);
  }
  function deleteAnswerSpace (indexToDelete) {
    console.log('Deleting: ', indexToDelete)
    const newAnswerList = []
    for (const stringIndex in answersList) {
      const index = Number(stringIndex)
      if (index !== indexToDelete) {
        newAnswerList.push(answersList[index])
      }
    }
    console.log('To update:', newAnswerList)
    setAnswersList(newAnswerList);
  }
  function updateAnswerSpace (indexToUpdate, answerText) {
    const newAnswerList = []
    for (const stringIndex in answersList) {
      const index = Number(stringIndex)
      if (index !== indexToUpdate) {
        newAnswerList.push(answersList[index])
      } else {
        newAnswerList.push(answerText)
      }
    }
    setAnswersList(newAnswerList);
  }
  function addCorrectAnswer (correctAnswerIndex) {
    if (hasMultipleAnswers) {
      if (correctAnswersIndexesList[0] === '') {
        const newCorrectList = []
        newCorrectList.push(correctAnswerIndex)
        setCorrectAnswersIndexesList(newCorrectList)
      } else {
        const newCorrectList = [...correctAnswersIndexesList]
        if (!newCorrectList.includes(correctAnswerIndex)) {
          newCorrectList.push(correctAnswerIndex)
        }
        setCorrectAnswersIndexesList(newCorrectList)
      }
    } else {
      const newCorrectList = [correctAnswerIndex]
      setCorrectAnswersIndexesList(newCorrectList)
    }
  }
  function removeCorrectAnswer (answerIndex) {
    const newList = []
    for (const indexIndex in correctAnswersIndexesList) {
      if (correctAnswersIndexesList[indexIndex] !== answerIndex) {
        newList.push(correctAnswersIndexesList[indexIndex])
      }
    }
    setCorrectAnswersIndexesList(newList)
  }

  React.useEffect(() => {
    // console.log(`Has Multiple Answers: type: ${typeof hasMultipleAnswers} ${hasMultipleAnswers}`)
    if (typeof hasMultipleAnswers !== 'boolean') {
      if (hasMultipleAnswers === 'true') {
        setHasMultipleAnswers(true)
      } else {
        setHasMultipleAnswers(false)
      }
    }
  }, [hasMultipleAnswers])

  // If multiple, then allow selection for all
  // otherwise, handle change in secCorrect
  // Before submit, check for > 0 correct answers
  return (
  <>
    <br></br>
    Question: <input value={question} onChange={(e) => setQuestion(e.target.value)}/><br />
    Has Multiple Answers (Y/N): <select value={hasMultipleAnswers} onChange={(e) => setHasMultipleAnswers(e.target.value)}>
        <option value='true'>Y</option>
        <option value='false'>N</option>
    </select>
    <br />
    Duration: <input type='number' min={0} max={120} value={duration} onChange={(e) => setDuration(e.target.value)}/>seconds<br />
    Points: <input value={points} onChange={(e) => setPoints(e.target.value)}/><br />
    <UrlConvert url={url} setUrl={setUrl} setIsUrlValid={setIsUrlValid} setEmbedId={setEmbedId}/><br />
    {answersList.map((answer, index) => {
      return (<>
        Answer Space {index + 1}: <input value={answer} onChange={(e) => updateAnswerSpace(index, e.target.value)}/>
        {!correctAnswersIndexesList.includes(index) && <button onClick={() => { addCorrectAnswer(index) }}>Set Correct</button>}
        {correctAnswersIndexesList.includes(index) && <button onClick={() => { removeCorrectAnswer(index) }}>Remove Correct</button>}
        {answersList.length > 2 && <button onClick={() => { deleteAnswerSpace(index) }}>Delete this Answer Space</button>}
        <br />
      </>)
    })}
    {answersList.length < 6 && (
      <><button onClick={addAnswerSpace}>Add more answer space</button><br /></>
    )}
    <br></br>
    <button onClick={goToParentQuiz}>Cancel Upload Question</button>
    <button onClick={confirmQuestionInfo}>Confirm Upload Question</button>
  </>
  )
}

export default FormQuestion
