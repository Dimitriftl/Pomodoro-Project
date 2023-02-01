import React from "react";
import "./TaskTodo.css";
import { ToastContainer, toast } from "react-toastify";
import PlusSvg from "../svg/PlusSvg";
import { useState } from "react";
import CheckSvg from "../svg/CheckSvg";
import { v4 as uuidv4 } from "uuid";
import Item from "./Item";

// TASK MODAL
const TaskTodo = ({
  numberOfPomodoroDone,
  key,
  id,
  txt,
  dataArr,
  setDataArr,
  itemIdSelected,
  setItemIdSelected,
}) => {
  const [taskModal, setTaskModal] = useState(false);

  const toggleTaskModal = () => {
    setTaskModal(!taskModal);
  };

  //

  // VALEUR DES ÉLEMENTS CRÉÉE
  // const [dataArr, setDataArr] = useState([
  //   {
  //     txt: "Task you want to focus on",
  //     id: uuidv4(),
  //     numberOfPomodoro: "1",
  //   },
  // ]);

  //

  // ID DES ÉLÉMENTS

  //

  const [stateInput, setStateInput] = useState("");
  const [pomoStateInput, setPomoStateInput] = useState("");

  // target la value des input

  const handleChangeTask = (event) => {
    setStateInput(event.target.value);
  };

  const handleChangePomo = (event) => {
    setPomoStateInput(event.target.value.replace(/\D/g, ""));
  };

  // HANDLECLICK FERME LA MODAL ET CRÉER UN NOUVELLE ÉLÉMENTS AVEC LA VALEUR DEDANS

  function missInput() {
    toast("There's a miss Input ❌ ");
  }

  const handleClick = () => {
    if (stateInput.trim().length !== 0 && pomoStateInput.trim().length !== 0) {
      toggleTaskModal();
      addTodo();
      return "";
    } else {
      missInput();
    }
  };

  //

  // SUPPRIMER UN ELEMENT ---------------------
  const deleteElement = (id) => {
    const filteredState = dataArr.filter((item) => {
      return item.id !== id;
    });
    setDataArr(filteredState);
  };
  //

  // 1ER INPUT DE LA MODAL TASK
  const linkedInput = (e) => {
    setStateInput(e);
  };
  //

  // 2EME INPUT DE LA MODAL TASK

  const pomoLinkedInput = (e) => {
    setPomoStateInput(e);
  };
  //

  // AJOUTER TASK A FAIRE -------------------------

  const addTodo = () => {
    const newArr = [...dataArr];
    const newTodo = {};
    newTodo.txt = stateInput;
    newTodo.id = uuidv4();
    newTodo.numberOfPomodoro = pomoStateInput;
    newTodo.numberOfPomodoroDone = 0;
    newArr.push(newTodo);
    setDataArr(newArr);
    setStateInput("");
    setPomoStateInput("");
    console.log("non", stateInput, pomoStateInput);
  };

  const cutString = (str, num) => { 
    if(str.length > num) {
        return str.slice(0, num) + "..."
    } else {
        return str; 
    }
}

  //

  return (
    <div className="taskContainer">
      <div className="taskHeader">
        <h3>Task to focus on.</h3>
      </div>
      <div className="taskButtonContainer">
        <div className="taskButton" onClick={toggleTaskModal}>
          <p>New Task</p>
          <div className="svgs">
            <PlusSvg />
          </div>
        </div>
        {taskModal && (
          <div className="taskModal">
            <div className="taskModalContent">
              <div className="taskModalText">
                <input
                  type="text"
                  value={stateInput}
                  placeholder="What's your task ?"
                  onInput={(e) => linkedInput(e.target.value)}
                  onChange={handleChangeTask}
                />
              </div>
              <div className="taskModalnumber">
                <input
                  type="text"
                  value={pomoStateInput}
                  placeholder="How much Pomodoros ?"
                  onInput={(e) => pomoLinkedInput(e.target.value)}
                  onChange={handleChangePomo}
                />
              </div>
              <div className="taskButtonsContainer">
              <button
                className="cancelButton"
                onClick={() => {
                  toggleTaskModal();
                }}
              >
                cancel
              </button>
              <button
                className="saveButton"
                onClick={() => {
                  handleClick();
                }}
              >
                Create
              </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="taskContentContainer">
        {dataArr.map((item) => {
          return (
            <Item
              txt={item.txt}
              numberOfPomodoro={item.numberOfPomodoro}
              key={item.id}
              id={item.id}
              delFunc={deleteElement}
              dataArrSetState={setDataArr}
              dataArrState={dataArr}
              setItemIdSelected={setItemIdSelected}
              itemIdSelected={itemIdSelected}
              numberOfPomodoroDone={item.numberOfPomodoroDone}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TaskTodo;
