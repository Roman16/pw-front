import React, {useState} from "react"
import TextArea from "antd/es/input/TextArea"
import './AsinsSorter.less'

const AsinsSorter = () => {
    const [fieldValue, setFieldValue] = useState(''),
        [allAsins, setAllAsins] = useState([])

    const asinImageUrl = asin => `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=${asin}&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=SL150`

    const addAsinsHandler = async () => {
        await setAllAsins([...allAsins, ...fieldValue
            .split('\n')
            .map(i => i.trim())
            .filter(i => i !== '')
            .map(i => /^asin="(.*)"$/i.test(i) ? i.substring(
                i.lastIndexOf('="') + 2,
                i.lastIndexOf('"')
            ) : i)
            .map(i => i.toUpperCase())
        ])

        setFieldValue('')
    }

    const resetAllHandler = () => {
        setAllAsins([])
        setFieldValue('')
    }

    const copyAllAsins = () => {
        navigator.clipboard.writeText(allAsins.map(i => `asin="${i}"`).join('\n'))
    }

    return (
        <section className={'asins-sorter'}>
            <div className="col enter-asins">
                <div className="actions">
                    <button className="btn default" onClick={resetAllHandler}>
                        Reset All
                    </button>

                    <button className="btn default" onClick={addAsinsHandler} disabled={fieldValue.trim().length === 0}>
                        add
                    </button>
                </div>

                <div className="form-group">
                    <TextArea
                        value={fieldValue}
                        onChange={({target: {value}}) => setFieldValue(value)}
                    />
                </div>
            </div>

            <div className="col all-asins">
                <div className="actions">
                    <button className="btn default" onClick={copyAllAsins}>
                        Copy All
                    </button>

                    <button className="btn default" onClick={copyAllAsins}>
                        Copy Positives
                    </button>
                </div>

                <ul>
                    {allAsins.map(asin => <li className="asin">
                        <div className="image">
                            <img src={asinImageUrl(asin)} alt=""/>
                        </div>
                        <p>{asin}</p>
                    </li>)}
                </ul>
            </div>

        </section>
    )
}

export default AsinsSorter
