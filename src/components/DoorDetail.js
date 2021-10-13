import React, { useState } from "react";
import db from "./firebase.config";

const DoorDetail = ({ door }) => {
  const doorNumber = door.doorNumber;
  const [empty, setEmpty] = useState(door.isEmpty);
  const [breakout, setBreakout] = useState(door.isBreakout);
  const [prefix, setPrefix] = useState(door.prefix);
  const [trailer, setTrailer] = useState(door.trailerNumber);
  const [loading, setLoading] = useState(false);

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
  };

  const clearDoors = () => {
    db.collection("doors").doc(door.id).update({
      doorNumber: doorNumber,
      prefix: "",
      trailerNumber: "",
      isEmpty: false,
      isBreakout: false,
    });
    setPrefix("");
    setTrailer("");
    setEmpty(false);
    setBreakout(false);
  };

  //TODO: Make the output look pretty
  return (
    <>
      <div key={door.id}>{doorNumber}</div>

      <select
        id="prefix"
        value={prefix}
        onChange={(e) => {
          setPrefix(e.target.value);
        }}
      >
        <option value="-"></option>
        <option value="LE">LE</option>
        <option value="OA">OA</option>
        <option value="OE">OE</option>
        <option value="OF">OF</option>
        <option value="SF">SF</option>
        <option value="RL">RL</option>
      </select>
      <input
        id="trailer"
        value={trailer}
        onChange={(e) => {
          setTrailer(e.target.value);
        }}
      />
      <input
        id="empty"
        type="checkbox"
        checked={empty}
        onChange={(e) => {
          setEmpty(!empty);
        }}
      />
      <label htmlFor="empty">Empty</label>
      <input
        id="breakout"
        type="checkbox"
        checked={breakout}
        onChange={(e) => {
          setBreakout(!breakout);
        }}
      />
      <label htmlFor="breakout">B/O</label>

      <button onClick={onUpdate}>Update</button>
      <button onClick={clearDoors}>Clear</button>
    </>
  );
};

export default DoorDetail;
