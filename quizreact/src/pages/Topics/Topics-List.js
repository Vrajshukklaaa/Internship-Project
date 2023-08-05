import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, Table, Badge, Modal } from "react-bootstrap";

import Sidebar from "../../components/SideBar";
import axios from "axios";




const TopicsList = () => {
  const [modelshow, setModelShow] = useState(false);

  const [topics, setTopics] = useState([]);
  const [subject, setSubject] = useState([]);
  const [level, setLevel] = useState([]);
  const [sublevel, setSubLevel] = useState([]);
  const [error, setError] = useState("");
  var rows = [];

  useEffect(() => {
    getTopics();
    getSubject();
    getLevel();
    getSubLevel();
  }, []);

  const getTopics = () => {
    
    try {
      var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "topic/index";
      var token = localStorage.getItem('platformDashToken')
        axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
         console.log(response);
          if (response.status === 200) {
            rows = response.data.data;
            setTopics(rows);
          } else {
            setError("Something Went Wrong!!!");
           // setModelShow(true);
          }
        })
        .catch((error) => {
          /*if (error.response.status === 401) {
            setError("Invalid name. Try again!");
            setModelShow(true);
          } else {
            setError("Something Went Wrong!!!");
            setModelShow(true);
          }*/
        });
    } catch (error) {
      /*if (error.statusCode === 401) {
        setError("Invalid name. Try again!");
        setModelShow(true);
      } else {
        setError("Something Went Wrong!!!");
        setModelShow(true);
      }*/
    }
  };

  const getSubject = () => {
    try {
      var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "subject/index";
      var token = localStorage.getItem('platformDashToken')
        axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            rows = response.data.data;
            setSubject(rows);
          } else {
            alert("Something Went Wrong!!!");
          }
        })
        .catch((error) => {
          alert(error)
        });
    } catch (error) {
      alert(error)
    }
  };

  const getLevel = () => {
    try {
      var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "level/index";
      var token = localStorage.getItem('platformDashToken')
        axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            rows = response.data.data;
            setLevel(rows);
          } else {
            alert("Something Went Wrong!!!");
          }
        })
        .catch((error) => {
          alert(error)
        });
    } catch (error) {
      alert(error)
    }
  };

  const getSubLevel = () => {
    try {
      var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "sublevel/index";
      var token = localStorage.getItem('platformDashToken')
        axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            rows = response.data.data;
            setSubLevel(rows);
          } else {
            alert("Something Went Wrong!!!");
          }
        })
        .catch((error) => {
          alert(error)
        });
    } catch (error) {
      alert(error)
    }
  };

  const handleDeleteTopics = (e) => {
    e.preventDefault()
    var id=e.currentTarget.id; 
    try {
      var url =
      process.env.REACT_APP_LARAVEL_ADMIN_API_URL + 'topic/delete/'+id;
      var token = localStorage.getItem('platformDashToken')
      axios
        .delete(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            setModelShow(true)
            getTopics();
          } else {
           
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            //localStorage.removeItem('platformDashToken')
            //navigate('/admin/login')
          } else {
            setError('Something Went Wrong!!!')
            setModelShow(true)
          }
        })
    } catch (error) {
      if (error.statusCode === 401) {
        setError('Something Went Wrong!!!')
        setModelShow(true)
      } else {
        setError('Something Went Wrong!!!')
       setModelShow(true)
      }
    }
  }





  return (
    <>
      <Sidebar>
        <div className="page-main-head align-items-center">
          <Row className="align-items-center">
            <Col xs={12}>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="h4 color-black me-3">Subjects Topics</h1>
                <div>
                  
                  <Link
                    className="btn btn-outline-success"
                    to={`/admin/add-new-topics/`}
                    variant="outline-info"
                  >
                    Add
                  </Link>
                 
                </div>
                
              </div>
            </Col>
          </Row>
        </div>

        <div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Subject Name</th>
                <th>Level</th>
                <th>SubLevel</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {topics ? (
                topics.length > 0 ? (
                  topics.map((row, i) => (
                    <tr key={i}>
                    <td>{row.id}</td>
                      <td>{row.title}</td>
                      {
                      subject?(
                        subject.length > 0 ? (
                          subject.map((sub, i) => (
                          sub.id
                          ? sub.id === row.subject_id &&  <td>{sub.title}</td>
                          : ''
                       ))):''):''
                     }

                    {
                      level?(
                        level.length > 0 ? (
                          level.map((sub, i) => (
                          sub.id
                          ? sub.id === row.level_id &&  <td>{sub.title}</td>
                          : ''
                       ))):''):''
                     }

                    {
                      sublevel?(
                        sublevel.length > 0 ? (
                          sublevel.map((sub, i) => (
                          sub.id
                          ? sub.id === row.sublevel_id &&  <td>{sub.title}</td>
                          : ''
                       ))):''):''
                     }

                      <td>
                        <Link
                          className="btn btn-outline-primary"
                          to={`/admin/edit-topics/${row.id}`}
                          variant="outline-info"
                        >
                          Edit
                        </Link>
                        <Button id={row.id} onClick={handleDeleteTopics} variant="outline-danger">Delete</Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td></td>
                    <td>No Data Found</td>
                  </tr>
                )
              ) : (
                ""
              )}
            </tbody>
          </Table>
        </div>
      </Sidebar>
      {modelshow ? (
        <Modal show={modelshow}>
          <Modal.Header>
            <Modal.Title>Delete Sublevel</Modal.Title>
            <button
              className="btn-close"
              aria-label="Close"
              onClick={() => setModelShow(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>Successfully deleted the Sublevel ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModelShow(false)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
};

export default TopicsList;
