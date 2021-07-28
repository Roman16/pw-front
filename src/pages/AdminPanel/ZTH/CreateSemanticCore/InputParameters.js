import React from "react"
import {Upload, Button} from 'antd'

const InputParameters = () => {

    return (
        <div className={'choose-input-parameters form-group'}>
            <Upload maxCount={1} showUploadList={false}>
                <label htmlFor="">Choose input-parameters.json file to upload settings</label>
                <Button>Select File</Button>
            </Upload>
        </div>
    )
}

export default InputParameters