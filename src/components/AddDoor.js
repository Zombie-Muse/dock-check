import db from "./firebase.config";
import { useState } from "react";
import { Form } from "react-bootstrap";

const AddDoor = () => {
  const [newDoorNumber, setNewDoorNumber] = useState("");
  const [newPrefix, setNewPrefix] = useState("");
  const [newTrailerNumber, setNewTrailerNumber] = useState("");
  const [newEmpty, setNewEmpty] = useState(false);
  const [newBreakout, setNewBreakout] = useState(false);
  const [newArrive, setNewArrive] = useState("");

  const onCreate = () => {
    const newDocRef = db.collection("doors").doc();

    db.collection("doors").add({
      id: newDocRef.id,
      doorNumber: newDoorNumber,
      prefix: newPrefix,
      trailerNumber: newTrailerNumber,
      isEmpty: newEmpty,
      isBreakout: newBreakout,
      isArrive: newArrive,
    });
    console.log(newDoorNumber + " " + newTrailerNumber);
  };

  return (
    <>
      <Form>
        <label>
          Door Number
          <input
            type="number"
            name="doorNumber"
            value={newDoorNumber}
            onChange={(e) => setNewDoorNumber(e.target.value)}
          />
        </label>
        <label>
          Prefix
          <input
            type="text"
            name="prefix"
            value={newPrefix}
            onChange={(e) => setNewPrefix(e.target.value)}
          />
        </label>
        <label>
          TrailerNumber
          <input
            type="text"
            name="trailerNumber"
            value={newTrailerNumber}
            onChange={(e) => setNewTrailerNumber(e.target.value)}
          />
        </label>
        <label>
          Empty
          <input
            type="checkbox"
            name="isEmpty"
            checked={newEmpty}
            onChange={(e) => setNewEmpty(!newEmpty)}
          />
        </label>
        <label>
          B/O
          <input
            type="checkbox"
            name="isBreakout"
            checked={newBreakout}
            onChange={(e) => setNewBreakout(!newBreakout)}
          />
        </label>
        <button onClick={onCreate}>Submit</button>
      </Form>
    </>
  );
};

export default AddDoor;
