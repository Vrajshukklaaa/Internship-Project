import React  from "react";
import LeftSidebar from "../../../../src/components/LeftSidebar"
import { Button, Card, Col, Form, Row} from "react-bootstrap";
import './TryFree.scss';



const TryFree = () => {

  

  return (
    <>
        <Row className="tryle-login">

            <Col className="p-0" md={4}>

                <LeftSidebar/>

            </Col>

            <Col className="p-0" md={8}>

                    <div className="page-main-head free-try-login d-flex w-100 h-100 flex-column">
            <Card>
              <Card.Header as="h5">Try-Free</Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="Email">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="email"
                   
                   
                      name="email"
                      placeholder="Enter email"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                     
                      placeholder="Password"
                      name="password"
                    />
                  </Form.Group>
                  <Button variant="success">Login</Button>
                </Form>
              </Card.Body>
            </Card>
                    </div>

            </Col>

        </Row>
    </>
  );
};

export default TryFree;
