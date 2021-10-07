import React, { useState, useEffect } from "react";
import db from "./firebase.config";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";

const DoorDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [doorInfo, setDoorInfo] = useState([]);
  const doors = db.collection("doors");
  const info = doors.where("doorNumber", "==", { id }).get();

  const fetchTrailerInfo = () => {
    setLoading(true);
    console.log({ id });
    console.log(info.trailerNumber);

    // doors;
    db.collection("doors")
      .where("doorNumber", "==", { id })
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          // var data = doc.data();
          // setDoorInfo((arr) => [...arr, data]);
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchTrailerInfo();
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
      <h2>Door - {id}</h2>
      <h3>
        {doorInfo.prefix}
        {doorInfo.trailerNumber}
      </h3>
      <p>Empty: {doorInfo.isEmpty}</p>
    </div>
  );
};

export default DoorDetail;
