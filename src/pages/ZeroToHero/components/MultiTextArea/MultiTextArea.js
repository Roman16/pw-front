import React, {useState, useRef} from "react";
import './MultiTextArea.less';
import {Input} from "antd";
import {SVG} from "../../../../utils/icons";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";

import {isMainKeywordValid} from './isMainKeywordValid';

const MultiTextArea = ({onChange, max = 999999, value, toMark = false, productName, unique = false}) => {
    const [inputValue, setInputValue] = useState(null);

    const inputEl = useRef(null);

    const addKeywordHandler = ({target}) => {
        if (target.value !== '' && unique && !value.includes(target.value)) {
            if (value == null) {
                onChange([target.value]);
            } else {
                onChange([...value, target.value]);
            }
        }

        setInputValue(null);
    };

    const removeKeywordHandler = (index) => {
        onChange(value.filter((item, itemIndex) => itemIndex !== index))
    };

    return (
        <div className={'multi-text-area'}
             onClick={() => (!value || value.length < max) && inputEl.current.focus()}>
            <div className="list">
                {value && value.map((item, index) => {
                    if (toMark && !isMainKeywordValid(item, productName)) {
                        return (
                            <div className={'item-text'}>
                                {item}

                                <InformationTooltip type={'custom'}
                                                    description={'Looks like this is a long tail keyword or it’s not present in your title. Please make sure you enter a keyword that customers use to describe your product in general.'}>
                                    <SVG id={'warning-icon'}/>
                                </InformationTooltip>

                                <i onClick={() => removeKeywordHandler(index)}>
                                    <SVG id={'remove-filter-icon'}/>
                                </i>
                            </div>
                        )
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

                {(!value || value.length < max) && <Input
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