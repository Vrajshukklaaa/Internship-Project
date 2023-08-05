import React ,{ useEffect, useState }  from "react";
import {  Col, Row } from "react-bootstrap";
import LeftSidebar from "../../../../src/components/LeftSidebar"
import { Link ,  useParams ,useNavigate } from "react-router-dom";    
import axios from "axios";

const SelectLevel = () => {
        const params = useParams();
        const [level, setLevel] = useState([]);
        const navigate = useNavigate();
        // const [sublevel, setSubLevel] = useState([]);
        var rows = [];
    
        useEffect(() => {
            var id = params.id;
            getSubjectLevel(id);
          }, []);
    
          const getSubjectLevel = (id) => {
            try {
              var url = process.env.REACT_APP_LARAVEL_USER_API_URL + "level/subjectLevel/" + id;
                axios
                .get(url)
                .then((response) => {
                  console.log(response);
                  if (response.status === 200) {
                    rows = response.data.data;
                    setLevel(rows);
                   
                    //  console.log(response.data.total );
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
                <div className="subject-categories d-flex w-100 h-100 flex-column">
                    <div className="subject-heading">
                        <h1>Select Level</h1>
                    </div>
                    <div className="subject-btn-group ">
                        <Row>
                        {level.map(level => (
                            <Col className="d-flex flex-column">
                                
                                <Link to={`/select-sub-level/${level.id}`} className="btn btn-success">{level.title}</Link>
                            </Col>
                              ))}  
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
    </>
    )
}

export default SelectLevel;