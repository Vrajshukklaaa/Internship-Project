import React, { useEffect, useState } from "react";

import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [modelshow, setModelShow] = useState(false);
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  useEffect(() => {}, []);
  
  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setForm({ ...form, [name]: value });
  };

  const onSubmit = async (event) => {
   event.preventDefault();
    if (form.email === "" || form.password === "") {
      setError("Please Enter Email Address and Password!!!");
      setModelShow(true);
    } else if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      setModelShow(true);
    } else {
      try {
        var url = process.env.REACT_APP_LARAVEL_AUTH_API_URL + "session/login";
        await axios
          .post(url, {
            email: form.email,
            password: form.password,
            device_name: "web",
          })
          .then((response) => { 
            console.log(response);
            if (response.status === 200) {
              if (response.data.token) {
                localStorage.setItem("platformDashToken", response.data.token);
                navigate("/admin/users");
              }
            } else {
              setError("Something Went Wrong!!!");
              setModelShow(true);
            }
          })
          .catch((error) => {
            if (error.response.status === 401) {
              setError("Invalid username/password. Try again!");
              setModelShow(true);
            } else {
              setError("Something Went Wrong!!!");
              setModelShow(true);
            }
          });
      } catch (error) {
        if (error.statusCode === 401) {
          setError("Invalid username/password. Try again!");
          setModelShow(true);
        } else {
          setError("Something Went Wrong!!!");
          setModelShow(true);
        }
      }
    }
  };
  return (
    <>
      <div className="page-main-head align-items-center d-flex w-100 justify-content-center h-100vh flex-column">
        <Row className="">
          <Col>
            <Card>
              <Card.Header as="h5">Login</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="email"
                      value={form.email}
                      onChange={onFormInputChange}
                      name="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={form.password}
                      onChange={onFormInputChange}
                      placeholder="Password"
                      name="password"
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="btn btn-primary btn-no-icon"
                    onClick={onSubmit}
                  >
                    Log In
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      {modelshow ? (
        <Modal show={modelshow}>
          <Modal.Header>
            <Modal.Title>Alert</Modal.Title>
            <button
              className="btn-close"
              aria-label="Close"
              onClick={() => setModelShow(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>Invalid username or password</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModelShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default Login;
