import React, { useEffect, useState } from "react";
import Details from "../../components/User/details";
import { useSelector, useDispatch } from "react-redux";
import Admin from "../../components/Admin";

const UserHomeScreen = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {user.userType == 0 && <Details />}
      {user.userType == 1 && <Admin />}
      {/* <Admin /> */}
    </>
  );
};

export default UserHomeScreen;
