import React, {useEffect, useState} from "react"
import {Checkbox} from "antd"
import {SVG} from "../../../../utils/icons"
import $ from 'jquery'
import {filteringNegativeExactList, findContiguousArrayIndex} from "./WordSorter"

let searchWordShift = [],
    arr = [],
    negativeListLocal = [],
    negativeExactsListLocal = []

const Output = ({phrasesList, negativeExactsList, language, marketplace, onAddPhrase, onAddExact, onCopy, negativePhrasesList}) => {
    const [checkedItems, setCheckedItems] = useState([])

    const addPhraseHandler = (phrase, e) => {
        e.preventDefault()
        e.stopPropagation()

        if (e.shiftKey) {
            negativeListLocal = [...negativePhrasesList]
            negativeExactsListLocal = [...negativeExactsList]
            searchWordShift = [...searchWordShift, phrase]
        } else {
            onAddPhrase(phrase)
        }
    }

    const logKey = (event) => {
        event.preventDefault()
        event.stopPropagation()


        if (event.keyCode === 16 && searchWordShift.length > 0) {
            const negativePhrase = [...searchWordShift].join(" ")

            onAddPhrase(negativePhrase, [...negativeExactsListLocal], [...new Set([...negativeListLocal, negativePhrase])], arr)

            setTimeout(() => {
                searchWordShift = []
                negativeListLocal = []
                negativeExactsListLocal = []
            }, 1000)
        }
    }

    useEffect(() => {
        $(document).keyup(logKey)
    }, [])

    const checkItemHandler = (key, checked) => {
        if (checked) setCheckedItems([...checkedItems, key])
        else setCheckedItems([...checkedItems.filter(i => i !== key)])
    }

    useEffect(() => {
        arr = phrasesList
    }, [phrasesList])

    useEffect(() => {
        setCheckedItems([...checkedItems.filter(i => !negativeExactsList.includes(i))])
    }, [negativeExactsList])

    return (<div className={'card output'}>
        <div className="block-header">
            <h3>Output</h3>
            <div className="count">{[...phrasesList.filter(i => !negativeExactsList.includes(i))].length}</div>

            <button className="btn default copy" onClick={onCopy}>copy</button>
        </div>

        <ul>
            {phrasesList.map((item) => {
                const isNegative = negativeExactsList.includes(item)

                return (<li key={item} className={isNegative && 'hidden'}>
                    <AmazonLink keyword={item} marketplace={marketplace} onClick={() => checkItemHandler(item, true)}/>
                    <TranslateLink keyword={item} language={language} onClick={() => checkItemHandler(item, true)}/>

                    <div className="phrase">
                        {item.split(" ").map(keyword => <div
                            key={keyword}
                            onClick={(e) => addPhraseHandler(keyword, e)}
                        >
                            {keyword}
                        </div>)}
                    </div>

                    <button className="btn icon" onClick={() => onAddExact(item)}>
                        <SVG id={'close-window-icon'}/>
                    </button>

                    {!isNegative && <Checkbox
                        checked={checkedItems.includes(item)}
                        onChange={({target: {checked}}) => checkItemHandler(item, checked)}
                    />}
                </li>)
            })}
        </ul>
    </div>)
}

export const AmazonLink = ({keyword, marketplace, onClick}) => <a
    href={`https://www.${marketplace}/s/?url=search-alias%3Daps&field-keywords=${keyword}`}
    onClick={onClick}
    target={'_blank'}
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="2.167 .438 251.038 259.969">
        <g fill="none" fill-rule="evenodd">
            <path
                d="m221.503 210.324c-105.235 50.083-170.545 8.18-212.352-17.271-2.587-1.604-6.984.375-3.169 4.757 13.928 16.888 59.573 57.593 119.153 57.593 59.621 0 95.09-32.532 99.527-38.207 4.407-5.627 1.294-8.731-3.16-6.872zm29.555-16.322c-2.826-3.68-17.184-4.366-26.22-3.256-9.05 1.078-22.634 6.609-21.453 9.93.606 1.244 1.843.686 8.06.127 6.234-.622 23.698-2.826 27.337 1.931 3.656 4.79-5.57 27.608-7.255 31.288-1.628 3.68.622 4.629 3.68 2.178 3.016-2.45 8.476-8.795 12.14-17.774 3.639-9.028 5.858-21.622 3.71-24.424z"
                fill="#f90" fill-rule="nonzero"/>
            <path
                d="m150.744 108.13c0 13.141.332 24.1-6.31 35.77-5.361 9.489-13.853 15.324-23.341 15.324-12.952 0-20.495-9.868-20.495-24.432 0-28.75 25.76-33.968 50.146-33.968zm34.015 82.216c-2.23 1.992-5.456 2.135-7.97.806-11.196-9.298-13.189-13.615-19.356-22.487-18.502 18.882-31.596 24.527-55.601 24.527-28.37 0-50.478-17.506-50.478-52.565 0-27.373 14.85-46.018 35.96-55.126 18.313-8.066 43.884-9.489 63.43-11.718v-4.365c0-8.018.616-17.506-4.08-24.432-4.128-6.215-12.003-8.777-18.93-8.777-12.856 0-24.337 6.594-27.136 20.257-.57 3.037-2.799 6.026-5.835 6.168l-32.735-3.51c-2.751-.618-5.787-2.847-5.028-7.07 7.543-39.66 43.36-51.616 75.43-51.616 16.415 0 37.858 4.365 50.81 16.795 16.415 15.323 14.849 35.77 14.849 58.02v52.565c0 15.798 6.547 22.724 12.714 31.264 2.182 3.036 2.657 6.69-.095 8.966-6.879 5.74-19.119 16.415-25.855 22.393l-.095-.095"
                fill="#000"/>
            <path
                d="m221.503 210.324c-105.235 50.083-170.545 8.18-212.352-17.271-2.587-1.604-6.984.375-3.169 4.757 13.928 16.888 59.573 57.593 119.153 57.593 59.621 0 95.09-32.532 99.527-38.207 4.407-5.627 1.294-8.731-3.16-6.872zm29.555-16.322c-2.826-3.68-17.184-4.366-26.22-3.256-9.05 1.078-22.634 6.609-21.453 9.93.606 1.244 1.843.686 8.06.127 6.234-.622 23.698-2.826 27.337 1.931 3.656 4.79-5.57 27.608-7.255 31.288-1.628 3.68.622 4.629 3.68 2.178 3.016-2.45 8.476-8.795 12.14-17.774 3.639-9.028 5.858-21.622 3.71-24.424z"
                fill="#f90" fill-rule="nonzero"/>
            <path
                d="m150.744 108.13c0 13.141.332 24.1-6.31 35.77-5.361 9.489-13.853 15.324-23.341 15.324-12.952 0-20.495-9.868-20.495-24.432 0-28.75 25.76-33.968 50.146-33.968zm34.015 82.216c-2.23 1.992-5.456 2.135-7.97.806-11.196-9.298-13.189-13.615-19.356-22.487-18.502 18.882-31.596 24.527-55.601 24.527-28.37 0-50.478-17.506-50.478-52.565 0-27.373 14.85-46.018 35.96-55.126 18.313-8.066 43.884-9.489 63.43-11.718v-4.365c0-8.018.616-17.506-4.08-24.432-4.128-6.215-12.003-8.777-18.93-8.777-12.856 0-24.337 6.594-27.136 20.257-.57 3.037-2.799 6.026-5.835 6.168l-32.735-3.51c-2.751-.618-5.787-2.847-5.028-7.07 7.543-39.66 43.36-51.616 75.43-51.616 16.415 0 37.858 4.365 50.81 16.795 16.415 15.323 14.849 35.77 14.849 58.02v52.565c0 15.798 6.547 22.724 12.714 31.264 2.182 3.036 2.657 6.69-.095 8.966-6.879 5.74-19.119 16.415-25.855 22.393l-.095-.095"
                fill="#000"/>
        </g>
    </svg>
