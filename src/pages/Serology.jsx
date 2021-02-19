import React, { useState, useContext } from 'react';
import TimeContext from "components/context/TimeContext";
import color from 'globalVars/Colors'
import Timeselect from 'components/Timeselect';
import { FetchSerology, lastTotalSero, lastDailySero, lastPosSero } from 'Datafetch/FetchSerology'
import Chart from 'components/Chart'
import Widget from "components/Widget"
import Page from 'components/Page'

const Serology = (props) => {
    const { time, setTime } = useContext(TimeContext);
    const [array, updateArray] = useState([]);
    return (
        <div>
            <FetchSerology function={ updateArray } time={ time } />
            <Page title='Serology Tests'
            >

                <div className="widgetGrid">
                    <Widget title={ "Total Serology Tests" } stat={ lastTotalSero }
                        color={ color.blue } />
                    <Widget title={ "Daily Tests Received" } stat={ lastDailySero }
                        color={ color.green } />
                    <Widget title={ "Test Positivity %" } stat={ lastPosSero }
                        color={ color.red } />

                </div>
                <Timeselect />
                <div id="chartGrid">
                    <Chart
                        key="1"
                        id="sero1"
                        date={ array.map(a => a.date) }
                        data={ [array.map(b => b.totalSeroTest)] }
                        fill={ [color.blue] }
                        title={ "Cumulative Serology Tests by Specimen Collection Date" }
                        label={ ["Tests"] }
                        switches={ ['bar', 'line'] }
                    />
                    <Chart
                        key="2"
                        id="sero2"
                        date={ array.map(a => a.date) }
                        data={ [array.map(b => b.dailySeroSpec)] }
                        fill={ [color.green] }
                        title={ "Daily Serology Tests by Specimen Collection Date" }
                        label={ ["Tests"] }
                        switches={ ['bar', 'line'] }
                    />
                    <Chart
                        key="3"
                        id="sero3"
                        date={ array.map(a => a.date) }
                        data={ [array.map(b => b.seroPosPerc)] }
                        fill={ [color.red] }
                        title={ "Serology Positivity %" }
                        label={ ["Tests"] }
                        switches={ ['bar', 'line'] }
                    />
                </div>

            </Page>
        </div>
    );
}

export default Serology;