import React, { useState , useEffect } from "react";
import { Button, Col, Form, Row, Modal } from "react-bootstrap";
import LeftSidebar from "../../../../src/components/LeftSidebar"
import { Link , useParams } from "react-router-dom";    
import axios from "axios";

const QuestionAnswer = () => {
    const [isHelp,setStatehelp]=useState(false)
    const [isVideo,setStateVideo]=useState(false)
    const handleHelpOpen = () => setStatehelp(true);
    const handleHelpClose = () => setStatehelp(false);
    //const handleVideoOpen = () => setStateVideo(true);
    const handleVideoClose = () => setStateVideo(false);
    const params = useParams();
    const [question, setQuestion] = useState([]);
    const [optional, setOptional] = useState(0);
    // const [sublevel, setSubLevel] = useState([]);
     const [Video, setVideo] = useState();
    var rows = [];
    useEffect(() => {
        var id = params.id;
        // var options = [];
        getQuestions(id);
      }, []);
    const handleVideoOpen=(e)=>{
        setVideo(e.currentTarget.dataset.url);
        setStateVideo(true);
    }
    const getQuestions = (id) => {
      try {
        var url = process.env.REACT_APP_LARAVEL_USER_API_URL + "question/questionTopic/" + id;
          axios
          .get(url)
          .then((response) => {
            console.log(response);
            if (response.status === 200) {
              rows = response.data.data;
              setQuestion(rows);
              
              // options.push()
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

    const nextQuestion= (e)=>{
      setOptional(parseInt(e.currentTarget.dataset.id)+1);
    }
    const backQuestion= (e)=>{
      setOptional(parseInt(e.currentTarget.dataset.id)-1);
    }
    return(
    <>
        <Row>
            <Col className="p-0" md={4}>
                <LeftSidebar/>
            </Col>

            <Col className="p-0" md={8}>
                <div className="subject-categories d-flex w-100 justify-content-center h-100 flex-column">
                    <div className="subject-heading">
                        <h1>Question</h1>
                    </div>
                    {question.map((item, index) => (
                    <div className={`question-section`} data-id={index}  key={index} style={{display: optional==index ? 'block' : 'none' }} >
                            <p className="question-heading">Q-{index+1}</p>
                            <p className="question-heading question">{item.question}</p>
                            <p>Select The Answer</p>
                        <div className="answer-btn d-flex flex-column"> 
                        {item.options.map((option, index) => {
                            return (
                                <div class="form-group mb-4" key={index}>
                                  <label className="container_radio version_2 position-relative">
                                        <span className="radio-lab">({option.option_key}) {option.option_value}</span>
                                      <input type="radio" name={option.question_id} value={option.is_correct  } className="required"/>
                                        <span className="checkmark"></span>
                                  </label>
                                </div>
                              );
                            })}
                        </div>
                        <div className="ans-submit-btn mb-3 d-flex">
                          {question.length==(optional+1)?
                            <Button type="submit">Submit</Button>
                          :
                            <Link onClick={nextQuestion} data-id={index} className="btn btn-success">Next</Link>
                          }
                          {optional!=0?<Link onClick={backQuestion} data-id={index} className="btn btn-success">Back</Link>:''}
                        </div>

                        {item.video?<Button variant="info" data-url={item.video} onClick={handleVideoOpen}>Video</Button>:''}
                        
                    </div>
                    ))}
                    
                    <div className="answer-explantion">
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Answer With Explantion</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>
                    </div>
                    <div className="help-btn">
                        <Button variant="info"  onClick={handleHelpOpen}>Sia ! Help Me !</Button>
                    </div>
                    {/* <div className="help-btn">
                       
                    </div> */}
                </div>
            </Col>
            {isHelp?
             <Modal show={isHelp} onHide={isHelp}>
              <Modal.Header closeButton onClick={handleHelpClose}>
                <Modal.Title>Information Reagarding Vitamin</Modal.Title>
              </Modal.Header>
              <Modal.Body>The liver stores vitamin A, D, E, K and B12. The first four of these are all fat soluble. This means that the bile secreted during digestion is essential for absorbing them so that the body can use them. If bile production is compromised by liver damage, the proper absorption of these vitamins may be affected.
              </Modal.Body>
              <Modal.Footer>
                <Button className="m-auto" variant="success"  onClick={handleHelpClose}>Close</Button>
              </Modal.Footer>
            </Modal>
        :''
        }
        {isVideo?
             <Modal show={isVideo} onHide={isVideo}>
             <Modal.Header closeButton onClick={handleVideoClose}>
               <Modal.Title>Information Reagarding Vitamin</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                <iframe
                    width="853"
                    height="480"
                    src={Video}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                />
             </Modal.Body>
             <Modal.Footer>
               <Button className="m-auto" variant="success"  onClick={handleVideoClose}>Close</Button>
             </Modal.Footer>
           </Modal>
        :''
        }
        </Row>
    </>
    )
}

export default QuestionAnswer;