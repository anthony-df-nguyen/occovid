import { variantAges } from "globalVars/Sources";
import { useEffect } from "react";

let thisDataArray = [];

const FetchVariantAges = (props) => {
  return (
    <>
      {useEffect(() => {
        console.log("running the variant ages fetcher");
        let mounted = true;
        const grabData = async () => {
          thisDataArray = [];
          await fetch(variantAges)
            .then((response) => response.json())
            .then((grab) => grab.features)
            .then((results) => {
              const data = results[0].attributes;
              if (mounted) {
                props.function(data);
              }
            });
        };
        if (mounted) {
          try {
            grabData();
          } catch (err) {
            console.log("could not fetch weekly variant data");
            console.log(err);
          }
        }
        return () => {
          //console.log('cleaning up Fetch Cases')
          mounted = false;
        };
      }, [props.time])}
    </>
  );
};

export { FetchVariantAges };
