import React from "react"

const ReportFile = ({fileSize, onChange}) => {
    const changeUploadHandler = (name, files) => {
        const file = files.item(files.length - 1)

        if (file.size > fileSize.searchTermsReportMaxFileSizeBytes) {
            alert(`Max size ${fileSize.searchTermsReportMaxFileSizeBytes / 1048576} MB`)
            return
        }

        onChange({[name]: file})
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
                    multiple={false}
                    onChange={({target: {files}}) => changeUploadHandler('searchTerm', files)}
                />
            </div>
            <div className={'form-group'}>
                <label htmlFor="productReport">Choose Product report file to use</label>
                <input
                    name="myFile"
                    id={'myFile'}
                    type="file"
                    accept=".xlsx"
                    multiple={false}
                    onChange={({target: {files}}) => changeUploadHandler('productReport', files)}
                />
            </div>
        </div>
    )
}

export default ReportFile