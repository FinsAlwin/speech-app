import React, { useState, useEffect, useRef } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import FooterNav from "../layouts/footerNav";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

const FullLayout = () => {
  const isLoggedIn = localStorage.getItem("loggedIn");
  const user = JSON.parse(localStorage.getItem("user"));
  const { authenticate } = useSelector((state) => state.user);

  return (
    <>
      {(isLoggedIn || authenticate) && (
        <>
          {user?.userType == 0 && (
            <main>
              <div className="mainContainer">
                <Outlet />
              </div>

              <FooterNav />
            </main>
          )}
          {user?.userType == 1 && (
            <main>
              <div className="mainContainer">
                <Outlet />
              </div>
            </main>
          )}
        </>
      )}
      {/* <>
        {user?.userType == 0 && (
          <main>
            <div className="mainContainer">
              <Outlet />
            </div>

            <FooterNav />
          </main>
        )}
        {user?.userType == 1 && (
          <main>
            <div className="mainContainer">
              <Outlet />
            </div>
          </main>
        )}
      </> */}

      {!isLoggedIn && !authenticate && <Navigate to="/login" />}
    </>
  );
};

export default FullLayout;
