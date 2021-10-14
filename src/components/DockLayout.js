import React, { useState, useEffect } from "react";
import db from "./firebase.config";
import { ListGroup, Spinner, Container } from "react-bootstrap";
import DoorDetail from "./DoorDetail";

const DockLayout = () => {
  const [doors, setDoors] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDoors = async () => {
    setLoading(true);
    return db
      .collection("doors")
      .orderBy("doorNumber")
      .onSnapshot((snapshot) => {
        const doorInfo = [];
        snapshot.forEach((doc) => doorInfo.push({ ...doc.data(), id: doc.id }));
        setDoors(doorInfo);
        setLoading(false);
      });
    // const data = await db.collection("doors").orderBy("doorNumber").get();
    // setDoors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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
    <div>
      <Container>
        <ListGroup>
          {doors.map((door) => (
            <ListGroup.Item key={door.id}>
              <DoorDetail door={door} />
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default DockLayout;
