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
              let data = results.map((row) => row.attributes);
              let parsed = {};
              data.forEach((row) => {
                parsed[`${row.lineage}`] = row;
              });
              let age011 = [
                parsed.Alpha.a0_11,
                parsed.Beta.a0_11,
                parsed.Delta.a0_11,
                parsed.Omicron.a0_11,
                parsed.Epsilon.a0_11,
                parsed.Gamma.a0_11,
                parsed.Iota.a0_11,
                parsed.Theta.a0_11,
                parsed.Lambda.a0_11,
                parsed.Mu.a0_11,
                parsed.Other.a0_11,
              ];
              let age1217 = [
                parsed.Alpha.a12_17,
                parsed.Beta.a12_17,
                parsed.Delta.a12_17,
                parsed.Omicron.a12_17,
                parsed.Epsilon.a12_17,
                parsed.Gamma.a12_17,
                parsed.Iota.a12_17,
                parsed.Theta.a12_17,
                parsed.Lambda.a12_17,
                parsed.Mu.a12_17,
                parsed.Other.a12_17,
              ];
              let age1834 = [
                parsed.Alpha.a18_34,
                parsed.Beta.a18_34,
                parsed.Delta.a18_34,
                parsed.Omicron.a18_34,
                parsed.Epsilon.a18_34,
                parsed.Gamma.a18_34,
                parsed.Iota.a18_34,
                parsed.Theta.a18_34,
                parsed.Lambda.a18_34,
                parsed.Mu.a18_34,
                parsed.Other.a18_34,
              ];
              let age3554 = [
                parsed.Alpha.a35_54,
                parsed.Beta.a35_54,
                parsed.Delta.a35_54,
                parsed.Omicron.a35_54,
                parsed.Epsilon.a35_54,
                parsed.Gamma.a35_54,
                parsed.Iota.a35_54,
                parsed.Theta.a35_54,
                parsed.Lambda.a35_54,
                parsed.Mu.a35_54,
                parsed.Other.a35_54,
              ];
              let age55_64 = [
                parsed.Alpha.a55_64,
                parsed.Beta.a55_64,
                parsed.Delta.a55_64,
                parsed.Omicron.a55_64,
                parsed.Epsilon.a55_64,
                parsed.Gamma.a55_64,
                parsed.Iota.a55_64,
                parsed.Theta.a55_64,
                parsed.Lambda.a55_64,
                parsed.Mu.a55_64,
                parsed.Other.a55_64,
              ];
              let age65_74 = [
                parsed.Alpha.a65_74,
                parsed.Beta.a65_74,
                parsed.Delta.a65_74,
                parsed.Omicron.a65_74,
                parsed.Epsilon.a65_74,
                parsed.Gamma.a65_74,
                parsed.Iota.a65_74,
                parsed.Theta.a65_74,
                parsed.Lambda.a65_74,
                parsed.Mu.a65_74,
                parsed.Other.a65_74,
              ];
              let age75_84 = [
                parsed.Alpha.a75_84,
                parsed.Beta.a75_84,
                parsed.Delta.a75_84,
                parsed.Omicron.a75_84,
                parsed.Epsilon.a75_84,
                parsed.Gamma.a75_84,
                parsed.Iota.a75_84,
                parsed.Theta.a75_84,
                parsed.Lambda.a75_84,
                parsed.Mu.a75_84,
                parsed.Other.a75_84,
              ];
              let age85 = [
                parsed.Alpha.a85plus,
                parsed.Beta.a85plus,
                parsed.Delta.a85plus,
                parsed.Omicron.a85plus,
                parsed.Epsilon.a85plus,
                parsed.Gamma.a85plus,
                parsed.Iota.a85plus,
                parsed.Theta.a85plus,
                parsed.Lambda.a85plus,
                parsed.Mu.a85plus,
                parsed.Other.a85plus,
              ];
              let finalArray = [age011,age1217,age1834,age3554,age55_64,age65_74,age75_84,age85]
              //console.log("parsed ", parsed);
              if (mounted) {
                props.function(finalArray);
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
