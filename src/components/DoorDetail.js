import React, { useState, useEffect } from "react";
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
import { BsLockFill, BsUnlockFill } from "react-icons/bs";

export const DoorDetail = ({ door }) => {
  const doorNumber = door.doorNumber;
  const [empty, setEmpty] = useState(door.isEmpty);
  const [breakout, setBreakout] = useState(door.isBreakout);
  const [prefix, setPrefix] = useState(door.prefix);
  const [trailer, setTrailer] = useState(door.trailerNumber.toUpperCase());
  const [showToast, setShowToast] = useState(false);
  // const [deleteToast, setDeleteToast] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    setIsLocked(JSON.parse(window.localStorage.getItem("isLocked")));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("isLocked", isLocked);
  }, [isLocked]);

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
    // setDeleteToast(true);
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };

  //TODO: Make the output look pretty...This is more difficult than it seems. Don't judge me.
  return (
    <>
      <Stack gap={4}>
        <Form onSubmit={(e) => e.preventDefault()} disabled={isLocked}>
          <Row>
            <Col xs={2}>
              <div key={door.id}>
                <h4>{doorNumber}</h4>
              </div>
            </Col>

            <Col xs={4}>
              <select
                id="prefix"
                defaultValue={prefix}
                disabled={isLocked}
                onChange={(e) => {
                  setPrefix(e.target.value);
                }}
              >
                <option value="-"></option>
                <option value="Pup">Pup</option>
                <option value="Liftgate">Liftgate</option>
                <option value="R+L Equipment">R+L Equipment</option>
                <option value="Container">Container</option>
                <option value="Purchase">Purchase</option>
                {prefix}
              </select>
            </Col>
            <Col xs={6}>
              <Form.Control
                type="text"
                id="trailer"
                value={trailer}
                disabled={isLocked}
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
                disabled={isLocked}
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
                disabled={isLocked}
                onChange={(e) => {
                  setBreakout(!breakout);
                }}
              />
              <Form.Label htmlFor="breakout">B/O</Form.Label>
            </Col>
            <Col xs>
              <Button
                variant="success"
                size="sm"
                onClick={onUpdate}
                disabled={isLocked}
              >
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
              <CloseButton size="sm" onClick={clearDoors} disabled={isLocked} />
            </Col>
            <Col xs>
              <div className="justify-end">
                {isLocked ? (
                  <BsLockFill onClick={() => setIsLocked(!isLocked)} />
                ) : (
                  <BsUnlockFill onClick={() => setIsLocked(!isLocked)} />
                )}
              </div>
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
