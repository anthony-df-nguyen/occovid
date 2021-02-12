import React, { useState, useEffect } from "react";
import Menubutton from "./Menubutton";
import Navigation from "./Navigation";

const Header = () => {
  useEffect(() => {
    let button = document.querySelector("#menubutton");
    let navMenu = document.querySelector("#navMenu");
    button.onclick = () => {
      button.classList.toggle("is-active");
      if (button.classList.contains("is-active")) {
        navMenu.classList.add("open");
      } else {
        navMenu.classList.remove("open");
      }
    };
  });

  return (
    <div>
      <div className="header">
        <Menubutton />
        <div className="siteName">OCCOVID</div>
      </div>
      <Navigation />
    </div>
  );
};

export default Header;
