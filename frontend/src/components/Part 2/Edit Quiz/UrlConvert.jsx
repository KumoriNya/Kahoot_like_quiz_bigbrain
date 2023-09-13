import React from 'react'

import { processImage } from '../../../helpers'

function UrlConvert ({ url, setUrl, setIsUrlValid, setEmbedId }) {
  // const [url, setUrl] = React.useState('')
  const [isInputVideo, setIsInputVideo] = React.useState(true)
  async function confirmUploadInfo () {
    let embedId = ''
    if (isInputVideo) {
      if (url.includes('youtu.be/')) {
        embedId = url.split('/')[url.split('/').length - 1]
        console.log(embedId)
        setIsUrlValid(true)
      } else if (url.includes('www.youtube.com/watch?v=')) {
        embedId = url.split('=')[1]
        console.log(embedId)
        setIsUrlValid(true)
      } else {
        alert('We don\'t support this version of link')
        setIsUrlValid(false)
      }
      console.log(url)
    } else {
      console.log(`type of ${typeof url}`)
      if (url !== '') {
        // If url is already set in the correct format, do nothing
        if (typeof url !== 'object' && url.includes('data:image') && url.includes(';base64,')) {
          setIsUrlValid(true)
          embedId = ''
        // If url is set to be the file path for the first time, convert
        } else {
          const response = await processImage(url);
          console.log(response)
          if (response.includes('data:image') && response.includes(';base64,')) {
            setIsUrlValid(true)
            setUrl(response)
            embedId = ''
          } else {
            setIsUrlValid(false)
          }
        }
      } else {
        setIsUrlValid(false)
        embedId = ''
      }
    }
    setEmbedId(embedId)
  }
  return (
  <>
    {isInputVideo && ('Url: ')}{isInputVideo && (<input type='url' value={url} onChange={(e) => { setUrl(e.target.value); setIsUrlValid(false) }}/>)}
    {!isInputVideo && ('Image: ')}{!isInputVideo && (<input type='file' onChange={(e) => setUrl(e.target.files[0])}/>)}
    <button onClick={() => { setIsInputVideo(!isInputVideo) }}>{isInputVideo && ('Upload Image')}{!isInputVideo && ('Add Url Link')}</button>
    <button onClick={confirmUploadInfo}>Confirm</button>
  </>)
}

export default UrlConvert
