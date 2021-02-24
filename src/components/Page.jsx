import React, { useEffect } from "react";
import Footer from "components/Footer";
import Lastupdate from "components/Lastupdate";
import BackToTop from "components/BackToTop";

const Page = (props) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const generateUpdateDate = (x) => {
    if (x !== "Vaccinations" && x !== "School Cases" && x !== "City History" && x !== "Updates") {
      return <Lastupdate />;
    }
  };

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});

  };

  document.title = props.title;

  useEffect(() => {
    const backTopButton = document.getElementById("backToTopButton");
    const handleScroll = () => {
      let scrollHeight = window.scrollY;
      if (scrollHeight > 400) {
        backTopButton.style.display = "block";
      } else {
        backTopButton.style.display = "none";
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <div className="page">
        <h1 className="pageTitle">{props.title}</h1>
        {generateUpdateDate(props.title)}
        {props.children}
        <div className="backToTop" id="backToTopButton" onClick={scrollToTop}>
          <BackToTop id="arrow" />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
