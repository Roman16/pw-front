import React, {useState, useRef, useEffect} from "react";
import './MultiTextArea.less';
import {Input} from "antd";
import {SVG} from "../../../../utils/icons";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";

import {
    cleanMainKeyword,
    findExistingDuplicateOfNewMainKeyword,
    keywordHasMeaningfulWords,
    isMainKeywordValid,
    isTooShort,
    isLongTail,
    isKeywordExtendsAnother
} from './isMainKeywordValid';

const MultiTextArea = ({onChange, max = 999999, value, toMark = false, productName, unique = false}) => {
    const [inputValue, setInputValue] = useState(null),
        [valueList, setValueList] = useState([]);

    const inputEl = useRef(null);

    const addKeywordHandler = ({target}) => {
        if (toMark) {
            const clearKeyword = cleanMainKeyword(target.value);

            if (clearKeyword !== '' && unique && !value.find(item => item.value === clearKeyword)) {
                const keyword = {
                    value: clearKeyword,
                    hasMeaningfulWords: keywordHasMeaningfulWords(clearKeyword),
                    isDuplicate: findExistingDuplicateOfNewMainKeyword(clearKeyword, value.map(item => item.value)),
                    isMainKeywordValid: isMainKeywordValid(clearKeyword, productName),
                    isLongTail: isLongTail(clearKeyword),
                    isTooShort: isTooShort(clearKeyword)
                }

                if (value == null) {
                    onChange([keyword]);
                } else {
                    onChange([...value, keyword]);
                }
            }
        } else {
            if (target.value !== '' && unique && !value.includes(target.value)) {

                if (value == null) {
                    onChange([target.value]);
                } else {
                    onChange([...value, target.value]);
                }
            }
        }


        setInputValue(null);
    };

    const removeKeywordHandler = (index) => {
        onChange(value.filter((item, itemIndex) => itemIndex !== index))
    };

    useEffect(() => {
        console.log('start')
    }, [])

    return (
        <div className={'multi-text-area'}
             onClick={() => (!value || value.length < max) && inputEl.current.focus()}>
            <div className="list">
                {value && value.map((item, index) => {
                    if (toMark) {
                        if (!item.hasMeaningfulWords || item.isDuplicate) {
                            return (
                                <div
                                    className={`item-text ${!item.hasMeaningfulWords || item.isDuplicate ? 'not-valid' : ''}`}>
                                    {item.value}

                                    <InformationTooltip
                                        type={'custom'}
                                        overlayClassName={'mistake-with-keyword'}
                                        description={<>
                                            <p>
                                                This keyword has next serious issues and will be ignored:
                                            </p>

                                            <ol>
                                                {!item.hasMeaningfulWords && <li>
                                                    Keyword does not have any meaningful words that will help us to get
                                                    relevant keywords suggestions for PPC Campaigns.
                                                </li>}

                                                {item.isDuplicate && <li>
                                                    This keyword is an explicit duplicate of another seed keyword you
                                                    provided: {item.isDuplicate}.
                                                </li>}
                                            </ol>
                                        </>}
                                    >
                                        <i style={{fill: '#EC7F5C', stroke: 'white'}}>
                                            <SVG id={'circle-warning-icon'}/>
                                        </i>

                                    </InformationTooltip>

                                    <i onClick={() => removeKeywordHandler(index)}>
                                        <SVG id={'remove-filter-icon'}/>
                                    </i>
                                </div>
                            )
                        } else if (item.isLongTail || item.isTooShort || isKeywordExtendsAnother(item.value, value.filter(item => item.hasMeaningfulWords || !item.isDuplicate).map(item => item.value))) {
                            return (
                                <div
                                    className={`item-text ${!item.hasMeaningfulWords || item.isDuplicate ? 'not-valid' : ''}`}>
                                    {item.value}

                                    <InformationTooltip
                                        type={'custom'}
                                        overlayClassName={'mistake-with-keyword'}
                                        description={<>
                                            <p>
                                                This keyword has next issues and may not be a good candidate for seed
                                                keyword:
                                            </p>

                                            <ol>
                                                {!item.isMainKeywordValid && <li>
                                                    Seems like this keyword is not present in the title of your product.
                                                    Please make sure you enter a keyword that describes your product in
                                                    general.
                                                </li>}

                                                {item.isTooShort && <li>
                                                    There are too few meaningful words in this keyword. It may describe
                                                    your product too broadly and lead to too many unrelated keywords
                                                    suggestions. Consider using a seed keywords with two or three words.
                                                </li>}

                                                {item.isLongTail && <li>
                                                    This keyword is probably a long tail and describes your product too
                                                    narrowly. There may not be many keywords suggestions derived from
                                                    this keyword. Consider using a seed keywords with two or three
                                                    words.
                                                </li>}

                                                {isKeywordExtendsAnother(item.value, value.filter(item => item.hasMeaningfulWords || !item.isDuplicate).map(item => item.value)) &&
                                                <li>
                                                    This keyword extends another existing seed keyword:
                                                    {` ${isKeywordExtendsAnother(item.value, value.filter(item => item.hasMeaningfulWords || !item.isDuplicate).map(item => item.value))}`}.
                                                    It may not produce additional keywords suggestions if the original
                                                    keyword was already a narrow description of your product.
                                                </li>}
                                            </ol>
                                        </>}
                                    >
                                        <i style={{fill: '#F0B849', stroke: 'white'}}>
                                            <SVG id={'circle-warning-icon'}/>
                                        </i>

                                    </InformationTooltip>

                                    <i onClick={() => removeKeywordHandler(index)}>
                                        <SVG id={'remove-filter-icon'}/>
                                    </i>
                                </div>
                            )
                        } else if (!item.isMainKeywordValid && !item.isLongTail && !item.isTooShort && !isKeywordExtendsAnother(item.value, value.filter(item => item.hasMeaningfulWords || !item.isDuplicate).map(item => item.value))) {
                            return (
                                <div
                                    className={`item-text`}>
                                    {item.value}

                                    <InformationTooltip
                                        type={'custom'}
                                        overlayClassName={'mistake-with-keyword'}
                                        description={<>
                                            <p>
                                                This keyword has next issues and may not be a good candidate for seed
                                                keyword:
                                            </p>

                                            <ol>
                                                {!item.isMainKeywordValid && <li>
                                                    Seems like this keyword is not present in the title of your product.
                                                    Please make sure you enter a keyword that describes your product in
                                                    general.
                                                </li>}
                                            </ol>
                                        </>}
                                    >
                                        <i style={{fill: 'white', stroke: '#6D6DF6'}}>
                                            <SVG id={'circle-warning-icon'}/>
                                        </i>

                                    </InformationTooltip>

                                    <i onClick={() => removeKeywordHandler(index)}>
                                        <SVG id={'remove-filter-icon'}/>
                                    </i>
                                </div>
                            )

                        } else {
                            return (
                                <div className={'item-text'}>
                                    {item.value}

                                    <i onClick={() => removeKeywordHandler(index)}>
                                        <SVG id={'remove-filter-icon'}/>
                                    </i>
                                </div>
                            )
                        }
                    } else {
                        return (
                            <div className={'item-text'}>
                                {item}

                                <i onClick={() => removeKeywordHandler(index)}>
                                    <SVG id={'remove-filter-icon'}/>
                                </i>
                            </div>
                        )
                    }
                })}

                {(!value || (toMark ? value.filter(item => item.hasMeaningfulWords !== false && item.isDuplicate === undefined).length < max : value.length < max)) &&
                <Input
                    ref={inputEl}
                    value={inputValue}
                    placeholder={'Add keywords and separate each item by “Enter”'}
                    type="text"
                    onChange={({target: {value}}) => setInputValue(value)}
                    onPressEnter={addKeywordHandler}
                />}
            </div>
        </div>
    )
};

export default MultiTextArea;