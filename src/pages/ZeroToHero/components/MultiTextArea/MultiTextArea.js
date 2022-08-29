import React, {useState, useRef, useEffect} from "react"
import './MultiTextArea.less'
import {Input} from "antd"
import {SVG} from "../../../../utils/icons"
import InformationTooltip from "../../../../components/Tooltip/Tooltip"

import {
    cleanMainKeyword,
    findExistingDuplicateOfNewMainKeyword,
    keywordHasMeaningfulWords,
    isMainKeywordValid,
    isTooShort,
    isLongTail,
    isKeywordExtendsAnother
} from './isMainKeywordValid'

const MultiTextArea = ({onChange, max = 999999, value, toMark = false, productName, unique = false, placeholder = 'Type here'}) => {
    const [inputValue, setInputValue] = useState(null),
        [valueList, setValueList] = useState([])
    const [focused, setFocused] = useState(false)

    const inputEl = useRef(null)

    const addKeywordHandler = ({target}) => {
        if (toMark) {
            const clearKeyword = cleanMainKeyword(target.value)

            if (clearKeyword !== '' && unique && !value.find(item => item.value === clearKeyword)) {
                const keyword = {
                    value: clearKeyword,
                    hasMeaningfulWords: keywordHasMeaningfulWords(clearKeyword),
                    isMainKeywordValid: isMainKeywordValid(clearKeyword, productName),
                    isLongTail: isLongTail(clearKeyword),
                    isTooShort: isTooShort(clearKeyword)
                }

                if (value == null) {
                    onChange([keyword])
                } else {
                    onChange([...value, keyword])
                }
            }
        } else {
            if (target.value !== '' && unique && !value.includes(target.value)) {
                if (value == null) {
                    onChange([target.value])
                } else {
                    onChange([...value, target.value])
                }
            }
        }

        setInputValue(null)
    }

    const removeKeywordHandler = (index) => {
        onChange(value.filter((item, itemIndex) => itemIndex !== index))
    }

    useEffect(() => {
        // const validList = [...value];

        let invalidIndex = []

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

                return item
            })]

            for (let i = validList.length - 1; i >= 0; i--) {
                const clearKeyword = cleanMainKeyword(validList[i].value)
                validList.find(findItem => findItem.value === validList[i].value).isDuplicate = findExistingDuplicateOfNewMainKeyword(clearKeyword, validList.filter(item => !item.isDuplicate && item.value !== clearKeyword).map(item => item.value))
            }

            setValueList(validList)

            validList = []
        } else {
            setValueList(value)
        }
    }, [value])

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    return (
        <div className={`multi-text-area ${focused ? 'focus' : ''}`}
             onClick={() => (!value || value.length < max) && inputEl.current.focus()}>
            <div className="list">
                {valueList && valueList.map((item, index) => {
                    if (toMark) {
                        return <MainKeyword
                            item={item}
                            value={value}
                            index={index}
                            removeKeywordHandler={removeKeywordHandler}
                        />
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
                    onFocus={onFocus}
                    onBlur={onBlur}
                    ref={inputEl}
                    value={inputValue}
                    placeholder={placeholder}
                    type="text"
                    onChange={({target: {value}}) => setInputValue(value)}
                    onPressEnter={addKeywordHandler}
                />}
            </div>
        </div>
    )
}

export const MainKeyword = ({item, removeKeywordHandler, value, index}) => {
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
                    <i>
                        <ErrorIcon/>
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
                    <i>
                        <WarningIcon/>
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
                    <i>
                        <WarningIcon/>
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
}

const WarningIcon = () => <svg width="12" height="13" stroke={'none'} viewBox="0 0 12 13" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" stroke={'none'} clip-rule="evenodd"
          d="M10.8833 12.5007H1.11701C0.373632 12.5007 -0.109865 11.7184 0.222586 11.0535L5.10575 1.28716C5.47427 0.550113 6.52608 0.550113 6.8946 1.28716L11.7778 11.0535C12.1102 11.7184 11.6267 12.5007 10.8833 12.5007ZM6.00016 4.14209C5.61546 4.14209 5.3036 4.45395 5.3036 4.83864C5.3036 5.22334 5.61546 5.5352 6.00016 5.5352C6.38486 5.5352 6.69672 5.22334 6.69672 4.83864C6.69672 4.45395 6.38486 4.14209 6.00016 4.14209ZM7.21914 11.1077C7.41148 11.1077 7.56741 10.9517 7.56741 10.7594C7.56741 10.567 7.41149 10.4111 7.21914 10.4111C7.02679 10.4111 6.87086 10.2552 6.87086 10.0628V6.58004C6.87086 6.38769 6.71493 6.23176 6.52258 6.23176H5.47774H5.12947C4.93712 6.23176 4.78119 6.38769 4.78119 6.58004C4.78119 6.77238 4.93712 6.92831 5.12947 6.92831C5.32181 6.92831 5.47774 7.08424 5.47774 7.27659V10.0628C5.47774 10.2552 5.32181 10.4111 5.12947 10.4111C4.93712 10.4111 4.78119 10.567 4.78119 10.7594C4.78119 10.9517 4.93712 11.1077 5.12947 11.1077H7.21914Z"
          fill="#FFAF52"/>
</svg>

const ErrorIcon = () => <svg width="12" height="13" viewBox="0 0 12 13" stroke={'none'} fill="none"
                             xmlns="http://www.w3.org/2000/svg">
    <circle cx="6" cy="6.5" r="6" fill="#FF5256" stroke={'none'}/>
    <path stroke={'none'} d="M6 2.89844L6 7.69844" stroke="white" stroke-width="1.2" stroke-linecap="round"/>
    <path stroke={'none'}
          d="M6.60039 9.90078C6.60039 10.2322 6.33176 10.5008 6.00039 10.5008C5.66902 10.5008 5.40039 10.2322 5.40039 9.90078C5.40039 9.56941 5.66902 9.30078 6.00039 9.30078C6.33176 9.30078 6.60039 9.56941 6.60039 9.90078Z"
          fill="white"/>
</svg>


export default MultiTextArea