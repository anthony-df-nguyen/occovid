import React, { useState } from "react";
import Navigation from "./Navigation";
import "../cssmodular/burger.css";

const Menubutton = () => {
  return (
    <button
      id="menubutton"
      className="hamburger hamburger--arrow"
      type="button"
    >
      <span className="hamburger-box ">
        <span className="hamburger-inner"></span>
      </span>
    </button>
  );
};

export default Menubutton;
