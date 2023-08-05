import React, { useEffect, useState } from "react";
import { Col,  Row, Tab,Tabs,Form,Button,Modal } from "react-bootstrap";
import LeftSidebar from "../../../../src/components/LeftSidebar"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; 

import axios from "axios";

const Login = () => {
    const [modelshow, setModelShow] = useState(false);
    const navigate = useNavigate();
    
     

    const onSubmitRegistarForm = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
       let frm = Object.fromEntries(formData.entries())
        console.log(frm);
       let postData={
          "id":frm.id,
          "name":frm.name,
          "email":frm.email,
          "password":frm.password,
        }
        
      
    
       
        var url = process.env.REACT_APP_LARAVEL_AUTH_API_URL + "user/registration/create";
        // var token = localStorage.getItem("platformDashToken");
        await axios
          .post(url,postData)
          .then(( response ) => {
            console.log(response);
            if (response.status === 200) {
              setModelShow(true);
            }
          })
          // .catch((error) => {
          //   console.log(error);
          // });
      };

      const onSubmitLoginForm = async (e) => {
        e.preventDefault();
       const formData = new FormData(e.target)
      let frm = Object.fromEntries(formData.entries())
    
        console.log(frm);
        let postData={
          "email":frm.email,
          "password":frm.password,
          "device_name": "web",
    
        }
        var url = process.env.REACT_APP_LARAVEL_AUTH_API_URL + "session/login";
        // var token = localStorage.getItem("platformDashToken");
        await axios
          .post(url, postData)
          .then(( response ) => {
            console.log(response);
            if (response.status === 200) {
              setModelShow(true);
              navigate("/select-subject");

            }
          })
          // .catch((error) => {
          //   console.log(error);
          // });
      };



    return(

    <>
        <Row className="login-registration-wrapper">
            <Col className="p-0" md={4}>
                <LeftSidebar/>
            </Col>

            <Col className="p-0" md={8}>
                <div className="subject-categories d-flex w-100 h-100 flex-column">
                    <div className="subject-heading">
                        <h1>Sign In/ Sign Up</h1>
                    </div>
                    <div className="subject-btn-group">
                        <Tabs
                            defaultActiveKey="profile"
                            id="uncontrolled-tab-example"
                            className="mb-3"
                            >
                            <Tab eventKey="home" title="Login">
                                <Form onSubmit={onSubmitLoginForm}>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control 
                                        type="email" 
                                        name="email" 
                                        placeholder="Enter email" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="password" placeholder="Password" />
                                        <Form.Text className="text-muted">
                                            Password combination of letter,numbers and symbols.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                    Login
                                    </Button>
                                    {/* <Link className="btn btn-success">Login</Link> */}
                                </Form>
                            </Tab>



                            <Tab eventKey="profile" title="Registration">
                                <Form onSubmit={onSubmitRegistarForm}>
                                    <Form.Group className="mb-3" >
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type="text"   name="name" placeholder="Enter Name" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" name="email" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" name="password"  />
                                        <Form.Text className="text-muted">
                                            Password combination of letter,numbers and symbols.
                                        </Form.Text>
                                    </Form.Group>
                                    <Button className="btn btn-success"  type="submit">
                                    Register
                                    </Button>
                                    {/* <Link className="btn btn-success">Register</Link> */}
                                </Form>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </Col>
        </Row>
        {modelshow ? (
        <Modal show={modelshow}>
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
            <button
              className="btn-close"
              aria-label="Close"
              onClick={() => setModelShow(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>User Registration Successfully!!!</Modal.Body>
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
    )
}

export default Login;