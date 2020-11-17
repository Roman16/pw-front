import React, {useState, useRef, useEffect} from "react"
import {Checkbox, Input} from "antd"
import {SVG} from "../../../../utils/icons"
import {analyticsActions} from "../../../../actions/analytics.actions"
import {useDispatch} from "react-redux"

let enableSwitch = true
const {Search} = Input


const ColumnsSelect = ({columns, columnsBlackList}) => {
    const [popoverState, setPopoverState] = useState(false),
        [columnsState, setColumnsState] = useState(columns)

    const dispatch = useDispatch()


    const wrapperRef = useRef(null)

    const changeColumnHandler = (event, column) => {
        if (event) {
            dispatch(analyticsActions.updateColumnBlackList(columnsBlackList.filter(item => item !== column)))
        } else {
            dispatch(analyticsActions.updateColumnBlackList([...columnsBlackList, column]))
        }
    }

    const onSearch = (value) => {
        setColumnsState(columns.filter(column => column.title.toLowerCase().includes(value.toLowerCase())))
    }

    useEffect(() => {
        function handleClickOutside({target}) {
            if (target.className === 'btn icon' || target.parentNode.className === 'btn icon') {

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

                {popoverState && <div
                    style={{height: `${(document.querySelector('.list-section') ? document.querySelector('.list-section').offsetHeight : 600) / 1.5}px`}}
                    className={'popover-column-select'}
                    ref={wrapperRef}
                >
                    <div className="form-group">
                        <Search
                            className="search-field"
                            placeholder={'Search'}
                            onChange={e => onSearch(e.target.value)}
                            data-intercom-target='search-field'
                            suffix={<SVG id={'search'}/>}
                        />
                    </div>

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
