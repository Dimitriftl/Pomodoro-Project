import React, { useState } from "react";
import Timer from "../components/Timer/Timer";
// import SignUpModal from "../components/SignUpModal/SignUpModal";
// import SignInModal from "../components/SignInModal/SignInModal";
import "./Home.css";
import TaskTodo from "../components/TaskTodo/TaskTodo";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState(0);
  const [minutesBreak, setMinutesBreak] = useState(1);
  const [preMinutes, setPreMinutes] = useState(1);
  const [autoPlayTimer, setAutoPlayTimer] = useState(false);
  const [numberOfPomodoroDone, setNumberOfPomodoroDone] = useState(0);

  const [dataArr, setDataArr] = useState([
    {
      txt: "Task you want to focus on",
      id: uuidv4(),
      numberOfPomodoroDone: 0,
      numberOfPomodoro: 1
    },
  ]);

  const cutString = (str, num) => { 
    if(str?.length > num) {
        return str.slice(0, num) + "..."
    } else {
        return str; 
    }
}


  console.log(uuidv4());

  const [itemIdSelected, setItemIdSelected] = useState("");

  return (
    <div className="home">
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
        numberOfPomodoroDone={numberOfPomodoroDone}
        setNumberOfPomodoroDone={setNumberOfPomodoroDone}
        dataArr={dataArr}
        setDataArr={setDataArr}
        key={dataArr.id}
        id={dataArr.id}
        itemIdSelected={itemIdSelected}
        setItemIdSelected={setItemIdSelected}
      />
      <TaskTodo
        numberOfPomodoroDone={numberOfPomodoroDone}
        setNumberOfPomodoroDone={setNumberOfPomodoroDone}
        dataArr={dataArr}
        setDataArr={setDataArr}
        txt={dataArr.txt}
        numberOfPomodoro={dataArr.numberOfPomodoro}
        key={dataArr.id}
        id={dataArr.id}
        itemIdSelected={itemIdSelected}
        setItemIdSelected={setItemIdSelected}
        // delFunc={deleteElement}
        dataArrSetState={setDataArr}
        dataArrState={dataArr}
      />
      {/* <SignInModal />
      <SignUpModal /> */}
    </div>
  );
};

export default Home;
