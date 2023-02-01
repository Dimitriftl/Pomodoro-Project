import React from "react";
import { useState } from "react";
import TrashSvg from "../svg/TrashSvg";

const Item = ({
  txt,
  numberOfPomodoro,
  key,
  id,
  delFunc,
  dataArrSetState,
  dataArrState,
  setItemIdSelected,
  itemIdSelected,
  numberOfPomodoroDone
}) => {
  const handleClick = () => {
    // 👇️ toggle isActive state on click

    // setItemIdSelected c'est l'id de l'élément qu'on déjà sélectionné et id c'est l'id de cului qu'on va séléctionner
    setItemIdSelected(id);

    console.log(itemIdSelected);

    // ce que dit ce if c'est que si l'id qu'on a déjà séléctionné est = à l'id qu'on va séléctionné alors tu lui attibut l'id -1 ce qui va enlever la classe sur l'élément actuelle puisque son id n'est pas = à -1

    if (itemIdSelected === id) {
      setItemIdSelected(-1);
      // console.log("id-1");
    }
  };

  const cutString = (str, num) => { 
    if(str?.length > num) {
        return str.slice(0, num) + "..."
    } else {
        return str; 
    }
}

  return (
    <div>
      <div className="taskContent" onClick={handleClick}>
        <div className="leftTaskContent">
          <div className={itemIdSelected === id ? "focusContainer" : ""}></div>
          <div className="leftTaskContentText">
            <h4>{cutString(txt, 30)}</h4>
            {/* window.innewith */}
          </div>
        </div>
        <div className="rightTaskContent">
          <p>
            {` ${
               numberOfPomodoroDone + "/" + numberOfPomodoro
            }`}
          </p>
          <button onClick={() => delFunc(id)}>
            <TrashSvg />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Item;
