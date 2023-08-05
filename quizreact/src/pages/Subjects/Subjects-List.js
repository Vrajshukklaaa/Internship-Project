import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  Button, Row, Col, Table, Modal } from "react-bootstrap";
import Sidebar from "../../components/SideBar";
import axios from "axios";

const SubjectList = () => {
  const [subject, setSubject] = useState([]);
  const [modelshow, setModelShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();


  var rows = [];

  useEffect(() => {
    getSubject();
  }, []);
  
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
  const handleDeleteSubject = (e) => {
    e.preventDefault()
    var id=e.currentTarget.id; 
    try {
      var url =
      process.env.REACT_APP_LARAVEL_ADMIN_API_URL + 'subject/delete/'+id;
      var token = localStorage.getItem('platformDashToken')
      axios
        .delete(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            setModelShow(true)
            getSubject();

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
                <h1 className="h4 color-black me-3">Subjects</h1>
                <div>
                  <Link
                    className="btn btn-outline-success"
                    to={`/admin/add-new-subjects/`}
                    variant="outline-info"
                  >
                    Add
                  </Link>
                </div>
              </div>
            </Col>
            <Col xs={4}>
              <div className="d-flex align-items-center justify-content-end"></div>
            </Col>
          </Row>
        </div>
        <div>
          <Table responsive="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {subject ? (
                subject.length > 0 ? (
                  subject.map((row, i) => (
                    <tr key={i}>
                    <td>{row.id}</td>
                      <td>{row.title}</td>
                      <td>
                        <Link
                          className="btn btn-outline-primary"
                          to={`/admin/edit-subjects/${row.id}`}
                          variant="outline-info"
                        >
                          Edit
                        </Link>
                        <Button id={row.id} variant="outline-danger" onClick={handleDeleteSubject}>Delete</Button>
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
            <Modal.Title>Delete User</Modal.Title>
            <button
              className="btn-close"
              aria-label="Close"
              onClick={() => setModelShow(false)}
            ></button>
          </Modal.Header>
          <Modal.Body>Successfully deleted the Subject ?</Modal.Body>
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

export default SubjectList;
