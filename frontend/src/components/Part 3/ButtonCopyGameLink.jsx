import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonCopyGameLink (quiz) {
  const originalQuiz = quiz.quiz
  const currentQuizActiveSessionId = originalQuiz.active
  const link = `/admin/quiz/${originalQuiz.id}/advance/${currentQuizActiveSessionId}`

  const navigate = useNavigate()

  // Since unsecured, used the workaround method provided by:
  // https://stackoverflow.com/questions/71873824/copy-text-to-clipboard-cannot-read-properties-of-undefined-reading-writetext
  function copyLink () {
    const unsecuredCopy = (text) => {
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
      } catch (err) {
        alert(err)
      }
      document.body.removeChild(textArea)
    }
    navigate(`/play/join/${currentQuizActiveSessionId}`)
    const pageLink = window.location.href
    navigate('/dashboard')
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(pageLink)
    } else {
      unsecuredCopy(pageLink)
    }
    alert(`Successfully copied link: ${pageLink}`)
  }

  function goToGame () {
    navigate(link)
  }

  return (<>
    <button onClick={copyLink}>Copy Game Link</button>
    <button onClick={goToGame}>Go to advance the game</button>
  </>)
}

export default ButtonCopyGameLink
