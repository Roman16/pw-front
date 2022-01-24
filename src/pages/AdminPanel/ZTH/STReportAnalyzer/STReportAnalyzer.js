import React, {useEffect, useState} from "react"
import './STReportAnalyzer.less'
import {adminServices} from "../../../../services/admin.services"
import {saveSpreadsheet} from "../../../../utils/saveFile"


const STReportAnalyzer = () => {
    const [processing, setProcessing] = useState(false),
        [inputFiles, setInputFiles] = useState({
            searchTermReport: undefined,
            advertisedProductReport: undefined
        })


    const changeUploadHandler = (name) => ({target: {files}}) => {
        const file = files.item(files.length - 1)

         setInputFiles({
            ...inputFiles,
            [name]: file || undefined
        })
    }

    const submitHandler = async () => {
        setProcessing(true)
        try {
            const requestData = new FormData()

            Object.keys(inputFiles).forEach(key => inputFiles[key] && requestData.set(key, inputFiles[key]))

            const res = await adminServices.analyzeSTReport(requestData)

            saveSpreadsheet(res.analysisResult)
        } catch (e) {
            console.log(e)
        }

        setProcessing(false)
    }


    return (<section className={'st-report-analyzer'}>
        <h2>Search Term Report Analyzer</h2>

        <div className={'choose-input-parameters form-group'}>
            <label htmlFor="myFile1">Choose Search Term report file to analyze</label>
            <input
                name="myFile1"
                id={'myFile1'}
                type="file"
                accept=".xlsx"
                multiple={false}
                onChange={changeUploadHandler('searchTermReport')}
            />
        </div>

        <br/>

        <div className={'choose-input-parameters form-group'}>
            <label htmlFor="myFile2">Choose Advertised Product report file for analysis</label>
            <input
                name="myFile2"
                id={'myFile2'}
                type="file"
                accept=".xlsx"
                multiple={false}
                onChange={changeUploadHandler('advertisedProductReport')}
            />
        </div>

        <br/>

        <button
            className="btn default"
            disabled={processing || !inputFiles.searchTermReport}
            onClick={submitHandler}
        >
            {processing ? 'Analyzing Search Term Report, please wait...' : 'Analyze'}
        </button>
    </section>)
}

export default STReportAnalyzer