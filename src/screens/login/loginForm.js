import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/User/action";
import { Navigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { authenticate } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    if (username && password) {
      const payload = {
        username: username,
        password: password,
      };
      dispatch(login(payload));
    }
  };

  if (authenticate) {
    return <Navigate to={`/home`} />;
  }

  return (
    <>
      <div className="loginFormContainer shadow-lg">
        <div className="logoContainer">
          <img
            src="https://picsum.photos/200"
            alt="logo"
            className="img-thumbnail"
          ></img>
        </div>

        <div className="formContainer">
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                onChange={handleUsername}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={handlePassword}
              />
            </Form.Group>
            {username && password && (
              <Button variant="primary" onClick={handleLogin}>
                Login
              </Button>
            )}
          </Form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
