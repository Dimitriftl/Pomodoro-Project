import React from "react";
import { useState } from "react";
import SettingButton from "../SettingButton/SettingButton";
import "./SettingModal.css";
import CheckSvg from "../svg/CheckSvg";
import ToggleSwitch from "./ToggleSwitch";

const Settings = ({
  setMinutesBreak,
  minutesBreak,
  preMinutes,
  setPreMinutes,
  autoPlayTimer,
  setAutoPlayTimer,
}) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleChange = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setPreMinutes(result);
  };

  const handleChangeBreak = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setMinutesBreak(result);
  };

  return (
    <div>
      <SettingButton onClick={toggleModal} />
      {modal && (
        <div className="modal-Setting">
          <div className="overlay"></div>
          <div className="modal-content">
            <button className="btn-close-modal" onClick={toggleModal}>
              <div className="check-svg">
                <CheckSvg />
              </div>
            </button>
            <h3 className="setting-title">Settings</h3>
            <form>
              <div className="input-settings">
                <div className="first-input">
                  <p>Focus</p>
                  <input
                    type="text"
                    className="input"
                    name="Focus"
                    onChange={handleChange}
                    value={preMinutes}
                  />
                </div>
                <div className="second-input">
                  <p>Break</p>
                  <input
                    type="string"
                    className="input"
                    name="Break"
                    onChange={handleChangeBreak}
                    value={minutesBreak}
                  />
                </div>
              </div>
            </form>
            <ToggleSwitch
              autoPlayTimer={autoPlayTimer}
              setAutoPlayTimer={setAutoPlayTimer}
            />
            <p className="auto-start">Auto start Pomodoros ?</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
