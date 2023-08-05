import { Card, Row, Col, Form, Button,Modal } from "react-bootstrap";
import axios from "axios";
import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import { useNavigate } from "react-router-dom";

const AddNewSubjects = () => {
  const navigate = useNavigate();
  const [modelshow, setModelShow] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    title: "",
  });
  const onSubjectFormChange = (event) => {
    const { name, value } = event.target;
    setSubjectForm({[name]: value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "subject/create";
    var token = localStorage.getItem("platformDashToken");
    await axios
      .post(url, subjectForm, { headers: { Authorization: `Bearer ${token}` } })
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
          <h1 className="h4">New Subjects</h1>
         
        </div>
        <Form onSubmit={onSubmitForm}>
          <Row>
            <Col xxl={10} xl={10} lg={12}>
              <Card>
                <Card.Header as="h5">Subjects information</Card.Header>
                <Card.Body>
                  <Form.Group className="mb-20" controlId="Full-name">
                    <Row className="align-items-center">
                      <Col lg={3}>
                        <Form.Label>Subjects Name</Form.Label>
                      </Col>
                      <Col lg={9}>
                        <Form.Control
                          type="text"
                          name="title"
                          onChange={onSubjectFormChange}
                        />
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
          <Modal.Body>Subject Added Successfully!!!</Modal.Body>
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

export default AddNewSubjects;
