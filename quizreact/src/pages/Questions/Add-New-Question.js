import React, {useState,useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "../../components/SideBar";
import axios from "axios";
import "./question.css"

const AddNewSubjectlevel = () => {
  const [topics, setTopics] = useState([]);

  var rows = [];
  var option_value = [];

  useEffect(() => {
    getTopics();
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
           
          }
        })
        .catch((error) => {
         
        });
    } catch (error) {
    }
  };
  const inputArr = [
    {
      id: 1,
      value: ""
    }
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr(s => {
      return [
        ...s,
        {
          value: ""
        }
      ];
    });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    let frm = Object.fromEntries(formData.entries());
    var options=[];
    for(var i=0;i<arr.length;i++){
      var correct=0;
      if(eval("frm.is_correct_"+i)){
        correct=1;
      }
      options.push({"option_key":eval("frm.option_key_"+i),"option_value":eval("frm.option_value_"+i),"is_correct":correct});
    }
    let postData={
      "topic_id": frm.topic_id?frm.topic_id:0,
      "question": frm.question?frm.question:"",
      "explanation": frm.explanation?frm.explanation:"",
      "revisiontext":  frm.revisiontext?frm.revisiontext:"",
      "video":  frm.video?frm.video:"",
      "options": options
    }
    console.log(postData)
    var url = process.env.REACT_APP_LARAVEL_ADMIN_API_URL + "question/create";
    var token = localStorage.getItem("platformDashToken");
    await axios
      .post(url, postData,  { headers: { Authorization: `Bearer ${token}` }  })
      .then(( response ) => {
        console.log(response);
        if (response.status === 200) {
          //setModelShow(true);
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
        <h1 className="h4">New Questions</h1>
        {/* <div>
                    <Button variant="primary" size="sm"> aDD PROPERTY</Button>
                </div> */}
      </div>
      <Form onSubmit={onSubmitForm}>
        <Row>
          <Col xxl={10} xl={10} lg={12}>
            <Card>
              {/* <Card.Header as="h5">Subjects information</Card.Header> */}
              <Card.Body>
                <Form.Group className="mb-20" controlId="Full-name">
                  <Row className="align-items-center">
                    <Col lg={3}>
                      <Form.Label>Title</Form.Label>
                    </Col>
                    <Col lg={9}>
                      <Form.Control type="text" name="question" />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-20" controlId="Full-name">
                  <Row className="align-items-center">
                    <Col lg={3}>
                      <Form.Label>Topic</Form.Label>
                    </Col>
                    <Col lg={9}>
                    <Form.Select name="topic_id" >
                        {topics.map((row, index) =>
                          <option
                            key={index}
                            value={row.id}
                          >
                          {row.title} 
                          </option>
                        )}
                  </Form.Select>
                    </Col>
                  </Row>
                </Form.Group>
                 
                <Form.Group className="mb-20" controlId="Full-name">
                  <Row className="">
                    <Col lg={3}>
                      <Form.Label>Question Options</Form.Label>
                    </Col>
                    <Col lg={8}>
                      <Row className="question-option-label mb-2 d-none d-md-flex">
                        <Col lg={2}>
                          <Form.Label>Key</Form.Label>
                        </Col>
                        <Col lg={7}>
                          <Form.Label>Value</Form.Label>
                        </Col>
                        <Col lg={3}>
                          <Form.Label>is Correct?</Form.Label>
                        </Col>
                      </Row>
                      {arr.map((item, i) => {
                        return (
                          <div>
                            <Row className="mb-3">
                              <Col lg={2}>
                              <Form.Label className="d-block d-md-none">Key</Form.Label>
                                <Form.Control type="text" name={"option_key_"+i}/>
                              </Col>
                              <Col lg={7}>
                              <Form.Label className="d-block d-md-none">Value</Form.Label>
                                <Form.Control type="text" name={"option_value_"+i} />
                              </Col>
                              <Col lg={3}>
                              <Form.Label className="d-block d-md-none">is Correct?</Form.Label>
                                <input type="checkbox"  name={"is_correct_"+i}/>
                              </Col>
                            </Row>
                            
                          </div>
                        );
                      })}
                    </Col>
                    <Col lg={1}>
                      <div className="plus-minus-btn">
                          <Button onClick={addInput}>+</Button>
                      </div>
                      
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-20" controlId="Full-name">
                  <Row className="align-items-center">
                    <Col lg={3}>
                      <Form.Label>Revision Text</Form.Label>
                    </Col>
                    <Col lg={9}>
                      <Form.Control type="text" name="revisiontext" />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-20" controlId="Full-name">
                  <Row className="align-items-center">
                    <Col lg={3}>
                      <Form.Label>Explanation</Form.Label>
                    </Col>
                    <Col lg={9}>
                      <Form.Control type="text" name="explanation" />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-20" controlId="Full-name">
                  <Row className="align-items-center">
                    <Col lg={3}>
                      <Form.Label>Embeded Video</Form.Label>
                    </Col>
                    <Col lg={9}>
                      <Form.Control type="text" name="video" />
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-20" controlId="Buzzer-code">
                  <Row className="align-items-center">
                    <Col lg={4}>
                      {/* <Button  size="sm">Submit</Button> */}
                      {/* <Form.Control type="submit" /> */}
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
    </>
  );
};

export default AddNewSubjectlevel;
