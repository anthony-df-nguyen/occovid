import React, { useState, useContext, useEffect } from 'react';
import { TimeContext } from 'components/context/TimeContext';
import color from 'globalVars/Colors';
import Timeselect from 'components/Timeselect';
import {
  FetchCAMetrics,
  lastCaseRate,
  lastPositiveRate,
  lastHealthEquity,
  lastTestRate
} from 'Datafetch/FetchCAMetrics';
import Chart from 'components/Chart';
import Widget from 'components/Widget';
import ReactSpeedometer from 'react-d3-speedometer';
// import FetchWhatsOpenJson from 'Datafetch/FetchWhatsOpenJson';
import FetchCountyTier from 'Datafetch/FetchCountyTier';
// import BuildTable from 'components/BuildTable';
import Page from 'components/Page';

const WhatsOpen = (props) => {
  const [time, setTime] = useContext(TimeContext);
  const [array, updateArray] = useState([]);
  // const [tableArray, updateTableArray] = useState([]);
  const [maxCaseRate, updateCaseMax] = useState(10);
  const [maxPosRate, updatePosMax] = useState(10);
  const [maxEqRate, updateEqMax] = useState(10);
  const [tier, updateTier] = useState();
  const [tierColor, updatetTierColor] = useState()

  useEffect(() => {
    let a = lastCaseRate > 10 ? lastCaseRate + 2 : 10;
    updateCaseMax(a);
  }, []);
  useEffect(() => {
    let a = lastPositiveRate > 10 ? lastPositiveRate + 2 : 10;
    updatePosMax(a);
  }, []);
  useEffect(() => {
    let a = lastHealthEquity > 10 ? lastHealthEquity + 2 : 10;
    updateEqMax(a);
  }, []);
  const getTierText = () => {
    switch (tier) {
      case '4':
        return 'Widespread (Tier 1)';
      case '3':
        return 'Substantial (Tier 2)';
      case '2':
        return 'Moderate (Tier 3)';
      case '1':
        return 'Minimal (Tier 4)';
      default:
        return "Fetching tier...";
    }
  }
  useEffect(() => {
    switch (tier) {
      case '4':
        updatetTierColor(color.purple);
        break;
      case '3':
        updatetTierColor(color.red);
        break;
      case '2':
        updatetTierColor(color.orange);
        break;
      case '1':
        updatetTierColor(color.yellow);
        break;
      default:
        updatetTierColor(color.white);
        break;
    }
  }, [tier])

  return (

    <div>
      <FetchCountyTier function={updateTier} />
      {/* <FetchWhatsOpenJson function={updateTableArray} tier={tier} /> */}
      <FetchCAMetrics time={time} function={updateArray} />
      <Page title="CADPH Metrics">
        <div className="widgetGrid">
          <Widget
            title={'Current Tier'}
            stat={getTierText()}
            color={tierColor}
          />
          <Widget title={'Daily Case Rate'} stat={lastCaseRate} color={color.yellow} />
          <Widget title={'Test Positivity Rate'} stat={lastPositiveRate + '%'} color={color.red} />
          <Widget title={'Health Equity Quartile %'} stat={lastHealthEquity + '%'} color={color.purple} />
          <Widget title={'Tests per 100k'} stat={lastTestRate} color={color.blue} />
        </div>
        <div className="widgetGrid" style={{ marginTop: '-2rem' }}>
          <div className="gaugeContainer">
            <div className="chartTitle">Adj. Case Rate per 100k</div>
            <ReactSpeedometer
              value={lastCaseRate}
              minValue={0}
              maxValue={maxCaseRate}
              segments={4}
              segmentColors={[color.gold, color.orange, color.red, color.purple]}
              customSegmentStops={[0, 1, 4, 7, maxCaseRate]}
              forceRender={true}
              needleColor={'#999'}
            />
          </div>
          <div className="gaugeContainer">
            <div className="chartTitle">Test Positivity Rate</div>
            <ReactSpeedometer
              value={lastPositiveRate}
              minValue={0}
              maxValue={maxPosRate}
              segments={4}
              segmentColors={[color.gold, color.orange, color.red, color.purple]}
              customSegmentStops={[0, 2, 5, 8, maxPosRate]}
              forceRender={true}
              needleColor={'#999'}
              currentValueText={lastPositiveRate + '%'}
            />
          </div>
          <div className="gaugeContainer">
            <div className="chartTitle">Healthy Equity Quart %</div>
            <ReactSpeedometer
              value={lastHealthEquity}
              minValue={0}
              maxValue={maxEqRate}
              segments={4}
              segmentColors={[color.gold, color.orange, color.red, color.purple]}
              customSegmentStops={[0, 2.2, 5.3, 8, maxEqRate]}
              forceRender={true}
              needleColor={'#999'}
              currentValueText={lastHealthEquity + '%'}
            />
          </div>
        </div>
        <Timeselect />
        <div id="chartGridMax2">
          <Chart
            key="1"
            id="whatopen1"
            switches={['bar', 'line']}
            date={array.map((a) => a.date)}
            data={[array.map((c) => c.dailyCaseRate), array.map((c) => c.average4CaseRate)]}
            fill={[color.red, color.blue]}
            title={'CADPH Daily Case Rate - Tuesdays'}
            label={['Case Rate', '4 Week Avg']}
          >
            <p className="chartNote">Updated each Tuesday</p>
          </Chart>
          <Chart
            key="2"
            id="whatopen2"
            switches={['bar', 'line']}
            date={array.map((a) => a.date)}
            data={[array.map((c) => c.positiveRate), array.map((c) => c.avg4WkPositiveRate)]}
            fill={[color.orange, color.blue]}
            title={'CADPH Positivity Rate - Tuesdays'}
            label={['Positivity Rate', '4 Week Avg']}
          >
            <p className="chartNote">Updated each Tuesday</p>
          </Chart>
          <Chart
            key="3"
            id="whatopen3"
            switches={['bar', 'line']}
            date={array.map((a) => a.date)}
            data={[array.map((c) => c.healthEquity), array.map((c) => c.avg4WkHealthEquity)]}
            fill={[color.purple, color.blue]}
            title={'CADPH Health Equity - Tuesdays '}
            label={['Positivity Rate', '4 Week Avg']}
          >
            <p className="chartNote">Updated each Tuesday</p>
          </Chart>
          <Chart
            key="4"
            id="whatopen4"
            switches={['bar', 'line']}
            date={array.map((a) => a.date)}
            data={[array.map((c) => c.testsPer100k), array.map((c) => c.avg4WkTestRate)]}
            fill={[color.gold, color.blue]}
            title={'CADPH Tests per 100k - Tuesdays'}
            label={['Tests', '4 Week Avg']}
          >
            <p className="chartNote">Updated each Tuesday</p>
          </Chart>
        </div>
        <br />
        {/* <BuildTable
          colName={['Sector', 'Status']}
          rows={tableArray.map((a) => a.name)}
          columns={[tableArray.map((a) => a.desc)]}
        /> */}
      </Page>
    </div>
  );
};

export default WhatsOpen;
