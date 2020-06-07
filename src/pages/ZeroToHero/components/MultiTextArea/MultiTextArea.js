import React, {useState, useRef} from "react";
import './MultiTextArea.less';
import {Input} from "antd";
import {SVG} from "../../../../utils/icons";
import InformationTooltip from "../../../../components/Tooltip/Tooltip";

const MultiTextArea = ({onChange, max = 999999, value, toMark}) => {
    const [inputValue, setInputValue] = useState(null);

    const inputEl = useRef(null);

    const addKeywordHandler = ({target}) => {
        if (target.value !== '') {
            if (value == null) {
                onChange([target.value]);
            } else {
                onChange([...value, target.value]);
            }
            setInputValue(null);
        }
    };

    const removeKeywordHandler = (index) => {
        onChange(value.filter((item, itemIndex) => itemIndex !== index))
    };

    return (
        <div className={'multi-text-area'}
             onClick={() => (!value || value.length < max) && inputEl.current.focus()}>
            <div className="list">
                {value && value.map((item, index) =>
                    toMark && item.match(/\b\w+\b/g).length >= 3 ? (
                            <InformationTooltip
                                getPopupContainer={trigger => trigger.parentNode}
                                description={'Not valid'}
                                type={'custom'}
                            >
                                <div className={'item-text'}>
                                    {item}

                                    <i onClick={() => removeKeywordHandler(index)}>
                                        <SVG id={'remove-filter-icon'}/>
                                    </i>
                                </div>
                            </InformationTooltip>
                        ) :
                        (
                            <div className={'item-text'}>
                                {item}

                                <i onClick={() => removeKeywordHandler(index)}>
                                    <SVG id={'remove-filter-icon'}/>
                                </i>
                            </div>
                        )
                )}

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