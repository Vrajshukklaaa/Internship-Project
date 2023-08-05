import React, { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  Button, Row, Col, Table, Modal } from "react-bootstrap";
import Sidebar from "../../components/SideBar";
import axios from "axios";


const UserList = () => {
  const [user, setuser] = useState([]);
  const [modelshow, setModelShow] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  var rows = [];

  useEffect(() => {
    getUser();
  }, []);

  const  getUser = () => {
    try {
      var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "user/index";
      var token = localStorage.getItem('platformDashToken')
        axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            rows = response.data.data;
            setuser(rows);
          } else {
            console.log("Something Went Wrong!!!");
          }
        })
        .catch((error) => {
          console.log(error)
        });
    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteUser = (e) => {
    e.preventDefault()
    var id=e.currentTarget.id; 
    try {
      var url =
      process.env.REACT_APP_LARAVEL_ADMIN_API_URL + 'user/delete/'+id;
      var token = localStorage.getItem('platformDashToken')
      axios
        .delete(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            // getUser();
            setModelShow(true)
           
          } else {
            setError('Something Went Wrong!!!')
            setModelShow(true)
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
                <h1 className="h4 color-black me-3">Users</h1>
                <div>
                  <Link
                    className="btn btn-outline-success"
                    to={`/admin/add-new-users/`}
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
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
           
            <tbody>
              {user ? (
                user.length > 0 ? (
                  user.map((row, i) => (
                    <tr key={i}>
                    <td>{row.id}</td>
                      <td>{row.name}</td>
                      <td>{row.email}</td>

                      <td>
                        <Link
                          className="btn btn-outline-primary"
                          to={`/admin/edit-users/${row.id}`}
                          variant="outline-info"
                        >
                          Edit
                        </Link>
                        <Button id={row.id} variant="outline-danger" onClick={handleDeleteUser}>Delete</Button>
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
      {modelshow ? 
        <Modal show={modelshow}>
            <Modal.Header>
              <Modal.Title>Delete User</Modal.Title>
              <button
                className="btn-close"
                aria-label="Close"
                onClick={() => setModelShow(false)}
              ></button>
            </Modal.Header>

            <Modal.Body>
              Are you sure you want to delete User ?
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary"  onClick={() => setModelShow(false)} >
                Delete
              </Button>
            </Modal.Footer>
        </Modal>
      :''}
    </>
  );
};

export default UserList;
