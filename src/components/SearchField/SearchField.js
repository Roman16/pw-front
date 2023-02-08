import React, {useState, useRef, useEffect} from "react"
import {SVG} from "../../utils/icons"
import {Input} from "antd"
import './SearchField.less'

const {TextArea} = Input

export const SearchField = ({
                                placeholder,
                                onSearch,
                                value
                            }) => {
    const [multiSearch, setMultiSearch] = useState(false),
        [searchValue, setSearchValue] = useState()

    const textAreaRef = useRef(null)

    const addNevLine = () => {
        setSearchValue(searchValue + '\r\n')
        textAreaRef.current.focus()
    }

    const searchHandler = () => {
        onSearch(searchValue, multiSearch ? 'multi' : 'mono')
    }

    const keydownHandler = (e) => {
        if (e.keyCode === 13 && e.ctrlKey) searchHandler()
    }

    useEffect(() => {
        if (typeof value === 'string') {
            setSearchValue(value)
        } else {
            setSearchValue(value.join('\r\n'))
            setMultiSearch(true)
        }
    }, [value])

    useEffect(() => {
        document.addEventListener('keydown', keydownHandler)
    }, [])

    return (<div className={`form-group multi-search-field ${multiSearch ? 'multi-search' : ''}`}>
        {multiSearch ?
            <TextArea
                rows={3}
                ref={textAreaRef}
                placeholder={placeholder}
                value={searchValue}

                onChange={e => setSearchValue(e.target.value)}
            />
            :
            <Input
                placeholder={placeholder}
                value={searchValue}

                onChange={e => setSearchValue(e.target.value)}
                onPressEnter={searchHandler}
                onBlur={searchHandler}
            />}

        {<button className="btn icon on-search-btn" onClick={searchHandler}><SVG id={'search'}/></button>}

        {<button className={`btn icon switch-multi-search ${multiSearch ? 'active' : ''}`}
                 onClick={() => setMultiSearch(prevState => !prevState)}>
            <SVG id={'multi-search-icon'}/>
        </button>}

        {multiSearch && <button className="btn icon line-break" onClick={addNevLine}><SVG id={'line-break'}/></button>}
    </div>)
}