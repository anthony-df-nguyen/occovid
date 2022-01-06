/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Page from "components/Page";
import moment from 'moment'

export default function Query() {
  const [array, updateArray] = useState([]);
  console.log("🚀 ~ file: Query.jsx ~ line 6 ~ Query ~ array", array);

  useEffect(() => {
    let mounted = true;
    const fetchDates = async () => {
      await fetch("https://occovidtaskmongo.vercel.app/api/checklastupdate")
        .then((a) => a.json())
        .then((b) =>
          b.sort((x, y) =>
            returnNormalName(x.name) > returnNormalName(y.name) ? 1 : -1
          )
        )
        .then((c) => updateArray(c));
    };
    fetchDates();
    return () => {
      mounted = false;
    };
  }, []);

  const returnNormalName = (name) => {
    switch (name) {
      case "occovid_sero_csv":
        return "Serology";
      case "occovid_antigen_csv":
        return "Antigen";
      case "occovid_democase_csv":
        return "Cases by Demographics";
      case "occovid_trigger_csv":
        return "Triggers";
      case "occovid_case_csv":
        return "Cases";
      case "occovid_death_csv":
        return "Deaths";
      case "vacc_totalsummaryv2":
        return "Vaccination Data";
      case "occovid_demodths_csv":
        return "Deaths by Demographic";
      case "vacc_dosebydate":
        return "Vaccine Daily Doses";
      case "occovid_childbyagecase_csv":
        return "Cases by Youth";
      case "VaccbyRate":
        return "Vaccinations by Zip Code";
      case "occovid_blueprint_csv":
        return "CADPH Metrics";
      case "occovid_pcr_csv":
        return "PCR Test";
      case "C19ZIP_TPP1dayrte":
        return "Zip Code Data";
      case "City_C19Cases_childagegrp_supfields":
        return "City Data";
      case "occovid_hospicu_csv":
        return "Hospitalization";
      case "ZipFulParVaxwRace_fivetosixtyfour":
        return "Zip Map Ages 5 - 64";
      case "ZipFulParVaxwRace_65plus":
        return "Zip Map Ages 65+";
      case "ZipFulParVaxwRace_total":
        return "Zip Map All Ages";
      case "vacc_dosesbydates":
        return "Vaccination Doses by Date";
      case "occovid_incidencebyvaxstatus":
        return "Cases by Vaccination Status";
      case "occovid_varagegrp_csv":
        return "Variants by Age Group"
      case "occovid_varweek5_csv_Copy":
        return "Variants Weekly Basis"
      default:
        return "No Source";
    }
  };

  return (
    <Page title="Last ArcGIS Updates">
        <div className="tscroll">
        <table >
        <thead>
          <tr>
            <th>Name</th>
            <th>File Name</th>
            <th>Last Update</th>
            <th>Days Since</th>
          </tr>
        </thead>
        <tbody>
          {array.map((row, i) => {
              const name = returnNormalName(row.name)
              const parseDate = moment(new Date(row.lastUpdate)).format('MMMM Do YYYY, h:mm:ss a')
              const deltainms = new Date() - new Date(row.lastUpdate)
              const delta = parseFloat(deltainms / (1000 * 3600 * 24)).toFixed(1);
              
            return (
              <tr key={i}>
                <td>{name}</td>
                <td>
                  <a href={row.link} target="_blank">
                    {row.name}
                  </a>
                </td>
                <td>{parseDate}</td>
                <td style={{ color: delta > 7 && "red" }}>{delta}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
        </div>
    </Page>
  );
}
