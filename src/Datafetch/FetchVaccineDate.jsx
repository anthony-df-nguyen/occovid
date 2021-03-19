import { useEffect } from "react";

const FetchVaccineDate = (props) => {
  return (
    <>
      {useEffect(() => {
        let mounted = true;
        const getUpdate = async () => {
          try {
            await fetch(
              "https://ochca.maps.arcgis.com/sharing/rest/content/items/78884420040949199f3e034c486f1e86/data?"
            )
              .then((a) => a.json())
              .then((b) => {
                const findTheDateWidget = b.widgets.filter(
                  (a) => a.id === "e7e687ef-5aae-4871-9f4a-17552fe03dd4"
                );

                const dateText = findTheDateWidget[0].text;
                var parser = new DOMParser();
                const parseText = parser.parseFromString(dateText, "text/html");
                const finalDate = parseText.querySelector("em em");

                if (mounted) {
                  props.function(finalDate.innerText.slice(0, -1));
                }
              });
          } catch (err) {
            if (mounted) {
              props.function("Could not get last update date");
            }
          }
        };
        if (mounted) {
          getUpdate();
        }
        return () => {
          mounted = false;
        };
      }, [])}
    </>
  );
};

export default FetchVaccineDate;
