import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Table,Modal } from "react-bootstrap";
import Sidebar from "../../components/SideBar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";



const SubjectLevelList = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [modelshow, setModelShow] = useState(false);
  const [level, setLevel] = useState([]);
  const [error, setError] = useState("");
  const [subject, setSubject] = useState([]);
  var rows = [];
  useEffect(() => {
    getLevel();
    getSubject();
  }, []);

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
            setError("Something Went Wrong!!!");
            setModelShow(true);
          }
        })
        .catch((error) => {
         console.log(error)
        });
    } catch (error) {
    if (error.statusCode === 401) {
      localStorage.removeItem("platformDashToken");
      navigate("/admin/login");
    }
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
            // alert("Something Went Wrong!!!");
          }
        })
        .catch((error) => {
          alert(error)
        });
    } catch (error) {
      // alert(error)
    }
  };
  const handleDeleteLevel = (e) => {
    e.preventDefault()
    var id=e.currentTarget.id;
    try {
      var url =
      process.env.REACT_APP_LARAVEL_ADMIN_API_URL + 'level/delete/' + id;
      var token = localStorage.getItem('platformDashToken')
      axios
        .delete(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            setModelShow(true)
             getLevel();
          } else {
            console.log('Error');
          }
        })
        .catch((error) => {
          console.log(error);
        })
    } catch (error) {
      if (error.statusCode === 401) {
        localStorage.removeItem("platformDashToken");
        navigate("/admin/login");
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
              <h1 className="h4 color-black me-3">Subjects Level</h1>
              <div>
                <Link
                    className="btn btn-outline-success"
                    to={`/admin/add-new-subjectlevel/`}
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
              <th>Level</th>
              <th>Subject Name</th> 
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            
            {level ? (
                level.length > 0 ? (
                  level.map((row, i) => (
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
                      <td>
                        <Link
                          className="btn btn-outline-primary"
                          to={`/admin/edit-subjectlevel/${row.id}`}
                          variant="outline-info"
                        >
                          Edit
                        </Link>
                        <Button id={row.id} variant="outline-danger" onClick={handleDeleteLevel}>Delete</Button>
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
          <Modal.Body>Successfully deleted the Subjectlevel ?</Modal.Body>
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
