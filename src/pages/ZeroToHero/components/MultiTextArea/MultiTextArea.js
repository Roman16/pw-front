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

    // useEffect(() => {
    //     setValueList(value.map(item => {
    //         if (toMark) {
    //             const clearKeyword = cleanMainKeyword(item);
    //
    //             if (clearKeyword !== '' && unique && !value.find(item => item.value === clearKeyword)) {
    //                 const keyword = {
    //                     value: clearKeyword,
    //                     hasMeaningfulWords: keywordHasMeaningfulWords(clearKeyword),
    //                     isDuplicate: findExistingDuplicateOfNewMainKeyword(clearKeyword, value.map(item => item.value)),
    //                     isMainKeywordValid: isMainKeywordValid(clearKeyword, productName),
    //                     isLongTail: isLongTail(clearKeyword),
    //                     isTooShort: isTooShort(clearKeyword)
    //                 }
    //
    //                 if (value == null) {
    //                     onChange([keyword]);
    //                 } else {
    //                     onChange([...value, keyword]);
    //                 }
    //             }
    //         } else {
    //             if (item !== '' && unique && !value.includes(item)) {
    //
    //                 if (value == null) {
    //                     onChange([item]);
    //                 } else {
    //                     onChange([...value, item]);
    //                 }
    //             }
    //         }
    //     }))
    // }, [value])

    return (
        <div className={'multi-text-area'}
             onClick={() => (!value || value.length < max) && inputEl.current.focus()}>
            <div className="list">
                {value && value.map((item, index) => {
                    if (toMark) {
                        if (!item.hasMeaningfulWords || item.isDuplicate || !item.isMainKeywordValid || item.isLongTail || item.isTooShort || isKeywordExtendsAnother(item.value, value.map(item => item.value))) {
                            return (
                                <div
                                    className={`item-text ${!item.hasMeaningfulWords || item.isDuplicate ? 'not-valid' : ''}`}>
                                    {item.value}

                                    <InformationTooltip
                                        type={'custom'}
                                        overlayClassName={'mistake-with-keyword'}
                                        description={<>
                                            <ul>
                                                <li>
                                                    <b>keywordHasMeaningfulWords</b> {new String(item.hasMeaningfulWords)}
                                                </li>
                                                <li>
                                                    <b>findExistingDuplicateOfNewMainKeyword</b> {new String(item.isDuplicate)}
                                                </li>
                                                <li>
                                                    <b>isMainKeywordValid</b> {new String(item.isMainKeywordValid)}
                                                </li>
                                                <li>
                                                    <b>isTooShort</b> {new String(item.isTooShort)}
                                                </li>
                                                <li>
                                                    <b>isLongTail</b> {new String(item.isLongTail)}
                                                </li>
                                                <li>
                                                    <b>isKeywordExtendsAnother</b> {isKeywordExtendsAnother(item.value, value.map(item => item.value))}
                                                </li>

                                            </ul>
                                        </>}
                                    >
                                        <i style={(!item.hasMeaningfulWords || item.isDuplicate) ? {
                                            fill: '#EC7F5C',
                                            stroke: '#EC7F5C'
                                        } : {fill: '#F0B849', stroke: '#F0B849'}}>
                                            <SVG id={'warning-icon'}/>
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