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
        // const validList = [...value];

        let invalidIndex = [];

        if (toMark) {
            // [...validList].reverse().forEach((item, index) => {
            //     const clearKeyword = cleanMainKeyword(item.value)
            //
            //     validList.find(findItem => findItem.value === item.value).isDuplicate = findExistingDuplicateOfNewMainKeyword(clearKeyword, validList.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value));
            // })
            //
            // console.log(validList)
            // console.log([...validList].reverse())
            //
            // setValueList([...validList].reverse())
            //    --------------------------


            // setValueList([...value]
            //     .reverse()
            //     .map((item, index) => {
            //         const clearKeyword = cleanMainKeyword(item.value)
            //
            //         if (findExistingDuplicateOfNewMainKeyword(clearKeyword, value.filter(item => !invalidIndex.includes(item.value) && item.value !== clearKeyword).map(item => item.value))) {
            //             item.isDuplicate = findExistingDuplicateOfNewMainKeyword(clearKeyword, value.filter(item => !invalidIndex.includes(item.value) && item.value !== clearKeyword).map(item => item.value));
            //             invalidIndex.push(item.value)
            //         }
            //
            //         return (item)
            //     })
            //     .reverse()
            // );
            //
            // invalidIndex = [];
            //    ---------------------------
            let validList = [...value.map(item => {
                delete item.isDuplicate

                return item;
            })];

            for (let i = validList.length - 1; i >= 0; i--) {
                const clearKeyword = cleanMainKeyword(validList[i].value)
                validList.find(findItem => findItem.value === validList[i].value).isDuplicate = findExistingDuplicateOfNewMainKeyword(clearKeyword, validList.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value));
            }

            setValueList(validList);

            validList = [];
        } else {
            setValueList(value)
        }
    }, [value])

    return (
        <div className={'multi-text-area'}
             onClick={() => (!value || value.length < max) && inputEl.current.focus()}>
            <div className="list">
                {valueList && valueList.map((item, index) => {
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
                                                    provided: <b>{item.isDuplicate}</b>.
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
                        } else if (item.isLongTail || item.isTooShort || isKeywordExtendsAnother(item.value, value.filter(item => item.hasMeaningfulWords && !item.isDuplicate).map(item => item.value))) {
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

                                                {item.isTooShort && <li>
                                                    Keyword has too few words. It may describe your product too broadly
                                                    and lead to many unrelated keywords suggestions. Consider using a
                                                    seed keywords with two or three words or leave it as is if you are
                                                    sure this keyword is relevant to your product.
                                                </li>}

                                                {item.isLongTail && <li>
                                                    This keyword is probably a long tail and describes your product too
                                                    narrowly. There may not be many keywords suggestions derived from
                                                    this keyword. Consider using a seed keywords with two or three
                                                    words.
                                                </li>}

                                                {isKeywordExtendsAnother(item.value, value.filter(item => item.hasMeaningfulWords && !item.isDuplicate).map(item => item.value)) &&
                                                <li>
                                                    This keyword extends another existing seed keyword:
                                                    <b>{` ${isKeywordExtendsAnother(item.value, value.filter(item => item.hasMeaningfulWords && !item.isDuplicate).map(item => item.value))}`}</b>.
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
                        } else if (!item.isMainKeywordValid && !item.isLongTail && !item.isTooShort && !isKeywordExtendsAnother(item.value, value.filter(item => item.hasMeaningfulWords && !item.isDuplicate).map(item => item.value))) {
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