import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "./firebase.config";
import { ListGroup, Spinner } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

const DockLayout = () => {
  const [doors, setDoors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoors = () => {
    setLoading(true);
    db.collection("doors")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((item) => {
          var data = item.data();
          setDoors((arr) => [...arr, data]);
        });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDoors();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status" variant="success" size="lg">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <ListGroup>
      {doors &&
        doors.map((door) => {
          return (
            <div className="border border-dark" key={door.doorNumber}>
              <Link
                to={`/door-detail/${door.doorNumber}`}
                className="d-inline-block"
              >
                <div className="d-inline-block px-4 py-3">
                  {door.doorNumber}
                </div>
                <div className="d-inline-block px-4 py-3">
                  {door.prefix}
                  {door.trailerNumber}
                </div>
              </Link>
              <div className="d-inline-block float-end px-4 py-3">
                <FormCheckInput />
                <FormCheckLabel>Empty</FormCheckLabel>
              </div>
              <br />
            </div>
            // <ListGroupItem key={door.doorNumber} className="d-inline-block">
            //   <div className="d-inline-block px-4">{door.doorNumber}</div>
            //   <div className="d-inline-block px-4">
            //     {door.prefix}
            //     {door.trailerNumber}
            //   </div>
            //   <div className="d-inline-block float-end">
            //     <FormCheckInput />
            //     <FormCheckLabel>Empty</FormCheckLabel>
            //   </div>
            // </ListGroupItem>
          );
        })}
    </ListGroup>
  );
};

export default DockLayout;
