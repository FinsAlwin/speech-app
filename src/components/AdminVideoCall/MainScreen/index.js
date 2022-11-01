import React from "react";
import MenuCard from "./card";
import "./style.css";
import { faVideo, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
const MainScreen = (props) => {
  const navigate = useNavigate();
  const handleVideoCall = () => {
    navigate("/video-sessions");
  };

  const handleGame = () => {
    console.log("game");
  };
  return (
    <div className="box shadow">
      <MenuCard icon={faVideo} click={handleVideoCall} iconColor={"#0096FF"} />
      <MenuCard icon={faGamepad} click={handleGame} iconColor={"#E23915"} />
    </div>
  );
};

export default MainScreen;
