import React from "react"

const InputParameters = () => {

    return (
        <div className={'choose-input-parameters form-group'}>
            <label htmlFor="">Choose input-parameters.json file to upload settings</label>
            <input type="file" id="file" accept=".json,application/json"/>
        </div>
    )
}

export default InputParameters