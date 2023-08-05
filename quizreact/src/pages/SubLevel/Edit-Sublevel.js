import { Card, Row, Col, Form, Button,Modal } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/SideBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";



const EditSublevel = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [modelshow, setModelShow] = useState(false);
  const [level, setLevel] = useState([]);
  const [data, setData] = useState([]);
  var rows = [];


  useEffect(() => {
    var id = params.id;
    getSublevelByID(id);
    fetchLevel();
  }, []);

  function getSublevelByID(id) {
    try {
      var url =
        process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "sublevel/show/" + id;
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

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "sublevel/update";
    var token = localStorage.getItem("platformDashToken");

    const formData = new FormData(e.target);
    let frm = Object.fromEntries(formData.entries());
    console.log(frm);

    var postData = {
      "id": frm.id,
      "level_id":frm.level_id,
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
          <h1 className="h4">Edit Sub Level</h1>
        </div>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col xxl={10} xl={10} lg={12}>
              <Card>
                <Card.Body>
                  <Form.Group className="mb-20" controlId="Full-name">
                    <Row className="align-items-center">
                      <Col lg={3}>
                        <Form.Label>Title</Form.Label>
                      </Col>
                      <Col lg={9}>
                        <Form.Control type="hidden" name="id" value={data.id}  />
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
                  <Form.Group className="mb-20" controlId="Full-name">
                    <Row className="align-items-center">
                      <Col lg={3}>
                        <Form.Label>Level </Form.Label>
                      </Col>
                      <Col lg={9}>
                      <Form.Select name="level_id" >
                        {level.map((row, index) =>
                            <option
                              key={index}
                              value={row.id}
                              selected={
                                level.level_id
                                  ? row.id === level.level_id && 'true'
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
          <Modal.Body>Sublevel Updated Successfully!!!</Modal.Body>
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

export default EditSublevel;
