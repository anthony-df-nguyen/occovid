import React, { useState } from "react";
import Gear from "components/Gear";

const ExpandCollapse = (props) => {
  const [openedorclosed, updateopenclose] = useState("0px");
  function toggledOpenOrClosed(e) {
    let itemHeight = e.target.nextSibling.scrollHeight;
    switch (openedorclosed) {
      case "0px":
        return updateopenclose(itemHeight + "px");
        break;
      case itemHeight + "px":
        return updateopenclose("0px");
        break;
      default:
        return updateopenclose(itemHeight + "px");
        break;
    }
  }

  return (
    <div className="expander">
      <div className="expanderTitle" onClick={toggledOpenOrClosed}>
        <Gear />
        {props.title}
      </div>
      <div className="expanderContent" style={{ maxHeight: openedorclosed }}>
        <p className="expandContentInstruction">{props.instruct}</p>
        <div className="expandChildren">{props.children}</div>
        <div
          className="standardButton"
          onClick={() => {
            updateopenclose("0px");
            //If there is an additonal function to pass
            if (props.buttonFunction) {
              props.buttonFunction();
            }
          }}
        >
          {props.buttontext}
        </div>
      </div>
    </div>
  );
};

export default ExpandCollapse;
