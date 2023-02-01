import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { ToastContainer, toast } from "react-toastify";
import "./Timer.css";
import "../SettingButton/SettingButton.css";
import "react-toastify/dist/ReactToastify.css";
import PauseSvg from "../svg/PauseSvg";
import PlaySvg from "../svg/PlaySvg";
import ResetSvg from "../svg/ResetSvg";
import PassSvg from "../svg/PassSvg";
import CheckSound from "./check-sound.mp3";
import SettingModal from "../SettingModal/SettingModal";
let interval = null;

const Timer = ({
  minutes,
  setMinutes,
  minutesBreak,
  seconds,
  setSeconds,
  preMinutes,
  autoPlayTimer,
  setPreMinutes,
  setAutoPlayTimer,
  setMinutesBreak,
  numberOfPomodoroDone,
  setNumberOfPomodoroDone,
  numberOfPomodoro,
  key,
  id,
  itemIdSelected,
  setItemIdSelected,
  setDataArr,
  dataArr,
}) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const timerSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const [isBreakRunning, setIsBreakRunning] = useState(false);
  let song = new Audio(CheckSound);

  useEffect(() => {
    if (preMinutes) {
      setMinutes(preMinutes);
    }
  }, [preMinutes]);

  function startTimer() {
    setIsTimerRunning(true);
    if (seconds === 0) {
      setSeconds(59);
      setMinutes((minutes) => minutes - 1);
    }
    interval = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
  }

  // ici useEffect dépend de second en effet il va se lancer dè qu'une seconde sera retiré
  useEffect(() => {
    let interval = setInterval(() => {
      clearInterval(interval);
      if (seconds === 0 && isTimerRunning) {
        setSeconds(59);
        setMinutes((minutes) => minutes - 1);
      }
    }, 1000);

    if (minutes < 0) {
      if (!autoPlayTimer) {
        pauseTimer();
      }
      setMinutes(minutesBreak);
      setSeconds(0);
    }

    if (isBreakRunning === false && minutes < 0) {
      setIsBreakRunning(true);
      setSeconds(0);
      setMinutes(minutesBreak);

      // Ici dataArr .filter filtre le tableau dataArr pour garder les items pas séléctionnés on regarde l'item qui n'est pas = a l'id de l'item selectionné, puis, on rajoute un élément on tableau que l'on a recuperé via filter. lélément que l'on rajoute aura les mêmes propriétés que l'item séléctionné (l'item que l'on na pas inclut dans le tableau via la methode filter),avec comme seul différence son nombre de pomodoro éffectué que l'on incrémente de 1.
      if (itemIdSelected) {
        setDataArr([
          ...dataArr.filter((item) => itemIdSelected !== item.id),
          {
            ...dataArr.find((item) => itemIdSelected === item.id),
            numberOfPomodoroDone:
              dataArr.find((item) => itemIdSelected === item.id)
                .numberOfPomodoroDone + 1,
          },
        ]);
      }

      console.log(dataArr.filter((item) => itemIdSelected !== item.id));
      notif();
      song.play();
    }
    if (isBreakRunning === true && minutes < 0) {
      setIsBreakRunning(false);
      setMinutes(preMinutes);
      notifBrake();
      song.play();
    }
    if (isTimerRunning) {
      document.title = `${timerMinutes}:${timerSeconds} Pomodoro Timer`;
    } else {
      document.title = `Pomodoro Timer`;
    }
  }, [seconds]);

  // NOTIF

  function notif() {
    toast("focus time complete ! 🏆");
  }
  function notifBrake() {
    toast("Back to work! 💻");
  }

  //

  // BUTTON TIMER

  function pauseTimer() {
    setIsTimerRunning(false);
    clearInterval(interval);
  }

  function resetTimer() {
    setIsTimerRunning(false);
    clearInterval(interval);
    setMinutes(preMinutes);
    setSeconds(0);
  }

  function passTimer() {
    setIsBreakRunning(false);
    clearInterval(interval);
    setMinutes(preMinutes);
    setSeconds(0);
  }

  //

  return (
    <div className="pomodoroContainer">
      <ToastContainer theme="dark" />
      <div className="pomodoro">
        <div className={isBreakRunning ? "p-container-break" : "p-container"}>
          <div className="time">
            {timerMinutes} : {timerSeconds}
          </div>
          <div className="buttons">
            {isTimerRunning ? (
              <button
                className="stop-button"
                onClick={() => {
                  pauseTimer();
                  isTimerRunning(false);
                }}
              >
                <div className="svgs">
                  <PauseSvg />
                </div>
              </button>
            ) : (
              <button
                className="start-button"
                onClick={() => {
                  startTimer();
                  isTimerRunning(false);
                }}
              >
                <div className="svgs">
                  <PlaySvg />
                </div>
              </button>
            )}
              {isBreakRunning ? (
                <PassSvg buttonPassTimer={() => passTimer()} />
              ) : (
                <ResetSvg buttonresetTimer={() => resetTimer()} />
              )}
                
          </div>
          <div className="toggle-sentence">
            <p>
              {" "}
              {isBreakRunning
                ? "It's time for a break, good job !"
                : "It's focus time !"}{" "}
            </p>
          </div>
        </div>
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

export default Timer;
