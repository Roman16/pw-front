import React, {useState} from "react"
import {unique, uniqueArrOfObj} from "../../../../utils/unique"
import {Radio} from "antd"
import {SVG} from "../../../../utils/icons"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import {Popconfirm} from 'antd'
import {Spin} from "antd/es"

const TargetsList = ({keywords, onUpdate, targetingType, createData, onValidate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('asins'),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null),
        [validationProcessing, setValidationProcessing] = useState(false)


    const addKeywordsHandler = async (e) => {
        e.preventDefault()

        setValidationProcessing(true)

        try {
            const validKeywords = [...newKeyword.split('\n')
                .filter(item => item !== '')
                .filter(item => item.length < 80)
                .filter(item => !keywords.find(el => el.text.replace(/\s/g, '') === item.replace(/\s/g, '')))
                .map(item => unique(item).join(' '))
                .filter(item => item.match(/\b\w+\b/g).length <= (keywordType === 'exact' ? 10 : 4))
                .map(item => ({
                    text: item,
                    type: keywordType
                }))
            ]

            await onValidate({
                entityType: 'asins',
                asins: [...validKeywords.map(i => i.text)]
            })

            setValidationProcessing(false)


            onUpdate([...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'asins'), 'text'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'categories'), 'text')])

            setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length)
            setValidKeywordsCount(validKeywords.length)

            setNewKeyword('')
        } catch (e) {
            console.log(e)
        }
    }

    const clearKeywordsListHandler = () => {
        onUpdate([])
    }

    const removeKeywordHandler = (index) => {
        onUpdate(keywords.filter((item, itemIndex) => itemIndex !== index))
    }

    return (
        <div className={`negative-keywords keyword-targetings`}>
            <div className="row">
                <form className="col new-keyword" onSubmit={addKeywordsHandler}>
                    <div className="row">
                        <label htmlFor="">Type:</label>

                        <Radio.Group
                            value={keywordType}
                            onChange={({target: {value}}) => setKeywordType(value)}
                            disabled={true}
                        >
                            <Radio value={'asins'}>
                                ASINs
                            </Radio>

                            <Radio value={'categories'}>
                                Categories
                            </Radio>
                        </Radio.Group>
                    </div>

                    <div className="form-group">
                            <textarea
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value)}
                                required
                                placeholder={'Enter your list and separate each item with a new line'}
                                disabled={validationProcessing}
                            />
                    </div>

                    <div className="actions">
                        <button className={'btn default p15 add'} disabled={validationProcessing}>
                            <SVG id={'plus-icon'}/>
                            Add

                            {validationProcessing && <Spin/>}
                        </button>
                    </div>
                </form>

                <div className="col added-keywords">
                    <div className="row">
                        <div className="count"><b>{keywords.length || 0}</b> product targetings</div>
                        {keywords.length > 0 &&
                        <button onClick={clearKeywordsListHandler} disabled={validationProcessing}>Remove All</button>}
                    </div>

                    <div className="keywords-list">
                        <div className="header">
                            <div>
                                Product targetings
                            </div>

                            <div>
                                Type
                            </div>

                            <div>
                                Bid
                            </div>
                        </div>

                        <ul>
                            {keywords.map((keyword, index) => (
                                <li>
                                    <div className="text">
                                        {keyword.text}
                                    </div>

                                    <div className="type">
                                        {keyword.type === 'asins' ? 'ASINs' : 'Categories'}
                                    </div>

                                    <div className="value">
                                        <InputCurrency value={createData.calculatedBid}/>
                                    </div>


                                    <button
                                        className={'btn icon'}
                                        disabled={validationProcessing}
                                        onClick={() => removeKeywordHandler(index)}
                                    >
                                        <SVG id={'remove-filter-icon'}/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TargetsList
