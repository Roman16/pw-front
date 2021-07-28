import React from "react"
import {Button, Upload} from "antd"

const ReportFile = () => {

    return (
        <div className={'choose-report-file form-group'}>
            <Upload
                accept={'.xlsx'}
            >
                <label htmlFor="searchTermReport">Choose Search Term report file to use</label>
                <Button>Select File</Button>
            </Upload>
            <br/>
            <Upload
                accept={'.xlsx'}
            >
                <label htmlFor="productReport">Choose Product report file to use</label>
                <Button>Select File</Button>
            </Upload>
        </div>
    )
}

export default ReportFile