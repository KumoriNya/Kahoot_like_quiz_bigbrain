import React from 'react';

function Timer ({ stopBy, setInTime }) {
  const [seconds, setSeconds] = React.useState('')
  React.useEffect(() => {
    const dif = parseInt((new Date(stopBy) - new Date()) / 1000, 10)
    setSeconds(dif)
    const interval = window.setInterval(() => {
      if (seconds !== 0) {
        setSeconds(seconds => seconds - 1)
      }
    }, 1000);
    console.log(interval)
    // return () => clearInterval(interval)
  }, [])
  React.useEffect(() => {
    if (seconds === 0) {
      setInTime(false)
    }
  }, [seconds])
  return (
    <>
      <p>Time Remaining:</p>
      <p>{seconds} seconds</p>
    </>
  )
}

export default Timer;
