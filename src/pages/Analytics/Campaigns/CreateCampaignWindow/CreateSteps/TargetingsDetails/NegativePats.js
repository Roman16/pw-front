import React, {useState} from "react"
import {SVG} from "../../../../../../utils/icons"
import {unique, uniqueArrOfObj} from "../../../../../../utils/unique"
import {Popconfirm} from "antd"

const NegativePats = ({keywords, onUpdate, disabled}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [keywordType, setKeywordType] = useState('exact')


    const addKeywordsHandler = (e) => {
        e.preventDefault()

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

        onUpdate({negative_pats: [...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'exact'), 'text'), ...uniqueArrOfObj([...keywords, ...validKeywords].filter(item => item.type === 'phrase'), 'text')]})
        setNewKeyword('')
    }

    const clearKeywordsListHandler = () => {
        onUpdate({negative_pats: []})
    }

    const removeKeywordHandler = (index) => {
        onUpdate({negative_pats: keywords.filter((item, itemIndex) => itemIndex !== index)})
    }

    return (
        <div className={`negative-keywords negative-pats ${disabled ? 'disabled' : ''}`}>

            <div className="row">
                <form className="col new-keyword" onSubmit={addKeywordsHandler}>
                    <h3>Negative PATs</h3>

                    <div className="form-group">
                            <textarea
                                disabled={disabled}
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value)}
                                required
                                placeholder={'Enter your list and separate each item with a new line'}
                            />
                    </div>

                    <div className="actions">
                        <button disabled={disabled} className={'btn default p15 add'}>
                            <SVG id={'plus-icon'}/>
                            Add Keyword
                        </button>
                    </div>
                </form>

                <div className="col added-keywords">
                    <div className="row">
                        <div className="count"><b>{keywords.length || 0}</b> ASINs added</div>
                        <button disabled={disabled} onClick={clearKeywordsListHandler}>Remove All</button>
                    </div>

                    <div className="keywords-list">
                        <div className="header">
                            <div>
                                ASIN
                            </div>
                        </div>

                        <ul>
                            {keywords.map((keyword, index) => (
                                <li>
                                    <div className="text">
                                        {keyword.text}
                                    </div>

                                    <Popconfirm
                                        title="Are you sure to delete this keyword?"
                                        onConfirm={() => removeKeywordHandler(index)}
                                        getPopupContainer={triggerNode => document.querySelector('.ant-modal-body')}
                                        okButtonProps={{className: 'default'}}
                                        cancelButtonProps={{className: 'white'}}
                                        placement="topRight"
                                        okText="Yes"
                                        cancelText="No"
                                    >
                                        <button className={'btn icon'}>
                                            <SVG id={'remove-filter-icon'}/>
                                        </button>
                                    </Popconfirm>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NegativePats
