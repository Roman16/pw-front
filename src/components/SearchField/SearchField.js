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
        setSearchValue((prevState = '') => prevState + '\r\n')
        textAreaRef.current.focus()
    }

    const searchHandler = () => {
        if(value.join) {
            if (searchValue !== value.join('\r\n')) onSearch(multiSearch ? searchValue.split('\n').map(i => i.trim()).filter(item => item !== '') : searchValue)
        } else {
            if (searchValue !== value) onSearch(multiSearch ? searchValue.split('\n').map(i => i.trim()).filter(item => item !== '') : searchValue)
        }
    }

    const keydownHandler = (e) => {
        if (e.keyCode === 13 && e.ctrlKey) searchHandler()
    }

    const changeInputTypeHandler = (e) => {
        e.stopPropagation()
        e.preventDefault()

        setSearchValue()
        setMultiSearch(prevState => !prevState)
    }

    useEffect(() => {
        if (value) {
            if (typeof value === 'string') {
                setSearchValue(value)
            } else {
                setSearchValue(value.join('\r\n'))
                setMultiSearch(true)
            }
        } else {
            setSearchValue()
            setMultiSearch(false)
        }
    }, [value])

    useEffect(() => {
        document.removeEventListener('keydown', keydownHandler)
        document.addEventListener('keydown', keydownHandler)

        return (() => document.removeEventListener('keydown', keydownHandler))
    }, [searchValue])


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
                // onBlur={searchHandler}
            />}

        {<button className="btn icon on-search-btn" onClick={searchHandler}><SVG id={'search'}/></button>}

        {<button className={`btn icon switch-multi-search ${multiSearch ? 'active' : ''}`}
                 onClick={changeInputTypeHandler}>
            <SVG id={'multi-search-icon'}/>
        </button>}

        {multiSearch && <button className="btn icon line-break" onClick={addNevLine}><SVG id={'line-break'}/></button>}
    </div>)
}