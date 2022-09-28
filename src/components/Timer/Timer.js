import React, { useState, useEffect } from "react";
import useSound from "use-sound";
import { ToastContainer, toast } from "react-toastify";
import "./style.css";
import "../SettingButton/SettingButton.css";
import "react-toastify/dist/ReactToastify.css";
import PauseSvg from "../svg/PauseSvg";
import PlaySvg from "../svg/PlaySvg";
import ResetSvg from "../svg/ResetSvg";
import PassSvg from "../svg/PassSvg";
import CheckSound from "./check-sound.mp3";
let interval = null;

const Timer = ({
  minutes,
  setMinutes,
  minutesBreak,
  seconds,
  setSeconds,
  preMinutes,
  autoPlayTimer,
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
      notif();
      song.play();
    }
    if (isBreakRunning === true && minutes < 0) {
      setIsBreakRunning(false);
      setMinutes(preMinutes);
      notifBrake();
      song.play();
    }
  }, [seconds]);

  function notif() {
    toast("focus time complete ! 🏆");
  }
  function notifBrake() {
    toast("Back to work! 💻");
  }

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

  return (
    <div>
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
                <div className="setting-svg">
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
                <div className="setting-svg">
                  <PlaySvg />
                </div>
              </button>
            )}
            <div className="setting-svg">
              {isBreakRunning ? (
                <PassSvg buttonPassTimer={() => passTimer()} />
              ) : (
                <ResetSvg buttonresetTimer={() => resetTimer()} />
              )}
            </div>
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
      </div>
    </div>
  );
};

export default Timer;
