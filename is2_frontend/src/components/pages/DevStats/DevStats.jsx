import React, { useState, useEffect } from 'react'
import DoughnutChart from "./DoughnutChart";
import { Chart as ChartJS } from "chart.js/auto";
// import './DevStats.css'
import SoftwareCompletition from './SoftwareCompletition';
import OverdueWork from './OverdueWork';
import Dona from './Dona';
import APIService from '../../services/APIService';
import Cookies from 'js-cookie';
function DevStats() {
    const devId = Cookies.get('id');
    const [datosDevReport,setDatosDevReport] = useState([]);
    const api_service = new APIService();

    useEffect(() => {
        async function fetchData() {
          const response = await api_service.get('dev_reports/${devId}');
          setDatosDevReport(response);
        }
        fetchData();
      }, []); 
    
    const [datosDona, setDatosDona] = useState({
        labels: ["closed", "testing", "pending", "to-do"],
        datasets: [
            {
                label: "Job Status Report",
                // data: JobStatusData.reduce(
                //     (acc, cur) => {
                //     acc[0] += cur.closed;
                //     acc[1] += cur.testing;
                //     acc[2] += cur.pending;
                //     acc[3] += cur.to_do;

                //     return acc;
                //     },
                //     [0, 0, 0, 0]
                // ),
                data: [12, 13, 15, 61]
            },
        ],
    })

    return <>
        <div class="container" style={{ "padding-left": "150px" }}>
            <div class="row">
                <div class="col border border-1 position-relative">
                    <div style={{ padding: "24px" }}>
                        <h4 class="position-absolute top-0 start-0" >Job Status Report</h4>
                        {/* <DoughnutChart charData={datosDona} /> */}
                        <Dona charData={datosDona} />
                    </div>
                </div>
                <div class="col  border border-1 position-relative">
                    <SoftwareCompletition />
                </div>

                <div class="col border border-1 position-relative">
                    <div  style={{ padding: "24px" }}>
                        <h4 class="position-relative top-0 start-0" > Overdue work</h4>
                        <OverdueWork percentageProgress='32' />
                    </div>
                </div>
            </div>
        </div>


    </>
}

export default DevStats