import React ,{ useEffect, useState } from "react";
import {  Col,Row} from "react-bootstrap";
import LeftSidebar from "../../../../src/components/LeftSidebar"
import { Link ,useParams} from "react-router-dom";
import axios from "axios";



const SelectTopic = () => {
    const params = useParams();
    const [topic, setTopic] = useState([]);
    // const [sublevel, setSubLevel] = useState([]);
    var rows = [];

    useEffect(() => {
        var id = params.id;
        getLevelTopic(id);
      }, []);

      const getLevelTopic = (id) => {
        try {
          var url = process.env.REACT_APP_LARAVEL_USER_API_URL + "topic/levelTopic/" + id;
            axios
            .get(url)
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                rows = response.data.data;
                setTopic(rows);
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
    return(

    <>
        <Row>
            <Col className="p-0" md={4}>
                <LeftSidebar/>
            </Col>

            <Col className="p-0" md={8}>
                <div className="subject-categories d-flex w-100 justify-content-center h-100 flex-column">
                    <div className="subject-heading">
                        <h1>Select Topic</h1>
                    </div>
                    <div className="subject-btn-group">
                        <Row>
                        {topic.map(topic => (
                            <Col className="d-flex flex-column" md={6}>
                                <Link to={`/question-answer/${topic.id}`} className="btn btn-success">{topic.title}</Link>
                            </Col>
                            ))}
                            {/* <Col className="d-flex flex-column" md={6}>
                                <Link to='/question-answer' className="btn btn-success">Cell</Link>
                                <Link to='/question-answer' className="btn btn-success">Plants</Link>
                                <Link to='/question-answer' className="btn btn-success">Genes</Link>
                                <Link to='/question-answer' className="btn btn-success">Cell</Link>
                                <Link to='/question-answer' className="btn btn-success">Plants</Link>
                            </Col> */}
                        </Row>
                        

                    </div>
                </div>
            </Col>
        </Row>
    </>
    )
}

export default SelectTopic;