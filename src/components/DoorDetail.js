import React, { useState, useEffect } from "react";
import db from "./firebase.config";
import { collection, doc } from "firebase";

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

  return (
    <div>
      {doors &&
        doors.map((door) => {
          return (
            <div>
              <h4>{door.doorNumber}</h4>
              <h4>
                {door.prefix}
                {door.trailerNumber}
              </h4>
            </div>
          );
        })}
    </div>
  );
}
