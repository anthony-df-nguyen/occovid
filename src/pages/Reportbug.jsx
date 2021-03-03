import React, { useEffect, useState } from "react";
import Page from "components/Page";
import ExpandCollapse from "components/ExpandCollapse";
import moment from "moment";
import reportWebVitals from "reportWebVitals";

const Reportbug = (props) => {
  const [array, updateArray] = useState([]);
  const [fullCard, updateFullCard] = useState({
    title: "",
    description: "",
    completed: "",
    parseComplete: "",
    priority: "",
    status: "",
    type: "",
  });
  //console.log("file: Reportbug.jsx ~ line 9 ~ Reportbug ~ array", array)
  const [showGIF, updateGIF] = useState("block");
  const [showUpdates, updateShowUpdates] = useState("hidden");
  const [showFullCard,updateShowFullCard] = useState("none")
  function toggleOpen(e) {
    let cardValue = e.nativeEvent.srcElement.attributes[1].value;
    let cardData = array.filter((row) => row._id === cardValue)[0];

    const theDate = cardData.completed
      ? cardData.completed.slice(0, -1) + "-08:00"
      : false;
    const parseComplete = theDate
      ? moment(new Date(theDate)).calendar()
      : "Not Done";
    const cardObject = {
      title: cardData.title,
      description: cardData.description,
      completed: cardData.completed,
      parseComplete: parseComplete,
      priority: cardData.priority,
      status: cardData.status,
      type: cardData.type,
    };
    updateShowFullCard('block')
    updateFullCard(cardObject);
  }
  moment.locale("en", {
    calendar: {
      lastDay: "[Yesterday]",
      sameDay: "[Today]",
      nextDay: "[Tomorrow at] LT",
      lastWeek: "[Last] dddd",
      nextWeek: "dddd",
      sameElse: "L",
    },
  });
  useEffect(() => {
    let mounted = true;

    if (mounted) {
      const getUpdates = async () => {
        await fetch("https://occovidtaskmongo.vercel.app/api")
          .then((a) => a.json())
          .then((b) => {
            let publicArray = b.filter((b) => !b.hidden && b);
            publicArray.sort((a, c) => {
              return new Date(a.completed) - new Date(c.completed) < 1 ? 1 : -1;
            });
            if (mounted) {
              updateArray(publicArray);
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
        <div style={{textAlign: 'center',marginBottom:'1rem',fontWeight: 300,}}>Click a card in any category to view more detail</div>
      <div id="updateGrid" style={{ visibility: showUpdates }}>
        <ExpandCollapse
          nogear={true}
          title="🥳 New Features and Changelog"
          buttontext="Close">
          <div className="updateFlex">
            {array.map((row, i) => {
              if (row.status === "Completed") {
                //console.log(row.completed)
                let convertDate = row.completed.slice(0, -1) + "-08:00";
                return (
                  <div
                    className="card"
                    key={i}
                    value={row._id}
                    onClick={toggleOpen}>
                    <div className="title">{row.title}</div>
                    <div className="bottom">
                      <div className="type">
                        {" "}
                        {moment(new Date(convertDate)).calendar()}
                      </div>
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
                  <div
                    key={i}
                    className="card"
                    value={row._id}
                    onClick={toggleOpen}>
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
              if (row.status === "Not Started" && row.type !== "Bug") {
                return (
                  <div
                    key={i}
                    className="card"
                    value={row._id}
                    onClick={toggleOpen}>
                    <div className="title">{row.title}</div>
                    <div className="bottom">
                      <div className="type">{row.priority} Priority</div>
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
              if (row.type === "Bug" && row.status === "Not Started") {
                return (
                  <div
                    key={i}
                    className="card"
                    value={row._id}
                    onClick={toggleOpen}>
                    <div className="title">{row.title}</div>
                    <div className="bottom">
                      <div className="type">{row.priority} Priority</div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </ExpandCollapse>

        {/* <ExpandCollapse
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
        </ExpandCollapse> */}
      </div>

      <div id="fullPageCard" style={{display: showFullCard}}>
        <div id="card">
          <div className="title">{fullCard.title}</div>
          <div className="label">Description / Notes</div>
          <div className="description">{fullCard.description}</div>

          <div id="fullCardFlex">
            <div>
              <div className="label">Type</div>
              <div className="text">{fullCard.type}</div>
            </div>
            <div>
              <div className="label">Priority</div>
              <div className="text">{fullCard.priority}</div>
            </div>
            <div>
              <div className="label">Status</div>
              <div className="text">{fullCard.status}</div>
            </div>
            <div>
              <div className="label">Completed</div>
              <div className="text">{fullCard.parseComplete}</div>
            </div>
          </div>
          <button className="globButton" onClick={()=> updateShowFullCard("none")}>Close</button>
        </div>
      </div>
    </Page>
  );
};

export default Reportbug;
