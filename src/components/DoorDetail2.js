import React, { useState, useEffect } from "react";
import db from "./firebase.config";
import {
  Button,
  Form,
  Row,
  Col,
  Modal,
  InputGroup,
  FloatingLabel,
} from "react-bootstrap";

export const DoorDetail2 = ({ door }) => {
  const doorNumber = door.doorNumber;
  const [empty, setEmpty] = useState(door.isEmpty);
  const [breakout, setBreakout] = useState(door.isBreakout);
  const [arrive, setArrive] = useState(door.isArrive);
  const [status, setStatus] = useState(door.status);
  const [notes, setNotes] = useState(door.notes);
  const [prefix, setPrefix] = useState(door.prefix);
  const [trailer, setTrailer] = useState(door.trailerNumber.toUpperCase());
  const [showToast, setShowToast] = useState(false);
  // const [deleteToast, setDeleteToast] = useState(false);
  // const [isLocked, setIsLocked] = useState(false);
  const [show, setShow] = useState(false);

  // useEffect(() => {
  //   setIsLocked(JSON.parse(window.localStorage.getItem("isLocked")));
  // }, []);

  // useEffect(() => {
  //   window.localStorage.setItem("isLocked", isLocked);
  // }, [isLocked]);

  const onUpdate = async () => {
    const ref = db.collection("doors").doc(door.id);
    await ref.update({
      doorNumber: doorNumber,
      prefix: prefix,
      trailerNumber: trailer,
      isEmpty: empty,
      isBreakout: breakout,
      isArrive: arrive,
      notes: notes,
      status: status,
    });

    setPrefix(prefix);
    setTrailer(trailer);
    setEmpty(empty);
    setBreakout(breakout);
    setArrive(arrive);
    setNotes(notes);
    if (empty) {
      setStatus("Empty");
    } else if (breakout) {
      setStatus("Breakout");
    } else if (arrive) {
      setStatus("Arrive");
    }
    setShowToast(true);
  };

  const clearDoors = () => {
    db.collection("doors").doc(door.id).update({
      doorNumber: doorNumber,
      prefix: "",
      trailerNumber: "",
      isEmpty: false,
      isBreakout: false,
      isArrive: false,
      notes: "",
      status: "",
    });
    setPrefix("-");
    setTrailer("");
    setEmpty(false);
    setBreakout(false);
    setArrive(false);
    setNotes("");
    setStatus("");

    // setDeleteToast(true);
  };

  //TODO: Make the output look pretty...This is more difficult than it seems. Don't judge me.
  return (
    <>
      <Form>
        <Row>
          <Col xs={2}>
            <div key={door.id}>
              <h4>{doorNumber}</h4>
            </div>
          </Col>
          <Col>
            <InputGroup>
              {/* <Form.Label>Trailer</Form.Label> */}
              <Form.Control
                type="text"
                id="trailer"
                placeholder="Trailer"
                value={trailer}
                onChange={(e) => setTrailer(e.target.value)}
              />
              <Button
                variant="outline-success"
                id="btn-update"
                onClick={onUpdate}
              >
                Update
              </Button>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="m-4">
              <p>{status}</p>
            </div>
          </Col>
          <Col>
            <InputGroup>
              <Button
                variant="success"
                className="w-80 mt-4"
                onClick={() => setShow(true)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                className="w-20 mt-4"
                onClick={clearDoors}
              >
                X
              </Button>
            </InputGroup>
          </Col>
        </Row>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title id="door-info">Door: {doorNumber}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Trailer Number</Form.Label>
            <Form.Control
              type="text"
              id="trailer"
              value={trailer}
              onChange={(e) => setTrailer(e.target.value)}
            />
            <Form.Label className="mt-4">Trailer Type</Form.Label>
            <InputGroup>
              <Form.Select
                id="prefix"
                type="select"
                onChange={(e) => setPrefix(e.target.value)}
              >
                <option>{prefix}</option>
                {/* <option value=""></option> */}
                <option value="Pup">Pup</option>
                <option value="Liftgate">Liftgate</option>
                <option value="R+L Equip">R+L Equip</option>
                <option value="Container">Container</option>
                <option value="Purchase">Purchase</option>
              </Form.Select>
            </InputGroup>
            <InputGroup className="mt-3">
              <Form.Label className="my-2">Empty</Form.Label>
              <Form.Check
                inline
                id="empty"
                className="m-2"
                type="checkbox"
                checked={empty}
                onChange={(e) => setEmpty(!empty)}
              />
              <Form.Label className="my-2 ms-4">Breakout</Form.Label>
              <Form.Check
                inline
                id="breakout"
                className="m-2"
                type="checkbox"
                checked={breakout}
                onChange={(e) => setBreakout(!breakout)}
              />
              <Form.Label className="my-2 ms-4">Arrive</Form.Label>
              <Form.Check
                inline
                id="arrive"
                className="m-2"
                type="checkbox"
                checked={arrive}
                onChange={(e) => setArrive(!arrive)}
              />
            </InputGroup>
            <InputGroup>
              <FloatingLabel
                controlId="floating-notes"
                label={notes}
                className="my-4 w-100"
              >
                <Form.Control
                  type="textarea"
                  placeholder="make notes here"
                  onChange={(e) => setNotes(e.target.value)}
                />
              </FloatingLabel>
            </InputGroup>
            <InputGroup className="align-center">
              <Button
                variant="success"
                className="w-80 mt-4"
                id="btn-update"
                onClick={onUpdate}
              >
                Update
              </Button>
              <Button
                variant="danger"
                className="w-20 mt-4"
                onClick={clearDoors}
              >
                X
              </Button>
            </InputGroup>
          </Modal.Body>
        </Modal>
      </Form>
    </>
  );
};

export default DoorDetail2;
