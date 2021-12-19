import React, { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import activitiesList from "../../data/dummyData";
import "./styles.css";
function MainScreen() {
  const [show, setShow] = useState(false);
  const [indexValue, setSelectedIndex] = useState("");
  const [selectedActivityName, setSelectedActivityName] = useState("");
  const [selectedActivityDescription, setSelectedActivityDescription] =
    useState("");
  const [selectedActivityCode, setSelectedActivityCode] = useState("");
  const [selectedActivityStatus, setSelectedActivityStatus] = useState("true");

  // Pass data from table to modal
  const handleDataShow = (
    activityName,
    activityDescription,
    activityCode,
    activityStatus,
    index
  ) => {
    console.log(activityCode);
    setSelectedIndex(index);
    setSelectedActivityName(activityName);
    setSelectedActivityDescription(activityDescription);
    setSelectedActivityCode(activityCode);
    setSelectedActivityStatus(activityStatus);
    setShow(true);
  };
  const [activities, setActivities] = useState(activitiesList);
  const handleClose = () => {
    setSelectedActivityDescription("");
    setSelectedIndex("");
    setSelectedActivityCode("");
    setSelectedActivityName("");
    setSelectedActivityStatus("");
    setShow(false);
  };
  const handleShow = () => setShow(true);
  useEffect(() => {
    console.log(activitiesList);
  }, [activities]);
  const onFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
    if (indexValue === "") {
      activitiesList.push(formDataObj);
      setActivities(activitiesList);
    } else {
      activities[indexValue] = formDataObj;
      setActivities(activities);
    }
    handleClose();
  };

  return (
    <div>
      <div className="container buttonContainer mt-3 mb-3">
        <Button variant="primary" onClick={handleShow}>
          Add Activity
        </Button>
      </div>
      <div className="container">
        <Table striped bordered hover className="table">
          <thead>
            <tr className="table-head">
              <th>#</th>
              <th>Name</th>
              <th>Code</th>
              <th>Desciption</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Button
                    variant="link"
                      onClick={() => {
                        handleDataShow(
                          activity.name,
                          activity.description,
                          activity.code,
                          activity.status,
                          index
                        );
                      }}
                    >
                      {activity.name}
                    </Button>
                  </td>
                  <td>{activity.code}</td>
                  <td>{activity.description}</td>
                  <td>{activity.enabled === true ? "Enabled" : "Disabled"}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Activity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={onFormSubmit}>
            <input type="hidden" name="index" value={indexValue} />
            <Form.Group as={Row} className="mb-3" controlId="name">
              <Form.Label column sm="2">
                Name
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="name"
                  type="text"
                  placeholder="Name"
                  defaultValue={
                    selectedActivityName != "" ? selectedActivityName : ""
                  }
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="code">
              <Form.Label column sm="2">
                Code
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  name="code"
                  type="text"
                  placeholder="Code"
                  defaultValue={
                    selectedActivityCode != "" ? selectedActivityCode : ""
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="description">
              <Form.Label column sm="2">
                Des
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  as="textarea"
                  row={6}
                  defaultValue={
                    selectedActivityDescription != ""
                      ? selectedActivityDescription
                      : ""
                  }
                  name="description"
                  type="text"
                  placeholder="Description"
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="status">
              <Form.Label column sm="2">
                Status
              </Form.Label>
              <Col sm="10">
                <Form.Select
                  name="status"
                  aria-label="Status"
                  defaultValue={
                    selectedActivityStatus != "" ? selectedActivityStatus : true
                  }
                >
                  <option value="true">Enabled</option>
                  <option value="false">Disabled</option>
                </Form.Select>
              </Col>
            </Form.Group>
            <Button as="input" type="submit" value="Submit" />
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default MainScreen;
