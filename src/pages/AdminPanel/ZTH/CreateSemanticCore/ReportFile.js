import React from "react"

const ReportFile = () => {

    return (
        <div className={'choose-report-file'}>
            <div className={'form-group'}>
                <label htmlFor="searchTermReport">Choose Search Term report file to use</label>
                <input type="file" id="searchTermReport" accept=".xlsx"/>
            </div>
            <div className={'form-group'}>
                <label htmlFor="productReport">Choose Product report file to use</label>
                <input type="file" id="productReport" accept=".xlsx"/>
            </div>
        </div>
    )
}

export default ReportFile