import React, { useState, useEffect } from "react";
import db from "./firebase.config";
import { Spinner } from "react-bootstrap";
import { useParams } from "react-router";

const DoorDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [doorInfo, setDoorInfo] = useState([]);

  const fetchTrailerInfo = () => {
    setLoading(true);
    const details = [];
    const subscriber = db
      .collection("doors")
      .where("trailerNumber", "==", { id })
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          details.push({ ...doc.data(), key: doc.doorNumber });
        });
      });
    setDoorInfo(details);
    setLoading(false);
    console.log(details);
    console.log({ id });
    return () => subscriber();
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
      <h1>Door - {id}</h1>
      {doorInfo &&
        doorInfo.map((info) => {
          return (
            <div key={doorInfo.key}>
              <h2 key={doorInfo.key}>{doorInfo.prefix}</h2>
              <p key={doorInfo.key}>{doorInfo.trailerNumber}</p>
            </div>
          );
        })}
    </div>
  );
};

export default DoorDetail;
