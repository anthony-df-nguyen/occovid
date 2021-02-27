import React, { useEffect, useState } from "react";
import Page from "components/Page";
import ExpandCollapse from "components/ExpandCollapse";

const Reportbug = (props) => {
  const [array, updateArray] = useState([]);
  const [showGIF, updateGIF] = useState("block");
  const [showUpdates, updateShowUpdates] = useState("hidden");
  function toggleOpen(e) {
    let itemHeight = e.clientY + "px";

    if (e.target.style.overflow == "hidden" || e.target.style.overflow == "") {
      e.target.style.maxHeight = itemHeight;
      e.target.style.overflow = "visible";
    } else {
      e.target.style.maxHeight = "6rem";
      e.target.style.overflow = "hidden";
    }
  }

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const getUpdates = async () => {
        await fetch("https://announcement-api.vercel.app/api/updates")
          .then((a) => a.json())
          .then((b) => {
            b.sort((a, c) => {
              //   console.log(new Date(a))
              //   console.log(new Date(c))
              return new Date(a.date) - new Date(c.date) < 1 ? 1 : -1;
            });
            if (mounted) {
              updateArray(b);
              updateGIF("none");
              updateShowUpdates("visible");
            }
          });
      };
      getUpdates();
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <Page title="Updates">
      <div className="formTitle">
        Have questions?{" "}
        <a href="mailto: anthonydfnguyen@gmail.com"> Email me</a>
      </div>

      <ExpandCollapse
        nogear={true}
        title="🪳 Click here to report a bug or make a suggestion"
        buttontext="Close">
        <div id="googleForm">
          <p>
            Please note, I can only show more data if it's publicly available.
            If you have a data source, please refer me to it.
          </p>
          <form
            action="https://docs.google.com/forms/u/0/d/e/1FAIpQLScOtQjpnqcxaXju6gnSghVyLi4BRIj74u-5Un3_H3vki5y_Cw/formResponse"
            method="POST">
            <label></label>
            <textarea
              name="entry.655858757"
              placeholder="Report a bug(s). Please include which browser you are using and platform (iOS/Android/Windows/Mac)"></textarea>
            <textarea
              name="entry.520929852"
              placeholder="Any suggestions or ideas?"></textarea>
            <button className="globButton" type="submit">
              Submit
            </button>
          </form>
        </div>
      </ExpandCollapse>

      <div style={{ display: showGIF }} className="loading">
        <img
          className="loadingGIF"
          src="https://media.tenor.com/images/e9666fa015f403a882f069b9234995cc/tenor.gif"
          alt=""
        />
        <p>Loading Updates</p>
      </div>

      <div id="updateGrid" style={{ visibility: showUpdates }}>
        <ExpandCollapse
          nogear={true}
          title="🥳 New Features and Changelog"
          buttontext="Close">
          <div className="updateFlex">
            {array.map((row, i) => {
              if (row.status === "Done") {
                return (
                  <div className="card" key={i} onClick={toggleOpen}>
                    <div className="title">{row.title}</div>
                    <div className="bottom">
                      <div className="type">{row.type}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </ExpandCollapse>
        <ExpandCollapse nogear={true} title="💪 In Progress" buttontext="Close">
          <div className="updateFlex">
            {array.map((row, i) => {
              if (row.status === "In Progress") {
                return (
                  <div key={i} className="card" onClick={toggleOpen}>
                    <div className="title">{row.title}</div>
                    <div className="bottom">
                      <div className="type">{row.type}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </ExpandCollapse>
        <ExpandCollapse
          nogear={true}
          title="👨‍💻 To Do List and Ideas"
          buttontext="Close">
          <div className="updateFlex">
            {array.map((row, i) => {
              if (row.status === "To Do") {
                return (
                  <div key={i} className="card" onClick={toggleOpen}>
                    <div className="title">{row.title}</div>
                    <div className="bottom">
                      <div className="type">{row.priority}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </ExpandCollapse>
        <ExpandCollapse nogear={true} title="🪳 Known Bugs" buttontext="Close">
          <div className="updateFlex">
            {array.map((row, i) => {
              if (row.status === "Known Bugs") {
                return (
                  <div key={i} className="card" onClick={toggleOpen}>
                    <div className="title">{row.title}</div>
                    <div className="bottom">
                      <div className="type">{row.priority}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </ExpandCollapse>

        <ExpandCollapse
          nogear={true}
          title="💌 Responding to Suggestions"
          buttontext="Close">
          <div className="updateFlex">
            {array.map((row, i) => {
              if (row.status === "Suggestion") {
                return (
                  <div key={i} className="card" onClick={toggleOpen}>
                    <div className="title">{row.title}</div>
                    <div className="detail">{row.detail}</div>
                    <div className="bottom">
                      <div className="type">{row.type}</div>
                      <div className="date">{row.date}</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </ExpandCollapse>
      </div>
    </Page>
  );
};

export default Reportbug;
