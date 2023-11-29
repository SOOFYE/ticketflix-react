import React from 'react'
import { useTimer } from 'react-timer-hook';
import '../../assets/timer.css';

function Timer({setExpireModal}) {
    const time = new Date();
    let expiryTimestamp = time.setSeconds(time.getSeconds() + 120); // 10 minutes timer
    const {
        seconds,
        minutes,
      } = useTimer({ expiryTimestamp: expiryTimestamp, onExpire: () => setExpireModal(true) });
  return (
    <div className='timerstats'>
    Time Left: <span>{minutes}</span>:<span>{seconds}</span>
  </div>
  )
}

export default Timer