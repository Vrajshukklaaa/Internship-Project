import { Card, Row, Col, Form, Button } from "react-bootstrap";
import Sidebar from "../../components/SideBar";

const EditSubjectlevel = () => {
  // getInitialState: function() {
  //   return {value: 'Hello!'};
  // },

  // handleChange: function(event) {
  //   this.setState({value: event.target.value});
  // },
  return (
    <>
      <Sidebar>
        <div className="page-main-head d-flex justify-content-between">
          <h1 className="h4">Edit Questions</h1>
        </div>
        <Form>
          <Row>
            <Col xxl={10} xl={10} lg={12}>
              <Card>
                <Card.Body>
                  <Form.Group className="mb-20" controlId="Full-name">
                    <Row className="align-items-center">
                      <Col lg={3}>
                        <Form.Label>Questions</Form.Label>
                      </Col>
                      <Col lg={9}>
                        <Form.Control
                          type="text"
                          value="What is demand supply?"
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-20" controlId="Full-name">
                    <Row className="align-items-center">
                      <Col lg={3}>
                        <Form.Label>Subject Topic</Form.Label>
                      </Col>
                      <Col lg={9}>
                        <Form.Select>
                          {/* //<option>Select the Subject</option> */}
                          <option selected="true" value="1">
                            Demand and Supply
                          </option>
                          <option value="2">
                            Plants and Renewable Energy{" "}
                          </option>
                          <option value="3">Politics</option>
                          <option value="4">Human Behaviors </option>
                        </Form.Select>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mb-20" controlId="Buzzer-code">
                    <Row className="align-items-center">
                      <Col lg={4}>
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

export default EditSubjectlevel;
