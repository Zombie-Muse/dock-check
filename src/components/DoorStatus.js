const DoorStatus = (props) => {
  function emptyStatus(props) {
    if (props.empty === true)
      return (
        <div style={{ backgroundColor: "green", color: "white" }}>
          {props.status}
        </div>
      );
  }

  function arriveStatus(props) {
    if (props.arrive === true)
      return (
        <div style={{ backgroundColor: "red", color: "white" }}>
          {props.status}
        </div>
      );
  }

  return { arriveStatus, emptyStatus };
};

export default DoorStatus;
