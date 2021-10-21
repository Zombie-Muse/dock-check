import React, { useState, useEffect } from "react";
import db from "./firebase.config";
import {
  ListGroup,
  Spinner,
  Container,
  Alert,
  Form,
  Button,
} from "react-bootstrap";
import { DoorDetail2 } from "./DoorDetail2";
import { useAuth } from "../context/AuthContext";

const DockLayout = () => {
  const [doors, setDoors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState();
  const { currentUser } = useAuth();

  const fetchDoors = async () => {
    try {
      setLoading(true);
      return db
        .collection("doors")
        .orderBy("doorNumber")
        .onSnapshot((snapshot) => {
          const doorInfo = [];
          snapshot.forEach((doc) =>
            doorInfo.push({ ...doc.data(), id: doc.id })
          );
          setDoors(doorInfo);
          setLoading(false);
        });
    } catch {
      setError("Whelp...something messed up. What did you do?");
      // const data = await db.collection("doors").orderBy("doorNumber").get();
      // setDoors(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
  };

  useEffect(() => {
    fetchDoors();
  }, []);

  async function handleSearch(search) {
    console.log(search);
    const searchText = db
      .collection("doors")
      .where("trailerNumber", "===", search);
    const res = await searchText.get();
    console.log(res);
  }

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
      <Container className="">
        <h1>LAX Dock Layout</h1>
        <p>
          <em>Signed in as: {currentUser.email}</em>
        </p>
        {error && <Alert variant="danger">{error}</Alert>}
      </Container>
      <Form className="d-flex align-items-end flex-column mb-4">
        <div className="d-flex align-items-end">
          <Form.Control
            className="d-flex"
            type="search"
            placeholder="Search"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            className=""
            variant="info"
            onClick={() => {
              console.log(search);
              handleSearch(search);
            }}
          >
            Search
          </Button>
        </div>
      </Form>
      <Container>
        <ListGroup>
          {doors.map((door) => (
            <ListGroup.Item key={door.id}>
              <DoorDetail2 door={door} />
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
