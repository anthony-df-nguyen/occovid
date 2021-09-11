let today = new Date();

const dayOfWeek = today.getDay();

let lastTuesday = today;

// //If it isnt Sunday or Monday
// if (dayOfWeek !== 2 && dayOfWeek !== 0 && dayOfWeek !== 1) {
//   console.log(
//     "%cToday is Not a Sunday, Monday, or Tuesday",
//     "color: #fff; background: #009ddb;font-size:20px"
//   );
//   const delta = dayOfWeek - 2;
//   console.log(
//     `Today is ${today.toLocaleString()} which is the ${dayOfWeek} day of the week or ${delta} day(s) away from Tuesday`
//   );
//   lastTuesday = new Date(today.setDate(today.getDate() - delta));
//   console.log("The date of the last Tuesday is: ", lastTuesday);
// }
// //If a Sunday
// else if (dayOfWeek === 0) {
//   console.log("%cToday is Sunday", "color: #fff; background: #009ddb;font-size:20px");
//   lastTuesday = new Date(today.setDate(today.getDate() - 5));
//   console.log("The date of the last Tuesday is ", lastTuesday);
// }
// //If Monday
// else if (dayOfWeek === 1) {
//   console.log(
//     "%cToday is Monday",
//     "color: #fff; background: #009ddb;font-size:20px"
//   );
//   lastTuesday = new Date(today.setDate(today.getDate() - 6));
//   console.log("The date of the last Tuesday is: ", lastTuesday);
// }

const tomorrow = new Date(lastTuesday);

tomorrow.setDate(tomorrow.getDate() + 1);
let tomorrowday = tomorrow.getDate();
let tomorrowsmonth = tomorrow.getMonth() + 1;
let todaysyear = 2021;
console.log(
  "%cFetching county data with dates < than " +
    tomorrowsmonth +
    "/" +
    tomorrowday +
    "/" +
    todaysyear,
  "color: #009ddb; background: #f3f3f3;font-size:16px"
);

// Cumulative Total, SCF, Jail, Homeless Cases, Deaths by Reported and Specimen Collection
const CasesURL =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_case_csv/FeatureServer/0//query?where=Date%3Etimestamp+%273%2F3%2F2020%27+AND+Date%3Ctimestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

const AntigenURL =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_antigen_csv/FeatureServer/0//query?where=Date%3Etimestamp+%273%2F3%2F2020%27+AND+Date%3Ctimestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

// Cumulative Total, SNF, Jail Deaths by Reported and Date of Death
const DeathsURL =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_death_csv/FeatureServer/0/query?where=Date%3Etimestamp+%273%2F3%2F2020%27+AND+Date%3Ctimestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

// PCR Tests bny Report Date and Specimen Collection Date. Positive and Negative Tests
const TestsURL =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_pcr_csv/FeatureServer/0//query?where=Date%3Etimestamp+%273%2F3%2F2020%27+AND+Date%3Ctimestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F " +
  todaysyear +
  " %27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

const SeroTestURL =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_sero_csv/FeatureServer/0/query?where=Date%3Etimestamp+%273%2F3%2F2020%27+AND+Date%3Ctimestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

// Historical Hospitalizaed and ICU
const HosURL =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/arcgis/rest/services/occovid_hospicu_csv/FeatureServer/0//query?where=date+%3C+timestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

//CA Open Data Orange County Beds
const OCBedsURL = `https://data.ca.gov/api/3/action/datastore_search?resource_id=42d33765-20fd-44b8-a978-b083b7542225&q=orange&limit=1000`;

// CA DPH Data for Case Rate, Testing Positivy, Hosit Change, ICU beds available, vents available
const HosTriggerURL =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_trigger_csv/FeatureServer/0//query?where=date+%3E+timestamp+%2703%2F03%2F2020%27+AND+date+%3C+timestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

const CAMetrics =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_blueprint_csv/FeatureServer/0//query?where=date+%3E+timestamp+%2703%2F03%2F2020%27+AND+date+%3C+timestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

// Detailed Case info by Demographics Age, Sex, Race
const CaseDemographics =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_democase_csv/FeatureServer/0//query?where=date+%3E+timestamp+%2703%2F03%2F2020%27+AND+date+%3C+timestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

// Detailed Death info by Demographics Age, Sex, Race
const DeathDemographics =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_demodths_csv/FeatureServer/0/query?where=date+%3E+timestamp+%2703%2F03%2F2020%27+AND+date+%3C+timestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

// City Data for City Cases and City Deaths
const CityDataURL =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/VIEWLAYER_Orange_County_Cities_COVID19_Cases_with_Child_Age_Groups/FeatureServer/0/query?where=City+%3C%3E+NULL&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

//City Data with GeoJson for Map View
const CityDataWithGeo =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/VIEWLAYER_Orange_County_Cities_COVID19_Cases_with_Child_Age_Groups/FeatureServer/0/query?where=0%3D0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=";

//Zip Data with GeoJson for Map View
const ZipDataWithGeo =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/C19ZIP_TPP1dayRate_VIEWLAYER/FeatureServer/0/query?where=0%3D0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=";

const ZipData =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/C19ZIP_TPP1dayRate_VIEWLAYER/FeatureServer/0/query?where=0%3D0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=ZIP%2C+tot_cas%2C+tot_casrate%2Cpop%2Ctot_dth%2Ctot_dthrate&returnGeometry=false&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

const YouthCases =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_childbyagecase_csv/FeatureServer/0/query?where=0%3D0&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

const lastUpdate =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/update_date_csv/FeatureServer/0/query?where=0%3D0&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

const dailyDoses =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/vacc_dosesbydates/FeatureServer/0/query?where=0%3D0&objectIds=&time=&resultType=none&outFields=valid_admin%2Cvac_date&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=vac_date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

const zipVaxMap =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/VIEWLAYER_C19VaccinationRatesbyZIP/FeatureServer/0/query?where=0%3D0&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&returnCentroid=false&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pgeojson&token=";

const vaccineVendor =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/vacc_totalsummary/FeatureServer/0//query?where=ObjectId+%3E+43+AND+category+%3C%3E+%27colvar1%27+AND+category+%3C%3E+%27colvar2%27+AND+category+%3C%3E+%27colvar3%27+AND+category+%3C%3E+%27colvar4%27+AND+category+%3C%3E+%27colvar5%27&objectIds=&time=&resultType=none&outFields=category%2C+num_totalvalid&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

const casebyVaxStatus =
  "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_incidencebyvaxstatus/FeatureServer/0//query?where=Date%3Etimestamp+%273%2F3%2F2020%27+AND+Date%3Ctimestamp+%27" +
  tomorrowsmonth +
  "%2F" +
  tomorrowday +
  "%2F" +
  todaysyear +
  "%27&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=date&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

  const variantWeek =
    "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_varweek4_csv/FeatureServer/0/query?where=0%3D0&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

  const variantAges =
    "https://services2.arcgis.com/LORzk2hk9xzHouw9/ArcGIS/rest/services/occovid_varagegrp_csv/FeatureServer/0/query?where=0%3D0&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=";

export {
  CasesURL,
  AntigenURL,
  DeathsURL,
  TestsURL,
  SeroTestURL,
  HosURL,
  OCBedsURL,
  HosTriggerURL,
  CAMetrics,
  YouthCases,
  CaseDemographics,
  DeathDemographics,
  CityDataURL,
  CityDataWithGeo,
  ZipDataWithGeo,
  ZipData,
  lastUpdate,
  dailyDoses,
  zipVaxMap,
  vaccineVendor,
  casebyVaxStatus,
  variantWeek,
  variantAges,
};
