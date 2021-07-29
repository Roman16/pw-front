import React from "react"

const InputParameters = ({onUpload}) => {

    const changeUploadHandler = ({target: {files}}) => {
        const file = files.item(files.length - 1)

        onUpload(file)
    }

    return (
        <div className={'choose-input-parameters form-group'}>
            <label htmlFor="myFile">Choose input-parameters.json file to upload settings</label>
            <input
                name="myFile"
                id={'myFile'}
                type="file"
                accept=".json,application/json"
                multiple={false}
                onChange={changeUploadHandler}
            />
        </div>
    )
}

export default InputParameters