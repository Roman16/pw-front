import React from "react"

const ReportFile = ({fileSize}) => {
    const changeUploadHandler = () => {

    }

    return (
        <div className={'choose-report-file'}>
            <div className={'form-group'}>
                <label htmlFor="searchTermReport">Choose Search Term report file to use</label>
                <input
                    name="myFile"
                    id={'myFile'}
                    type="file"
                    accept=".xlsx"
                    onChange={changeUploadHandler}
                />
            </div>
            <br/>
            <div className={'form-group'}>

                <label htmlFor="productReport">Choose Product report file to use</label>
                <input
                    name="myFile"
                    id={'myFile'}
                    type="file"
                    accept=".xlsx"
                    onChange={changeUploadHandler}
                />
            </div>
        </div>
    )
}

export default ReportFile