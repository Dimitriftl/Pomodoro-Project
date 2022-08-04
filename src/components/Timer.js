import React, { useState, useEffect } from 'react';

const defaultRemainingTime = {
  seconds : '00',
  minutes : '00'
}


const Timer = () => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime()
    }, 1000)
    return () => clearTimeout(intervalId)
  }, [])

  function updateRemainingTime() {
    console.log("ton frere");
  
  }


  return (
    
    <div>
      <div className="pomodoro">
        <div className="p-container">
          <div className='time'>
          {remainingTime.minutes},{remainingTime.seconds}
          </div> 
            <div className="buttons">
                <button className="button-primary">Start</button>
                <button className="button-secondary">Reset</button>
            </div>
        </div>
      </div>
    </div>
  );
  
};


export default Timer;
