import React, { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';


let interval = null
const Timer = () => {
  const [remainingTime, setRemainingTime] = useState(60);
  

  function startTimer() {
      interval = setInterval(() => {
      updateRemainingTime()
    }, 1000)
    
    
  }



  function pauseTimer() {
    clearInterval(interval)
    console.log("oui");
  }

  function updateRemainingTime() {
    setRemainingTime( (currRemainingTime) => currRemainingTime -1  )
    
  }

  function resetTimer() {
    setRemainingTime(60)
    clearInterval(interval)
    console.log("oui");

  }

  const {isPaused, setIsPaused} = useState(true)
  


  return (
    <div>
      <div className="pomodoro">
        <div className="p-container">
          <div className='time'>
          {remainingTime}
          </div> 
            <div className="buttons" >
            <button className='stop-button' onClick={() => pauseTimer()}>Pause</button>
            <button className="start-button" onClick={() => startTimer() }>Start</button>
            <button className="reset-button" onClick={() => resetTimer()} >Reset </button>
            </div>
        </div>
      </div>
    </div>
  );
  
};


export default Timer;
