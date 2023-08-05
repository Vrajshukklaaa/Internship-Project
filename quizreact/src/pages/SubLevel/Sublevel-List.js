import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import {  Button, Row, Col, Table,Modal } from "react-bootstrap";

import Sidebar from "../../components/SideBar";
import axios from "axios";

const SubjectLevelList = () => {
  const [modelshow, setModelShow] = useState(false);
  const [sublevel, setSubLevel] = useState([]);
  const [level, setLevel] = useState([]);

  const [error, setError] = useState("");

  var rows = [];
  useEffect(() => {
    getSubLevel();
    getLevel();
  }, []);

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
            setError("Something Went Wrong!!!");
            setModelShow(true);
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

  const handleDeleteSublevel = (e) => {
    e.preventDefault()
    var id=e.currentTarget.id; 
    try {
      var url =
      process.env.REACT_APP_LARAVEL_ADMIN_API_URL + 'sublevel/delete/'+id;
      var token = localStorage.getItem('platformDashToken')
      axios
        .delete(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            setModelShow(true)
            getSubLevel();
          } else {
           
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            //localStorage.removeItem('platformDashToken')
            //navigate('/admin/login')
          } else {
            //setError('Something Went Wrong!!!')
            //setModelShow(true)
          }
        })
    } catch (error) {
      if (error.statusCode === 401) {
        //setError('Something Went Wrong!!!')
        //setModelShow(true)
      } else {
        //setError('Something Went Wrong!!!')
       // setModelShow(true)
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
              <h1 className="h4 color-black me-3">Sub Level</h1>
              <div>
                {/* <Link
                  to="/add-new-properties"
                  size="sm"
                  className="btn btn-primary btn-sm"
                >
                  NEW
                </Link> */}
                <Link
                    className="btn btn-outline-success"
                    to={`/admin/add-new-sublevel/`}
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
              <th>Title</th>
              <th>Level</th> 
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
          {sublevel ? (
                sublevel.length > 0 ? (
                  sublevel.map((row, i) => (
                    <tr key={i}>
                    <td>{row.id}</td>
                    <td>{row.title}</td>
                    {
                      level?(
                        level.length > 0 ? (
                          level.map((sub, i) => (
                          sub.id
                          ? sub.id === row.level_id &&  <td>{sub.title}</td>
                          : ''
                       ))):''):''
                     }
                      <td>
                        <Link
                          className="btn btn-outline-primary"
                          to={`/admin/edit-sublevel/${row.id}`}
                          variant="outline-info"
                        >
                          Edit
                        </Link>
                        <Button id={row.id} variant="outline-danger" onClick={handleDeleteSublevel}>Delete</Button>
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
          <Modal.Body>Successfully deleted the  Sublevel ?</Modal.Body>
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

export default SubjectLevelList;
