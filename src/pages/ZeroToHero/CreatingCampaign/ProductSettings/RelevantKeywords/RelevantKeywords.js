import React, {useState} from "react";
import {SVG} from "../../../../../utils/icons";
import './RelevantKeywords.less';


const RelevantKeywords = ({keywords, onUpdate}) => {
    const [newKeyword, setNewKeyword] = useState(''),
        [sectionCollapse, setSectionCollapse] = useState(true);

    const addKeywordsHandler = (e) => {
        e.preventDefault();

        onUpdate({relevant_keywords: [...keywords, ...newKeyword.split('\n').filter(item => item !== '')]});
        setNewKeyword('');
    };

    const clearKeywordsListHandler = () => {
        onUpdate({relevant_keywords: []});
    };

    const removeKeywordHandler = (keyword) => {
        onUpdate({relevant_keywords: keywords.filter(item => item !== keyword)})
    };

    return (
        <section className={`relevant-keywords ${sectionCollapse ? 'collapsed' : ''}`}>
            <div className="section-header hover" onClick={() => setSectionCollapse(prevState => !prevState)}>
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
                            <textarea
                                value={newKeyword}
                                onChange={({target: {value}}) => setNewKeyword(value)}
                                required
                                placeholder={'Enter the keywords you consider relevant for your product, paste one keyword per line'}
                            />
                        </div>

                        <button className={'btn default p15'}>
                            <SVG id={'plus-icon'}/>
                            Add Keyword
                        </button>
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