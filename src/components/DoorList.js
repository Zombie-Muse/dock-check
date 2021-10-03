import React, { useState, useEffect } from "react";
import db from "./firebase.config";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import FormCheckLabel from "react-bootstrap/esm/FormCheckLabel";

export default function DoorDetail() {
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
    return <h1>Loading...</h1>;
  }

  const alertClicked = () => {
    console.log("clicked it");
  };

  // const trailerClick = () => {
  //   return <DoorDetail />;
  // };

  return (
    <ListGroup>
      {doors &&
        doors.map((door) => {
          return (
            <ListGroupItem
              key={door.doorNumber}
              className="d-inline-block"
              action
              href="/door-detail"
              onClick={alertClicked}
            >
              <div className="d-inline-block px-4">{door.doorNumber}</div>
              {door.prefix}
              {door.trailerNumber}
              <div className="d-inline-block float-end">
                <FormCheckInput />
                <FormCheckLabel>Empty</FormCheckLabel>
              </div>
            </ListGroupItem>
          );
        })}
    </ListGroup>
  );
}
