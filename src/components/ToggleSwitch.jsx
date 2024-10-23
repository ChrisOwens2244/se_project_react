import React, { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";

const ToggleSwitch = () => {
  //   const [currentTemperatureUnit, handleToggleSwitchChange] = useState("F");

  //   const handleChange = (e) => {
  //     if (currentTemperatureUnit === "C") handleToggleSwitchChange("F");
  //     if (currentTemperatureUnit === "F") handleToggleSwitchChange("C");
  //   };

  const { currentTemperatureUnit, handleToggleSwitchChange } = useContext(
    CurrentTemperatureUnitContext
  );

  return (
    <label className="switch">
      <input
        type="checkbox"
        className="switch__box"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
          currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-f"
            : "switch__slider switch__slider-c"
        }
      />
      <p
        className={`switch__temp-f ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp-c ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
  );
};

export default ToggleSwitch;
