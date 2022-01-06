import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div>
        <p>
          <Link to="/sourcesfaq">View my sources and other FAQs</Link>
        </p>
      </div>
      <br></br>
      <div>
        <p>
          <Link to="/reportbugs">
            Report bugs, view latest changes, or contact me
          </Link>
        </p>
      </div>
      <h1>
        {" "}
        Site by Anthony Nguyen | &nbsp;
        <a href="https://github.com/skifreetony/occovid">Github</a>
      </h1>
      <p>No affiliation with OC Health Care Agency or any government agency</p>
    </div>
  );
};

export default Footer;
