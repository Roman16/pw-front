import React, {useState} from "react";
import {SVG} from "../../../../../utils/icons";
import './RelevantKeywords.less';
import {unique} from "../../../../../utils/unique";


const RelevantKeywords = ({keywords, onUpdate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [sectionCollapse, setSectionCollapse] = useState(true),
        [keywordsCount, setKeywordsCount] = useState(null),
        [validKeywordsCount, setValidKeywordsCount] = useState(null);

    const addKeywordsHandler = (e) => {
        e.preventDefault();

        const validKeywords = [...newKeyword.split('\n')
            .filter(item => item !== '')
            .filter(item => item.length < 80)
            .map(item => unique(item).join(' '))
            .filter(item => item.match(/\b\w+\b/g).length <= 10)
        ];


        onUpdate({relevant_keywords: [...new Set([...keywords, ...validKeywords])]});

        setKeywordsCount(newKeyword.split('\n').filter(item => item !== '').length);
        setValidKeywordsCount(validKeywords.length);

        setNewKeyword('');
    };

    const clearKeywordsListHandler = () => {
        onUpdate({relevant_keywords: []});
    };

    const removeKeywordHandler = (keyword) => {
        onUpdate({relevant_keywords: keywords.filter(item => item !== keyword)})
    };

    const switchViewHandler = () => {
        setSectionCollapse(prevState => !prevState);

        if (sectionCollapse) {
            setTimeout(() => {
                document.querySelector('.relevant-keywords').scrollIntoView({
                    block: "start",
                    behavior: "smooth"
                });
            }, 20)
        }
    };


    return (
        <section className={`relevant-keywords ${sectionCollapse ? 'collapsed' : ''}`}>
            <div className="section-header hover" onClick={switchViewHandler}>
                <div className="container">
                    <h2>Relevant keywords <span className={'optional'}>optional</span></h2>

                    <button>
                        <SVG id='select-icon'/>
                    </button>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    <form className="col new-keyword" onSubmit={addKeywordsHandler}>
                        <div className="form-group">
                            <label htmlFor="">Enter the keywords you consider relevant for your product</label>
                            <textarea
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value)}
                                required
                                placeholder={'Enter the keywords you consider relevant for your product, paste one keyword per line'}
                            />
                        </div>

                        <div className="actions">
                            <div
                                className={`added-description ${validKeywordsCount !== keywordsCount ? 'visible' : ''}`}>
                                Some of the keywords were not added because they exceeded the maximum amount of words in
                                it or 80 characters.
                            </div>

                            <button className={'sds-btn default p15'}>
                                <SVG id={'plus-icon'}/>
                                Add Keyword
                            </button>
                        </div>
                    </form>

                    <div className="col added-keywords">
                        <div className="row">
                            <div className="count"><b>{keywords.length || 0}</b> keywords added</div>
                            <button onClick={clearKeywordsListHandler}>Remove All</button>
                        </div>

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
            </div>
        </section>
    )
};

export default React.memo(RelevantKeywords);