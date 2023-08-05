import React, {useEffect,useState} from 'react';
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Sidebar from "../../components/SideBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [modelshow, setModelShow] = useState(false)
  const [data, setData] = useState([]);

  useEffect(() => {
    var id = params.id;
    getUserByID(id);
  }, []);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  function getUserByID(id) {
    try {
      var url =
        process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "user/show/" + id;
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

  const onSubmit = async (e) => {
    e.preventDefault();

    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "user/update";
    var token = localStorage.getItem("platformDashToken");

    const formData = new FormData(e.target);
    let frm = Object.fromEntries(formData.entries());
    console.log(frm);

    var postData = {
      "id": frm.id,
      "name": frm.name,
      "email": frm.email,
      "password": frm.password

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
          <h1 className="h4">Edit User</h1>
        </div>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col xxl={10} xl={10} lg={12}>
              <Card>
                <Card.Body>
                <Form.Group className="mb-20" controlId="Email">
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>Name</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Control type="text" name="name" onChange={handleChange}
                          defaultValue={
                            data.name
                              ?  data.name
                              : ''
                          }/>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-20" controlId="Email">
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>Email</Form.Label>
                      </Col>
                      <Col lg={10}>
                      <Form.Control type="hidden" name="id"  />
                        <Form.Control type="email" name="email" onChange={handleChange}
                          defaultValue={
                            data.email
                              ?  data.email
                              : ''
                          }/>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-20" controlId="Building-manager">
                    <Row className="align-items-center">
                      <Col lg={2}>
                        <Form.Label>Password</Form.Label>
                      </Col>
                      <Col lg={10}>
                        <Form.Control type="password" name="password" onChange={handleChange}
                          {
                            ...data.password
                              ?  data.password
                              : ''
                          }/>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-20" controlId="Buzzer-code">
                    <Row className="align-items-center">
                      <Col lg={4}>
                      <Button variant="outline-primary" type="button"  onClick={() => setModelShow(true)}>
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
      {modelshow ? 
        <Modal show={modelshow}>
            <Modal.Header>
              <Modal.Title>Update user</Modal.Title>
              <button
                className="btn-close"
                aria-label="Close"
                onClick={() => setModelShow(false)}
              ></button>
            </Modal.Header>
            <Modal.Body>
            User Update Successfully!!!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary"  onClick={() => setModelShow(false)}>
                Close
              </Button>
            </Modal.Footer>
        </Modal>
      :''}
    </>
  );
};

export default EditUser;
