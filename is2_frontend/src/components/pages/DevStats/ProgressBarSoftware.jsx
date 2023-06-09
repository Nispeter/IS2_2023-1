import React from 'react'

const pct = 32
const softwareName = "Software 1"

function ProgressBarSoftware() {
    return <>
        <div className="d-flex flex-column mb-3 gap-3">
            <div className="d-flex justify-content-between align-items-center gap-2">
                <div className='d-flex gap-3'>
                    <span>imagen</span>
                    <div className="d-flex flex-column">
                        <span className='fw-bold'>Software 1</span>
                        <span className='text-secondary'>7/10 jobs</span>
                    </div>
                </div>


                <div className="progress flex-grow-1 position-relative" role="progressbar" aria-label="Success example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{
                    'height': '40px',
                    'borderRadius': '30px'
                }}>
                    <span className='position-absolute top-50 start-50 translate-middle text-white fs-5'>{pct}%</span>
                    <div className="progress-bar" style={{
                        width: pct + "%",
                        'backgroundColor': '#34C759',
                        'borderRadius': '30px'
                    }}></div>
                </div>

            </div>
        </div>
    </>
}

export default ProgressBarSoftware