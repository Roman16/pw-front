import React from "react"

const Input = ({inputFields, disabled, onChange, onAddKeywords}) => {
    return (<div className="col input">
        <div className="card">
            <div className="block-header">
                <h3>Input</h3>
                <div className="count">{inputFields.relevant.split('\n').filter(i => i && i.length > 0).length}</div>
                <button className="btn default" onClick={onAddKeywords} disabled={disabled}>add</button>
            </div>

            <div className="form-group">
                <textarea
                    value={inputFields.relevant}
                    onChange={({target: {value}}) => onChange('relevant', value)}
                    disabled={disabled}
                />
            </div>
        </div>

        <div className="card">
            <div className="block-header">
                <h3>Negative Phrases</h3>
                <div className="count">{inputFields.negative.split('\n').filter(i => i && i.length > 0).length}</div>
            </div>

            <div className="form-group">
            <textarea
                value={inputFields.negative}
                onChange={({target: {value}}) => onChange('negative', value)}
                disabled={disabled}
            />
            </div>
        </div>
    </div>)
}

export default Input