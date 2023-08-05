import React, { useEffect, useState } from "react";
import {  Row, Col } from "react-bootstrap";
import LeftSidebar from "../../../../src/components/LeftSidebar"
import { Link, useParams } from "react-router-dom";
import axios from "axios";



const SelectSubject = () => {
    const [subject, setSubject] = useState([]);

    var rows = [];

    useEffect(() => {
      getSubjectByID();
      }, []);

      const getSubjectByID = () => {
       
        try {
          var url = process.env.REACT_APP_LARAVEL_USER_API_URL + ("subject/subjectList" );
            axios
            .get(url)
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


    return(

    <>
        <Row>
            <Col className="p-0" md={4}>
                <LeftSidebar/>
            </Col>

            <Col className="p-0" md={8}>
                <div className="subject-categories d-flex w-100 h-100 flex-column">
                    <div className="subject-heading">
                        <h1>Select Subject</h1>
                    </div>
                    <div className="subject-btn-group">
                        <Row>
                            {subject.map(subject => (
                                <Col className="" md={6}>
                                    {/* <Link to='/select-level' type="hidden" className="btn btn-success w-100">{subject.id}</Link>  */}
                                    <Link to={`/select-level/${subject.id}`} className="btn btn-success w-100">{subject.title}</Link> 
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

export default SelectSubject;