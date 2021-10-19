import { useState } from "react";
import { door } from "./DoorDetail2";
import db from "./firebase.config";

const DoorStatus = ({ door }) => {
  const status = door.status;
  return <div>Door Status: {status}</div>;
};

export default DoorStatus;
