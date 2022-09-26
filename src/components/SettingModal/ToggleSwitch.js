import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ autoPlayTimer, setAutoPlayTimer }) => {
  const toggleAutoPlay = () => {
    setAutoPlayTimer((current) => !current);
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        onChange={toggleAutoPlay}
        checked={autoPlayTimer}
      />

      <span className="slider rounded" />
    </label>
  );
};

export default ToggleSwitch;
