
import { Button, Card, Col, Form, Row, Modal } from "react-bootstrap";

const SelectCategories = () => {
    return(
        <>
            <div className="subject-categories d-flex w-100 justify-content-center h-100 flex-column">
                <div className="subject-heading">
                    <h1>Select Subject</h1>
                </div>
                <div className="subject-btn-group ">
                    <Row>
                        <Col className="d-flex flex-column" md={6}>
                            <Button variant="success">Maths</Button>
                            <Button variant="success">Physics</Button>
                            <Button variant="success">Chemistry</Button>
                            <Button variant="success">Biology</Button>
                            <Button variant="success">Psychology</Button>
                        </Col>
                        <Col className="d-flex flex-column" md={6}>
                            <Button variant="success">Science</Button>
                            <Button variant="success">Social-Sciense</Button>
                            <Button variant="success">General-Knowledge</Button>
                            <Button variant="success">Chemistry</Button>
                            <Button variant="success">Physics</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}

export default SelectCategories;