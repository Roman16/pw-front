import React, {useState} from "react"
import {SVG} from "../../../../../utils/icons"
import './RelevantKeywords.less'
import {unique} from "../../../../../utils/unique"
import InformationTooltip from "../../../../../components/Tooltip/Tooltip"


const RelevantKeywords = ({keywords, onUpdate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [sectionCollapse, setSectionCollapse] = useState(true),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null)

    const addKeywordsHandler = () => {
        const validKeywords = [...newKeyword.split('\n')
            .filter(item => item !== '')
            .filter(item => item.length < 80)
            .map(item => unique(item).join(' '))
            .filter(item => item.match(/\b\w+\b/g).length <= 10)
        ]

        onUpdate({relevant_keywords: [...new Set([...keywords, ...validKeywords])]})

        setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length)
        setValidKeywordsCount(validKeywords.length)

        setNewKeyword('')
    }

    const clearKeywordsListHandler = () => {
        onUpdate({relevant_keywords: []})
    }

    const removeKeywordHandler = (keyword) => {
        onUpdate({relevant_keywords: keywords.filter(item => item !== keyword)})
    }

    return (
        <section className={`relevant-keywords edit-block relevant_keywords`}>

            <div className="row header">
                <div className="col">
                    <label htmlFor="">
                        Relevant keywords
                    </label>

                    <p>
                        Add minimum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh donec sed egestas
                    </p>
                </div>

                <div className="col">
                    <div className="row">
                        <div className="count"><b>{keywords.length || 0}</b> keywords added</div>
                        <button onClick={clearKeywordsListHandler}>Remove All</button>
                    </div>
                </div>
            </div>

            <div className="row body">
                <form className="col new-keyword">
                    <div className="form-group">
                        <textarea
                            value={newKeyword}
                            onChange={({target: {value}}) => setNewKeyword(value)}
                            required
                            placeholder={'Type here'}
                        />
                    </div>

                    <div className="actions">
                        <div className={`added-description ${validKeywordsCount !== keywordsCount ? 'visible' : ''}`}>
                            Some of the keywords were not added because they exceeded the maximum amount of words in
                            it or 80 characters.
                        </div>
                    </div>
                </form>

                <div className="col added-keywords">
                    <div className="keywords-list">
                        <div className="header">Keywords</div>
                        <ul>
                            {keywords.map(keyword => (
                                <li>
                                    {keyword}

                                    <i onClick={() => removeKeywordHandler(keyword)}>
                                        <SVG id={'remove-filter-icon'}/>
                                    </i>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row footer">
                <div className="col">
                    <button className={'sds-btn blue p15'} onClick={addKeywordsHandler}>
                        <SVG id={'plus-icon'}/>
                        Add keywords
                    </button>
                </div>
            </div>
        </section>
    )
}

export default React.memo(RelevantKeywords)