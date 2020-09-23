import React, {useState, useRef, useEffect} from "react"
import {Checkbox, Popover} from "antd"
import {SVG} from "../../../../utils/icons"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch, useSelector} from "react-redux"

let enableSwitch = true


const ColumnsSelect = ({columns, columnsBlackList}) => {
    const [popoverState, setPopoverState] = useState(false),
        [columnsState, setColumnsState] = useState(columns)

    const dispatch = useDispatch()


    const wrapperRef = useRef(null)

    useEffect(() => {
        setColumnsState(prevState => prevState.map(column => ({
            ...column,
            checked: !columnsBlackList.find(item => item === column.key)
        })))
    }, [columnsBlackList])

    const changeColumnHandler = (event, column) => {
        if (event) {
            dispatch(analyticsActions.updateColumnBlackList(columnsBlackList.filter(item => item !== column)))
        } else {
            dispatch(analyticsActions.updateColumnBlackList([...columnsBlackList, column]))
        }
    }


    useEffect(() => {
        function handleClickOutside({target}) {
            if(target.className === 'btn icon' || target.parentNode.className === 'btn icon') {

            } else if (wrapperRef.current && !wrapperRef.current.contains(target) && !popoverState) {
                enableSwitch = false

                setPopoverState(false)
            }
        }

        document.addEventListener("click", handleClickOutside, true)
        return () => {
            document.removeEventListener("click", handleClickOutside)
        }
    }, [wrapperRef])


    return (
        <>
            <button className={'columns-select'}>
                <i
                    className={'btn icon'}
                    onClick={() => setPopoverState(prevState => !prevState)}>
                    <SVG id={'table-columns'}/>
                </i>

                {popoverState && <div className={'popover-column-select'} ref={wrapperRef}>
                    <div className="columns-list">
                        {columnsState.map(column => (
                            <Checkbox
                                disabled={column.locked}
                                checked={!columnsBlackList.find(key => key === column.key)}
                                onChange={(e) => changeColumnHandler(e.target.checked, column.key)}
                            >
                                {column.title}
                            </Checkbox>
                        ))}
                    </div>
                </div>}
            </button>

        </>
    )
}

export default React.memo(ColumnsSelect)