import React from "react";
import { Link } from "react-router-dom";

export default function DockLayout() {
  return (
    <div>
      <h1>
        <Link to="/" style={{ textDecoration: "none" }}>
          Dock Layout
        </Link>
      </h1>
      <p>Here is the dock layout</p>
    </div>
  );
}
