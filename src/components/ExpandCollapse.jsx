import React, { useState } from "react";
import Gear from "components/Gear";
import ChartIcon from "components/ChartIcon";
import { prototype } from "chart.js";

const ExpandCollapse = (props) => {
  const [openedorclosed, updateopenclose] = useState(() => {
    if (!props.opendefault) {
      return "0px";
    } else {
      return "100%";
    }
  });
  function toggledOpenOrClosed(e) {
    let itemHeight = e.target.nextSibling.scrollHeight;
    switch (openedorclosed) {
      case "0px":
        return updateopenclose(itemHeight + "px");
        break;
      case itemHeight + "px":
        return updateopenclose("0px");
        break;
      case "100%":
        return updateopenclose("0px");
        break;
      default:
        return updateopenclose(itemHeight + "px");
        break;
    }
  }

  const titleClass = `expanderTitle + ${props.bg}`
  return (
    <div className="expander">
      <div className={titleClass} onClick={toggledOpenOrClosed}>
        {props.nogear ? "" : <Gear />}
        {props.charticon ? <ChartIcon /> : "" }
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
          }}>
          {props.buttontext}
        </div>
      </div>
    </div>
  );
};

export default ExpandCollapse;
