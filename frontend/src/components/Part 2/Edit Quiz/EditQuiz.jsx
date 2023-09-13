import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { ApiCall, processImage } from '../../../helpers';
import ButtonEditQuestion from './Edit_Question/ButtonEditQuestion';
import ButtonDeleteQuestion from './ButtonDeleteQuestion';
import ButtonAddNewQuestion from './ButtonAddNewQuestion';
import YoutubeEmbed from './YoutubeEmbed';

function EditQuiz () {
  const [quizInfo, setQuizInfo] = React.useState({});
  const [name, setName] = React.useState('')
  const [thumbnail, setThumbnail] = React.useState('')
  const [imgUrl, setImgUrl] = React.useState('')
  const [isQuestionCreated, setIsQuestionCreated] = React.useState(false);
  const [isQuestionDeleted, setIsQuestionDeleted] = React.useState(false);
  const navigate = useNavigate();
  const param = useParams();
  const quizToEditId = param.quizId

  function getQuizInfo (data) {
    console.log(data)
    setQuizInfo(data)
    setName(data.name)
  }

  // 1. Get the quiz
  React.useEffect(async () => {
    await ApiCall('GET', `/admin/quiz/${quizToEditId}`, '', getQuizInfo);
  }, [isQuestionCreated, isQuestionDeleted]);

  // 2. Display data in form

  // 3. For each question add edit button

  // 4. Confirm Edit button
  function successFulEdit () {
    alert('Quiz updated successfully')
  }

  async function confirmEdit () {
    const payload = {
      name,
      thumbnail,
    }
    if (thumbnail !== '' && thumbnail !== null) {
      const response = await processImage(imgUrl);
      if (response) {
        payload.thumbnail = response;
        ApiCall('PUT', `/admin/quiz/${quizToEditId}`, payload, successFulEdit);
        navigate('/dashboard');
      }
    } else {
      console.log('No thumbnail updates')
      ApiCall('PUT', `/admin/quiz/${quizToEditId}`, payload, successFulEdit);
      navigate('/dashboard');
    }
    // console.log('At confirm: payload: ', payload);
  }

  return (
    <>
      <button onClick={() => { navigate('/dashboard') }}>Cancel Edit</button>
      <br />
      <ButtonAddNewQuestion
        isQuestionCreated={isQuestionCreated}
        setIsQuestionCreated={setIsQuestionCreated}
      />
      <br />
      New Name: <input value={name} onChange={(e) => setName(e.target.value)}/><br />
      New Thumbnail: <input type='file' value={thumbnail} onChange={(e) => { setThumbnail(e.target.value); setImgUrl(e.target.files[0]) } }/><br />
      <br />
      {quizInfo.questions && quizInfo.questions.map(question => (
      <>
        <>Question: {question.question}</><br />
        <>Has multiple answers: {question.hasMultipleAnswers}</><br />
        <>Question Duration: {question.duration}</><br />
        <>Points: {question.points}</><br />
        <>
        {typeof question.url !== 'undefined'
          ? question.url !== undefined && question.url.includes('data:image') && question.url.includes(';base64,')
            ? <>Image: <img width={'150px'} height={'150px'} src={`${question.url}`}/></>
            : <>Video:<br /><YoutubeEmbed embedId={question.videoEmbedId} /></>
          : 'No provided link or image'
        }</><br />
        {/* <>{question.answersList.map((answer, index) => {
          <>Answer {index + 1}: {answer}</>
        })}</><br /> */}
        <>Answers: {question.answersList}</>
        <ButtonDeleteQuestion
          question={question}
          quizInfo={quizInfo}
          quizId={quizToEditId}
          isQuestionDeleted={isQuestionDeleted}
          setIsQuestionDeleted={setIsQuestionDeleted}
        />
        <ButtonEditQuestion
          currentQuizId={quizToEditId}
          question={question}
        />
        <br />
      </>
      ))}
      <br />
      <button onClick={confirmEdit}>Confirm Edit Quiz</button>
    </>
  )
}

export default EditQuiz
