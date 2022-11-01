import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuCard = (props) => {
  const handleClick = () => {
    props.click();
  };

  return (
    <>
      <div className="cardMenu shadow" onClick={handleClick}>
        <FontAwesomeIcon icon={props.icon} color={props.iconColor} size="2xl" />
      </div>
    </>
  );
};

export default MenuCard;
