import React from "react";
import Page from "components/Page";
import ExpandCollapse from "components/ExpandCollapse";
import { Link } from "react-router-dom";

const Sources = () => {
  return (
    <div>
      <Page title="Sources and FAQs">
        <ExpandCollapse
          nogear={true}
          title=" ❓ Click to view FAQs"
          buttontext="Close">
          <div id="faq">
            <div className="question">
              "Can you add more detailed breakdowns of 'X'?
            </div>
            <div className="answer">
              I cannot show more detailed breakdowns of things unless the data
              exists, and generally, I am already using the most detailed data
              publicly available
            </div>
            <div className="question">"Can you add 'this feature'?</div>
            <div className="answer">
              I'm happy to look into adding new features if possible. Please
              suggest new ideas (or report bugs) to me at{" "}
              <Link to="/reportbugs">'Bugs, Ideas, and Updates'</Link>
            </div>
            <div className="question">"What does this metric mean?"</div>
            <div className="answer">
              The county's official glossary for the metrics can be found{" "}
              <a
                target="_blank"
                href="https://coronavirus.egovoc.com/oc-covid-19-dashboard-glossary">
                here
              </a>
            </div>
            <div className="question">
              "Are you affiliated with the county?"
            </div>
            <div className="answer">
              No, I am private citizen doing this as a hobby.
            </div>
            <div className="question">"How often is the data updated?"</div>
            <div className="answer">
              The site is linked to the county's database for majority of the
              data, so it gets automatically updated each day when the county
              posts new data. There are days where no data will be updated due
              to the county celebrating a holiday. Other reports like City
              History are from other sources and get updated once a week. The
              school and vaccine data are also updated once a week but I have to
              manually enter the data
            </div>
            <div className="question">
              "Can I share/post this on Facebook/Reddit/etc.?"
            </div>
            <div className="answer">
              Please do! I currently only advertise the site on Twitter.
            </div>
            <div className="question">
              "How do I subscribe/unsubscribe for notifications?"
            </div>
            <div className="answer">
              Click the 'Orange' bell on the bottom left of a page to
              subscribe/unsubscribe. Notifications are supported for Mac and
              Windows for Chrome, Firefox, Edge, and Safari. For mobile, only
              Android is supported. Unfortunately no iPhone support at this
              time. If you have issues subscribing, try clearing your
              cache/cookies and reloading the site.
            </div>
            <div className="question">
              "What language/framework is used to build the site?"
            </div>
            <div className="answer">
              The site is written using ReactJS with my custom CSS and hosted on
              Vercel. The primary charting library used is{" "}
              <a
                href="https://www.npmjs.com/package/react-chartjs-2"
                target="_blank">
                React-ChartJS-2
              </a>
              . The Map view uses{" "}
              <a href="https://react-leaflet.js.org/" target="_blank">
                React Leaflet
              </a>{" "}
              with map tiles from CARTO. The speedometer dials used for CAPDH
              metrics are from{" "}
              <a
                href="https://www.npmjs.com/package/react-d3-speedometer"
                target="_blank">
                React-D3-Speedometer
              </a>
            </div>
          </div>
        </ExpandCollapse>
        <h2
          style={{
            textAlign: "center",
            color: "#009ddb",
            marginBottom: "1rem",
            fontWeight: "300",
          }}>
          Sources
        </h2>
        <table>
          <thead>
            <tr>
              <th>Metric</th>
              <th>Usage</th>
              <th>Source</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <ul style={{ marginLeft: "1rem" }}>
                  <li>Cases details</li>
                  <li>Deaths details</li>
                  <li>Hospitalizations</li>
                  <li>PCR Tests</li>
                  <li>Serology Tests</li>
                  <li>City Cases and Deaths</li>
                  <li>Zip Cases and Deaths</li>
                  <li>City and zip code populations</li>
                  <li>Age Cases and Deaths</li>
                  <li>Race Cases and Deaths</li>
                  <li>Gender Cases and Deaths</li>
                  <li>
                    CADPH Metrics: Case Rate, Tests per 100k, Positivity Rate,
                    Health Equity Rate
                  </li>
                </ul>
              </td>
              <td>
                Used to make majority of all the content. Some things I manually
                calculate like the daily change in hospitalizations or the 7 day
                average for some metrics.
              </td>
              <td>
                Data pulled directly from OC Health Agency ARCGis REST database.
                This is the same database used for their official Dashboard
                <br></br>
                <a
                  target="_blank"
                  href="https://ochca.maps.arcgis.com/apps/opsdashboard/index.html#/cc4859c8c522496b9f21c451de2fedae">
                  Link: Main Dashboard
                </a>
                <br></br>
                <a href="https://ochca.maps.arcgis.com/apps/opsdashboard/index.html#/2a169f85c2254dd7b43f95b095208356">
                  Link: Maps Dashboard
                </a>
              </td>
            </tr>
            <tr>
              <td>Race and age population data</td>
              <td>
                Used to display populations for age and race demographics on the
                'Age', 'Race', and 'Vaccines' page
              </td>
              <td>
                <a
                  target="_blank"
                  href="http://www.ochealthiertogether.org/index.php?module=DemographicData&controller=index&action=index">
                  Link: OC Healthier Together
                </a>
              </td>
            </tr>
            <tr>
              <td>Vaccination data</td>
              <td>Vaccine page</td>
              <td>
                <a
                  target="_blank"
                  href="https://coronavirus.egovoc.com/vaccines-administered-oc">
                  Link: OC Health Care Agency Vaccine Dashboard
                </a>
              </td>
            </tr>
            <tr>
              <td>School data</td>
              <td>Schools page</td>
              <td>
                <a
                  target="_blank"
                  href="https://coronavirus.egovoc.com/coronavirus-in-oc">
                  Link: OC Health Care Agency Dashboard
                </a>
              </td>
            </tr>
            <tr>
              <td>Daily cases by city</td>
              <td> Used to obtain daily cases per city on 'City History'</td>
              <td>
                <a
                  target="_blank"
                  href="https://data-ocpw.opendata.arcgis.com/datasets/772f5cdbb99c4f6689ed1460c26f4b05">
                  Link: OC Open Data: Public OC COVID Cases by City by Day
                </a>
              </td>
            </tr>
            <tr>
              <td>Cases and deaths for other CA counties</td>
              <td>
                {" "}
                Used on 'Compare Counties'. State data for OC ignored in favor
                of using data reported by OC Health Care Agency
              </td>
              <td>
                <a
                  target="_blank"
                  href="https://data.ca.gov/dataset/covid-19-cases/resource/926fd08f-cc91-4828-af38-bd45de97f8c3">
                  Link: CA Open Data Portal: COVID-19 Cases
                </a>
              </td>
            </tr>
            <tr>
              <td>Hospitalizations for other CA counties</td>
              <td>
                {" "}
                Used on 'Compare Counties'. State data for OC ignored in favor
                of using data reported by OC Health Care Agency
              </td>
              <td>
                <a
                  target="_blank"
                  href="https://data.ca.gov/dataset/covid-19-hospital-data/resource/42d33765-20fd-44b8-a978-b083b7542225">
                  Link: CA Open Data Portal: COVID-19 Hospital Data: Hospitals
                  by County
                </a>
              </td>
            </tr>
            <tr>
              <td>Populations for other CA counties</td>
              <td>
                {" "}
                Used on 'Compare Counties' to calculate 'per 100k' data for cases, deaths hospitalizations. Ignoring the OC population estimate and using the one reported by OC Healthier Together instead (source used above in race/age population data)

              </td>
              <td>
                <a
                  target="_blank"
                  href="https://www.dof.ca.gov/Forecasting/Demographics/Estimates/e-1/">
                  Link: CA Dept of Finance Population Estimates (2019/2020)
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </Page>
    </div>
  );
};

export default Sources;
