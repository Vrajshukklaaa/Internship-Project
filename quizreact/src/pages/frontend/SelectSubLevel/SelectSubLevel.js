import React, { useEffect, useState } from "react";
import {  Row, Col } from "react-bootstrap";
import LeftSidebar from "../../../../src/components/LeftSidebar"
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";



const SelectSubLevel = () => {
  const navigate = useNavigate();
  const params = useParams();
    const [sublevel, setSubLevel] = useState([]);

    var rows = [];

    useEffect(() => {
      var id = params.id;
      getSubjectByID(id);
      }, []);

      const getSubjectByID = (id) => {
       
        try {
          var url = process.env.REACT_APP_LARAVEL_USER_API_URL + 'sublevel/sub_level/' +id;
            axios
            .get(url)
            .then((response) => {
              console.log(response);
              if (response.status === 200) {
                rows = response.data.data;
                setSubLevel(rows);
                if(response.data.total == 0){
                  navigate(`/select-topic/${id}`)
                }
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
                        <h1>Select Sub Level</h1>
                    </div>
                    <div className="subject-btn-group">
                        <Row>
                            {sublevel.map(sublevel => (
                                <Col className="" md={6}>
                                    <Link to={`/select-topic/${sublevel.id}`} className="btn btn-success w-100">{sublevel.title}</Link> 
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

export default SelectSubLevel;