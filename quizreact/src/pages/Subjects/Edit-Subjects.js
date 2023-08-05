import { Card, Row, Col, Form, Button,Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSubjects = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [modelshow, setModelShow] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    var id = params.id;
    getSubjectByID(id);
  }, []);

  function getSubjectByID(id) {
    try {
      var url =
        process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "subject/show/" + id;
      console.log(url);
      var token = localStorage.getItem("platformDashToken");
      axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            setData(response.data.data);
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  
  const onSubmit = async (e) => {
    e.preventDefault();

    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "subject/update";
    var token = localStorage.getItem("platformDashToken");

    const formData = new FormData(e.target);
    let frm = Object.fromEntries(formData.entries());
    console.log(frm);

    var postData = {
      "id": frm.id,
      "title": frm.title,
    };
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
          <h1 className="h4">Edit Subjects</h1>
        </div>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col xxl={10} xl={10} lg={12}>
              <Card>
                {/* <Card.Header as="h5">User information</Card.Header> */}
                <Card.Body>
                  <Form.Group className="mb-20" controlId="Full-name">
                    <Row className="align-items-center">
                      <Col lg={3}>
                        <Form.Label>Subjects Name</Form.Label>
                      </Col>
                      <Col lg={9}>
                        <Form.Control type="hidden" name="id" value={data.id} />
                        <Form.Control
                          type="text"
                          name="title"
                          onChange={handleChange}
                          defaultValue={
                            data.title
                              ?  data.title
                              : ''
                          }
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
          <Modal.Body>Subject Updated Successfully!!!</Modal.Body>
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

export default EditSubjects;
