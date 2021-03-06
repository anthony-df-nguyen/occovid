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
        .then(b => b.sort((x,y) => new Date (x.lastUpdate) < new Date(y.lastUpdate) ? 1 : -1))
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
        break;
      case "occovid_antigen_csv":
        return "Antigen";
        break;
      case "occovid_democase_csv":
        return "Cases by Demographics";
        break;
      case "occovid_trigger_csv":
        return "Triggers";
        break;
      case "occovid_case_csv":
        return "Cases";
        break;
      case "occovid_death_csv":
        return "Deaths";
        break;
      case "vacc_totalsummary":
        return "Total Vaccine Data";
        break;
      case "occovid_demodths_csv":
        return "Deaths by Demographic";
        break;
      case "vacc_dosebydate":
        return "Vaccine Daily Doses";
        break;
      case "occovid_childbyagecase_csv":
        return "Cases by Youth";
        break;
      case "VaccbyRate":
        return "Vaccinations by Zip Code";
        break;
      case "occovid_blueprint_csv":
        return "CADPH Metrics";
        break;
      case "occovid_pcr_csv":
        return "PCR Test";
        break;
      case "C19ZIP_TPP1dayrte":
        return "Zip Code Data";
        break;
      case "City_C19Cases_childagegrp_supfields":
        return "City Data";
        break;
      case "occovid_hospicu_csv":
        return "Hospitalization";
        break;
      default:
          return "No Source"
        break;
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
                <td>{row.name}</td>
                <td>{parseDate}</td>
                <td>{delta}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
        </div>
    </Page>
  );
}
