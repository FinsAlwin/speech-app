import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import AvatarMode from "./avatarMode";
import GameMode from "./gameMode";
import NormalMode from "./normalMode";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DropdownMenu = (props) => {
  const [mode, setMode] = useState();
  const [dropDown, setDropDown] = useState(true);

  const handleDropdown = () => {
    setDropDown(true);
    setMode(0);
  };

  const handleChange = (e) => {
    setMode(e);
    if (e) {
      props.call(true);
      props.callMode(e);
    }
  };

  return (
    <>
      {!mode && dropDown && (
        <div className="d-flex justify-content-center dropdownMenu">
          {/* <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Select Mode
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={() => handleChange(1)}>
                Avatar Mode
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => handleChange(2)}>
                Game Mode
              </Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => handleChange(3)}>
                Normal Mode
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
        </div>
      )}
      {mode == 1 && (
        <>
          <div className="backBtn" onClick={handleDropdown}>
            <FontAwesomeIcon icon={faArrowLeft} color="#b3e820" />
          </div>
          <AvatarMode />
        </>
      )}
      {mode == 2 && (
        <>
          <div className="backBtn" onClick={handleDropdown}>
            <FontAwesomeIcon icon={faArrowLeft} color="#b3e820" />
          </div>
          <GameMode />
        </>
      )}
      {mode == 3 && (
        <>
          <div className="backBtn" onClick={handleDropdown}>
            <FontAwesomeIcon icon={faArrowLeft} color="#b3e820" />
          </div>
          <NormalMode />
        </>
      )}
    </>
  );
};

export default DropdownMenu;
