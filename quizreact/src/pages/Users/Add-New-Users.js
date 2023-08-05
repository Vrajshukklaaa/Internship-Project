import React, { useEffect, useState } from "react";
import { Card, Row, Col, Form, Button,Modal } from "react-bootstrap";
import Sidebar from '../../components/SideBar';
import axios from "axios";
import { useNavigate } from "react-router-dom";



const AddNewProperties = () => {
  const navigate = useNavigate();
  const [modelshow, setModelShow] = useState(false);

  const onSubmitForm = async (e) => {
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
    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "user/create";
    var token = localStorage.getItem("platformDashToken");
    await axios
      .post(url, postData,  { headers: { Authorization: `Bearer ${token}` }  })
      .then(( response ) => {
        console.log(response);
        if (response.status === 200) {
          setModelShow(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (

    <>
      <Sidebar>
        <div className="page-main-head d-flex justify-content-between">
          <h1 className="h4">New User</h1>
        </div>
        <Form onSubmit={onSubmitForm}>
          <Row>
            <Col xxl={10} xl={10} lg={12}>
              <Card>
                <Card.Header as="h5">User information</Card.Header>
                <Card.Body>
                 
                   <Form.Group className="mb-20" controlId="Full-Name">
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>Name</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Control type="text" name="name" />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-20" controlId="Email">
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>Email</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Control type="email" name="email" />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-20" controlId="Building-manager">
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>Password</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Control type="password" name="password" />
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-20" controlId="Buzzer-code">
                  <Row className="align-items-center">
                    <Col lg={4}>
                      <Button variant="outline-primary" type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Sidebar>
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
          <Modal.Body>User Added Successfully!!!</Modal.Body>
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

export default AddNewProperties;
