import { Card, Row, Col, Form, Button,Modal } from "react-bootstrap";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";


const AddNewSubjectlevel = () => {
  const [modelshow, setModelShow] = useState(false);
  const [subject, setSubject] = useState([]);
  var rows = [];

  useEffect(() => {
    fetchSubject();
  }, []);

  
  const fetchSubject = () => {
    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "subject/index";
    var token = localStorage.getItem('platformDashToken')
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })        
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          rows = response.data.data;
          setSubject(rows);
        }
      })
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    let frm = Object.fromEntries(formData.entries())

    console.log(frm);
    let postData={
      "subject_id":frm.subject_id,
      "title":frm.title
    }
    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "level/create";
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
                      <Form.Label>Subjects LevelType</Form.Label>
                    </Col>
                    <Col lg={9}>
                      <Form.Control type="text"  name="title"  />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-20" controlId="Full-name">
                  <Row className="align-items-center">
                    <Col lg={3}>
                      <Form.Label>Subjects </Form.Label>
                    </Col>
                    <Col lg={9}>
                    <Form.Select name="subject_id" >
                    {subject.map((row, index) =>
                          <option
                            key={index}
                            value={row.id}
                          >
                           {row.title} 
                          </option>
                        )}
                      <h1>{subject.name}</h1>

                    </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-20" controlId="Buzzer-code">
                  <Row className="align-items-center">
                    <Col lg={4}>
                      {/* <Button  size="sm">Submit</Button> */}
                      {/* <Form.Control type="submit" /> */}
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
          <Modal.Body>SubjectLevel Added Successfully!!!</Modal.Body>
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

export default AddNewSubjectlevel;
