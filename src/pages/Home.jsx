import React, { useState } from "react";
import SettingModal from "../components/SettingModal/SettingModal";
import Timer from "../components/Timer/Timer";
import "./Home.css";

const Home = () => {
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutesBreak, setMinutesBreak] = useState(5);
  const [preMinutes, setPreMinutes] = useState(25);
  const [autoPlayTimer, setAutoPlayTimer] = useState(false);

  return (
    <div className="body">
      <div className="header">
        <h1 className="first-title">Dimitri's Pomodoro</h1>
      </div>
      <div className="container">
        <Timer
          minutes={minutes}
          setMinutes={setMinutes}
          minutesBreak={minutesBreak}
          setMinutesBreak={setMinutesBreak}
          seconds={seconds}
          setSeconds={setSeconds}
          preMinutes={preMinutes}
          setPreMinutes={setPreMinutes}
          autoPlayTimer={autoPlayTimer}
          setAutoPlayTimer={setAutoPlayTimer}
        />
        <SettingModal
          setMinutes={setMinutes}
          minutes={minutes}
          minutesBreak={minutesBreak}
          setMinutesBreak={setMinutesBreak}
          preMinutes={preMinutes}
          setPreMinutes={setPreMinutes}
          autoPlayTimer={autoPlayTimer}
          setAutoPlayTimer={setAutoPlayTimer}
        />
      </div>
    </div>
  );
};

export default Home;