</a>

export const TranslateLink = ({keyword, language, onClick}) => <a
    href={`https://translate.google.com/?hl=ru#${language}/ru/${keyword}`}
    onClick={onClick}
    target={'_blank'}
>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333334 333400" shape-rendering="geometricPrecision"
         text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd">
        <defs>
            <radialGradient id="c" gradientUnits="userSpaceOnUse" cx="23333.1" cy="6668.12" r="166700" fx="23333.1"
                            fy="6668.12">
                <stop offset="0" stop-color="#fff"/>
                <stop offset="1" stop-color="#fff"/>
                <stop offset="1" stop-color="#fff"/>
            </radialGradient>
            <mask id="b">
                <radialGradient id="a" gradientUnits="userSpaceOnUse" cx="-652315" cy="-721597" r="2971250" fx="-652315"
                                fy="-721597">
                    <stop offset="0" stop-opacity=".102" stop-color="#fff"/>
                    <stop offset="1" stop-opacity="0" stop-color="#fff"/>
                    <stop offset="1" stop-color="#fff"/>
                </radialGradient>
                <path fill="url(#a)" d="M-150-150h333634v333700H-150z"/>
            </mask>
        </defs>
        <path
            d="M311158 333400c12190 0 22176-9819 22176-21841V88769c0-12023-9986-21842-22176-21842H94713l86865 266473h129580z"
            fill="#dbdbdb"/>
        <path
            d="M311158 76947c3239 0 6312 1269 8617 3540 2271 2238 3540 5177 3540 8283v222790c0 3106-1235 6045-3540 8282-2304 2271-5377 3540-8617 3540H188859L108506 76947h202652m0-10019H94713l86865 266473h129580c12190 0 22176-9819 22176-21841V88770c0-12023-9986-21842-22176-21842z"
            fill="#dcdcdc"/>
        <path fill="#4352b8" d="M161073 270448l20506 62952 57008-62952z"/>
        <path
            d="M312628 159002v-13058h-62953v-21107h-20439v21107h-40176v13058h79952c-4275 15062-13726 29289-22943 40343-16331-19337-16398-25615-16398-25615h-16966s702 9418 23612 36269c-7448 7614-13092 12123-13092 12123l5210 16298s7882-6780 17734-17233c9885 10720 22643 23611 39141 38974l10720-10720c-17667-16030-30625-28754-40143-38974 12757-15095 25715-34098 28454-51498h28254v33h33z"
            fill="#607988"/>
        <path d="M22176 0C9986 0 0 9986 0 22209v226096c0 12190 9985 22176 22176 22176h216445L151756 0H22176z"
              fill="#4285f4"/>
        <path
            d="M124036 143807c-835 10119-9485 25114-30425 25114-18134 0-32829-14995-32829-33463 0-18469 14695-33464 32829-33464 10320 0 17200 4475 21140 8115l13759-13225c-9050-8349-20839-13559-34900-13559-28754 0-52099 23344-52099 52099 0 28754 23345 52099 52099 52099 30124 0 50028-21140 50028-50963 0-4275-534-7414-1235-10620H93643v17834l30391 33z"
            fill="#eee"/>
        <path
            d="M311159 66927H173263L151756 0H22176C9986 0 1 9986 1 22209v226096c0 12190 9985 22176 22175 22176h138897l20506 62919h129580c12190 0 22175-9818 22175-21841V88769c0-12022-9985-21842-22175-21842z"
            mask="url(#b)" fill="url(#c)"/>
    </svg>
</a>

export default Output