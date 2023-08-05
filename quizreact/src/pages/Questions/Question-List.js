import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Row, Col, Table,Modal } from "react-bootstrap";
import Sidebar from "../../components/SideBar";
import axios from "axios";


const QuestionList = () => {
  const [modelshow, setModelShow] = useState(false);
  const [error, setError] = useState("");

  const [question, setQuestion] = useState([]);
  const [topic, setTopic] = useState([]);

  var rows = [];

  useEffect(() => {
    getQuestion();
    getTopic();
  }, []);

  const getTopic = () => {
    
    try {
      var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "topic/index";
      var token = localStorage.getItem('platformDashToken')
        axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
         console.log(response);
          if (response.status === 200) {
            rows = response.data.data;
            setTopic(rows);
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

  const getQuestion = () => {
    try {
      var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "question/index";
      var token = localStorage.getItem('platformDashToken')
        axios
        .get(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            rows = response.data.data;
            setQuestion(rows);
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

  const handleDeleteQuestion = (e) => {
    e.preventDefault()
    var id=e.currentTarget.id;
    try {
      var url =
      process.env.REACT_APP_LARAVEL_ADMIN_API_URL + 'question/delete/' + id;
      var token = localStorage.getItem('platformDashToken')
      axios
        .delete(url, { headers: { Authorization: `Bearer ${token}` } })
        .then((response) => {
          if (response.status === 200) {
            setModelShow(true)
            getQuestion();
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
       // navigate("/admin/login");
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
                <h1 className="h4 color-black me-3">Question</h1>
                <div>

                 
                <Link
                      className="btn btn-outline-success"
                      to={`/admin/add-new-questions/`}
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
                <th>Question</th>
                <th>Explanation</th>
                <th>Subject Topic</th>

                <th>Action</th>
              </tr>
            </thead>
            <tbody>
             
              {question ? (
                question.length > 0 ? (
                  question.map((row, i) => (
                    <tr key={i}>
                    <td>{row.id}</td>
                      <td>{row.question}</td>
                      <td>{row.explanation}</td>


                      {
                      topic?(
                        topic.length > 0 ? (
                          topic.map((sub, i) => (
                          sub.id
                          ? sub.id === row.topic_id &&  <td>{sub.title}</td>
                          : ''
                       ))):''):''
                     }
                      <td>
                        <Link
                          className="btn btn-outline-primary"
                          to={`/admin/edit-questions/${row.id}`}
                          variant="outline-info"
                        >
                          Edit
                        </Link>
                        <Button id={row.id} variant="outline-danger" onClick={handleDeleteQuestion}>Delete</Button>
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
            <Modal.Title>Delete Question</Modal.Title>
            <button
              className="btn-close"
              aria-label="Close"
              onClick={() => setModelShow(false)}
            ></button>
          </Modal.Header>
          <Modal.Body> Question deleted Successfully!!! </Modal.Body>
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

export default QuestionList;
