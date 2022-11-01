import React, { useState } from "react";
import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";

const GameMode = () => {
  const [game, setGame] = useState();

  const handleGame = (e) => {
    setGame(e);
  };
  return (
    <>
      <div className="d-flex justify-content-center">
        <h5>Game Mode</h5>
      </div>
      <div className="d-flex justify-content-center dropdownMenu">
        {[DropdownButton].map((DropdownType, idx) => (
          <DropdownType
            as={ButtonGroup}
            key={idx}
            id={`dropdown-button-drop-${idx}`}
            size="sm"
            variant="secondary"
            title="Select Game"
          >
            <Dropdown.Item
              eventKey="1"
              as="button"
              onClick={() => handleGame(1)}
            >
              Game 1
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              as="button"
              onClick={() => handleGame(2)}
            >
              Game 2
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              as="button"
              onClick={() => handleGame(3)}
            >
              Game 3
            </Dropdown.Item>
          </DropdownType>
        ))}
      </div>
    </>
  );
};

export default GameMode;
