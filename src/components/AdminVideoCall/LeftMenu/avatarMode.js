import React, { useState } from "react";
import { Dropdown, ButtonGroup, DropdownButton } from "react-bootstrap";

const AvatarMode = () => {
  const [avatar, setAvatar] = useState();
  const [background, setBackground] = useState();

  const handleAvatar = (e) => {
    setAvatar(e);
  };

  const handleBackground = (e) => {
    setBackground(e);
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <h5>Avatar Mode</h5>
      </div>
      <div className="d-flex justify-content-center dropdownMenu">
        {[DropdownButton].map((DropdownType, idx) => (
          <DropdownType
            as={ButtonGroup}
            key={idx}
            id={`dropdown-button-drop-${idx}`}
            size="sm"
            variant="secondary"
            title="Select Character"
          >
            <Dropdown.Item
              eventKey="1"
              as="button"
              onClick={() => handleAvatar(1)}
            >
              Avatar 1
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              as="button"
              onClick={() => handleAvatar(2)}
            >
              Avatar 2
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              as="button"
              onClick={() => handleAvatar(3)}
            >
              Avatar 3
            </Dropdown.Item>
          </DropdownType>
        ))}
      </div>
      <div className="d-flex justify-content-center dropdownMenu">
        {[DropdownButton].map((DropdownType, idx) => (
          <DropdownType
            as={ButtonGroup}
            key={idx}
            id={`dropdown-button-drop-${idx}`}
            size="sm"
            variant="secondary"
            title="Select Background"
          >
            <Dropdown.Item
              eventKey="1"
              as="button"
              onClick={() => handleBackground(1)}
            >
              Background 1
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="2"
              as="button"
              onClick={() => handleBackground(2)}
            >
              Background 2
            </Dropdown.Item>
            <Dropdown.Item
              eventKey="3"
              as="button"
              onClick={() => handleBackground(3)}
            >
              Background 3
            </Dropdown.Item>
          </DropdownType>
        ))}
      </div>
    </>
  );
};

export default AvatarMode;
