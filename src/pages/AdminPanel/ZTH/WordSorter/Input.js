import React, {useEffect, useState} from "react"

const Input = ({disabled, onAddKeywords}) => {
    const [allKeywords, setAllKeywords] = useState(''),
        [negativeKeywords, setNegativeKeywords] = useState('')


    const addHandler = () => {
        onAddKeywords({
            output: allKeywords
                .split('\n')
                .filter(i => i && i.length > 0)
                .map(i => i.toLowerCase())
                .map((phrase, index) => ({
                    phrase,
                    id: index,
                    keywords: phrase.split(" "),
                    visible: true,
                })),
            negative: negativeKeywords.split('\n').filter(i => i && i.length > 0)
        })
    }

    useEffect(() => {
        if (!disabled) {
            setAllKeywords('')
            setNegativeKeywords('')
        }
    }, [disabled])

    return (<div className="col input">
        <div className="card">
            <div className="block-header">
                <h3>Input</h3>
                <div className="count">{allKeywords.split('\n').filter(i => i && i.length > 0).length}</div>
                <button className="btn default" onClick={addHandler}>add</button>
            </div>

            <div className="form-group">
                <textarea
                    value={allKeywords}
                    onChange={({target: {value}}) => setAllKeywords(value)}
                    disabled={disabled}
                />
            </div>
        </div>

        <div className="card">
            <div className="block-header">
                <h3>Negative Phrases</h3>
                <div className="count">{negativeKeywords.split('\n').filter(i => i && i.length > 0).length}</div>
            </div>

            <div className="form-group">
            <textarea
                value={negativeKeywords}
                onChange={({target: {value}}) => setNegativeKeywords(value)}
                disabled={disabled}
            />
            </div>
        </div>
    </div>)
}

export default Input