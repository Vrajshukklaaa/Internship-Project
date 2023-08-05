import { Card, Row, Col, Form, Button,Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../components/SideBar";

const EditTopics = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [modelshow, setModelShow] = useState(false);
  const [topic, setTopic] = useState([]);
  const [subject, setSubject] = useState([]);
  const [level, setLevel] = useState([]);
  const [sublevel, setSubLevel] = useState([]);
  var rows = [];

  useEffect(() => {
    var id = params.id;
    getTopicID(id);
     fetchLevel();
     fetchSubject();
     fetchSubLevel();

  }, []);

  const handleChange = (e) => {
    setTopic({
      ...topic,
      [e.target.name]: e.target.value,
    });
  };

  function getTopicID(id) {
    try {
      var url =
        process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "topic/show/" + id;
      console.log(url);
      var token = localStorage.getItem("platformDashToken");
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setTopic(response.data.data);
          } else {
            //setShowAlert(true);
          }
        })
        .catch((error) => {
          if (error.response) {
           // setShowAlert(true);
          } else {
           // setShowAlert(true);
          }
        });
    } catch (error) {
      if (error.statusCode === 401) {
        localStorage.removeItem("platformDashToken");
        navigate("/admin/login");
      } else {
       // setShowAlert(true);
      }
    }
  }

  const fetchLevel = () => {
    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "level/index";
    var token = localStorage.getItem('platformDashToken')
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })        
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          rows = response.data.data;
          setLevel(rows);
        }
      })
  };

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

  const fetchSubLevel = () => {
    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "sublevel/index";
    var token = localStorage.getItem('platformDashToken')
    axios
      .get(url, { headers: { Authorization: `Bearer ${token}` } })        
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          rows = response.data.data;
          setSubLevel(rows);
        }
      })
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let frm = Object.fromEntries(formData.entries());
    console.log(frm);

    var postData = {
      "id": frm.id,
      "subject_id":frm.subject_id,
      "level_id":frm.level_id,
      "sublevel_id":frm.sublevel_id,
      "title": frm.title,
    };


    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "topic/update";
    var token = localStorage.getItem("platformDashToken");

    
    await axios
      .put(url, postData, { headers: { Authorization: `Bearer ${token}` } })
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
        <h1 className="h4">Edit Subjects Topics</h1>
      
      </div>
      <Form onSubmit={onSubmit}>
        <Row>
          <Col xxl={10} xl={10} lg={12}>
            <Card>
              {/* <Card.Header as="h5">User information</Card.Header> */}
              <Card.Body>
                <Form.Group className="mb-20" controlId="Full-name">
                <Form.Control type="hidden" name="id" value={topic.id} />
                  <Row className="align-items-center">
                    <Col lg={2}>
                      <Form.Label>Topics Name</Form.Label>
                    </Col>
                    <Col lg={10}>
                      
                      <Form.Control
                          type="text"
                          name="title"
                          onChange={handleChange}
                          defaultValue={
                            topic.title
                              ?  topic.title
                              : ''
                          }
                        />

                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-20" controlId="Full-name">
                <Form.Control type="hidden" name="id" value={topic.id} />
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>Subject </Form.Label>
                      </Col>
                      <Col lg={10}>
                      <Form.Select name="subject_id" >
                        {subject.map((row, index) =>
                            <option
                              key={index}
                              value={row.id}
                              selected={
                                topic.subject_id
                                  ? row.id === topic.subject_id && 'true'
                                  : ''
                              }
                            >
                            {row.title} 
                            </option>
                          )}
                        <h1>{subject.name}</h1>
                      </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>
                <Form.Group className="mb-20" controlId="Full-name">
                
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>Level </Form.Label>
                      </Col>
                      <Col lg={10}>
                      <Form.Select name="level_id" >
                        {level.map((row, index) =>
                            <option
                              key={index}
                              value={row.id}
                              selected={
                                topic.level_id
                                  ? row.id === topic.level_id && 'true'
                                  : ''
                              }
                            >
                            {row.title} 
                            </option>
                          )}
                        <h1>{level.name}</h1>
                      </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mb-20" controlId="Full-name">
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>SubLevel </Form.Label>
                      </Col>
                      <Col lg={10}>
                      <Form.Select name="sublevel_id" >
                        {sublevel.map((row, index) =>
                            <option
                              key={index}
                              value={row.id}
                              selected={
                                topic.sublevel_id
                                  ? row.id === topic.sublevel_id && 'true'
                                  : ''
                              }
                            >
                            {row.title} 
                            </option>
                          )}
                        <h1>{sublevel.name}</h1>
                      </Form.Select>
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
          <Modal.Body>Topics Updated Successfully!!!</Modal.Body>
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

export default EditTopics;
