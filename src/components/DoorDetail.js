import React, { useState } from "react";
import db from "./firebase.config";
import {
  Button,
  CloseButton,
  Form,
  Row,
  Col,
  Stack,
  Toast,
} from "react-bootstrap";

export const DoorDetail = ({ door }) => {
  const doorNumber = door.doorNumber;
  const [empty, setEmpty] = useState(door.isEmpty);
  const [breakout, setBreakout] = useState(door.isBreakout);
  const [prefix, setPrefix] = useState(door.prefix);
  const [trailer, setTrailer] = useState(door.trailerNumber);
  const [showToast, setShowToast] = useState(false);
  const [deleteToast, setDeleteToast] = useState(false);

  // const prefixOptions = [
  //   { value: "LE", label: "LE" },
  //   { value: "OA", label: "OA" },
  //   { value: "OE", label: "OE" },
  //   { value: "OF", label: "OF" },
  //   { value: "SF", label: "SF" },
  //   { value: "RL", label: "RL" },
  // ];

  const onUpdate = () => {
    db.collection("doors").doc(door.id).update({
      doorNumber: doorNumber,
      prefix: prefix,
      trailerNumber: trailer,
      isEmpty: empty,
      isBreakout: breakout,
    });
    setPrefix(prefix);
    setTrailer(trailer);
    setEmpty(empty);
    setBreakout(breakout);
    setShowToast(true);
  };

  const clearDoors = () => {
    db.collection("doors").doc(door.id).update({
      doorNumber: doorNumber,
      prefix: "",
      trailerNumber: "",
      isEmpty: false,
      isBreakout: false,
    });
    setPrefix("-");
    setTrailer("");
    setEmpty(false);
    setBreakout(false);
    setDeleteToast(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  //TODO: Make the output look pretty...This is more difficult than it seems. Don't judge me.
  return (
    <>
      <Stack gap={4}>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={2}>
              <div key={door.id}>
                <h4>{doorNumber}</h4>
              </div>
            </Col>

            <Col xs={2}>
              <select
                id="prefix"
                defaultValue={prefix}
                onChange={(e) => {
                  setPrefix(e.target.value);
                }}
              >
                <option value="-"></option>
                <option value="LE">LE</option>
                <option value="OA">OA</option>
                <option value="OE">OE</option>
                <option value="OF">OF</option>
                <option value="SF">SF</option>
                <option value="RL">RL</option>
                {prefix}
              </select>
            </Col>
            <Col xs={8}>
              <Form.Control
                type="text"
                id="trailer"
                value={trailer}
                onChange={(e) => {
                  setTrailer(e.target.value);
                }}
              />
            </Col>
          </Row>
          <Row>
            <Col xs>
              <Form.Check
                inline
                id="empty"
                type="checkbox"
                checked={empty}
                onChange={(e) => {
                  setEmpty(!empty);
                }}
              />
              <Form.Label htmlFor="empty">Empty</Form.Label>
            </Col>
            <Col xs>
              <Form.Check
                inline
                id="breakout"
                type="checkbox"
                checked={breakout}
                onChange={(e) => {
                  setBreakout(!breakout);
                }}
              />
              <Form.Label htmlFor="breakout">B/O</Form.Label>
            </Col>
            <Col xs>
              <Button variant="outline-success" size="sm" onClick={onUpdate}>
                Update
              </Button>
            </Col>
            <Col xs>
              <div>
                <Toast
                  onClose={() => setShowToast(false)}
                  show={showToast}
                  delay={3000}
                  autohide
                >
                  <Toast.Header>Updated!</Toast.Header>
                </Toast>
              </div>
            </Col>
            <Col xs>
              <CloseButton size="sm" onClick={clearDoors} />
            </Col>
            {/* <Col xs>
              <div>
                <Toast
                  onClose={() => setDeleteToast(false)}
                  showdel={deleteToast}
                  delay={3000}
                  autohide
                >
                  <Toast.Header>Cleared!</Toast.Header>
                </Toast>
              </div>
            </Col> */}
          </Row>
        </Form>
      </Stack>
    </>
  );
};

export default DoorDetail;
