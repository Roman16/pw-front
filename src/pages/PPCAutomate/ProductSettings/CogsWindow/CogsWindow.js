import React, {useEffect, useState} from "react"
import ModalWindow from "../../../../components/ModalWindow/ModalWindow"
import moment from "moment"
import './CogsWindow.less'
import {SVG} from "../../../../utils/icons"
import {numberMask} from "../../../../utils/numberMask"
import InputCurrency from "../../../../components/Inputs/InputCurrency"
import DatePicker from "../../../../components/DatePicker/DatePicker"
import {productsServices} from "../../../../services/products.services"
import {Spin} from "antd"

let hasChanges = false,
    cogsFromApi = []

const CogsWindow = ({visible, productId, product, onClose, onSetCogs}) => {
    const [cogsList, setCogsList] = useState([]),
        [activeIndex, setActiveIndex] = useState(),
        [visibleConfirm, setVisibleConfirm] = useState(false)

    const getCogs = async () => {
        try {
            const res = await productsServices.getProductCogs(productId)

            setCogsList(res.result.sort((a, b) => moment(b.cogs_start_datetime).format('YYYYMMDDHHmm') - moment(a.cogs_start_datetime).format('YYYYMMDDHHmm')))
        } catch (e) {
            console.log(e)
        }
    }

    const addNew = (index) => {
        const defaultItem = {cogs_start_datetime: undefined, cogs_value: undefined},
            list = [...cogsList.filter(item => item.record_id)]

        if (index === 0) {
            setCogsList([defaultItem, ...list])
            setActiveIndex(0)
        } else if (index === cogsList.length) {
            setCogsList([...list, defaultItem])
            setActiveIndex(list.length)
        } else {
            list.splice(index, 0, defaultItem)

            setCogsList([...list])
            setActiveIndex(index)
        }
    }

    const editHandler = (id) => {
        const list = [...cogsList.filter(item => item.record_id)]
        setCogsList(list)

        setActiveIndex(list.findIndex(i => i.record_id === id))
    }

    const removeHandler = async (id, force = false) => {
        if (cogsList.length === 1 && (product.product ? product.product.under_optimization : product.under_optimization) && !force) {
            setVisibleConfirm(true)
        } else {
            try {
                await productsServices.deleteProductCogs(id, productId)
                setCogsList([...cogsList.filter((item) => item.record_id !== id)])
            } catch (e) {
                console.log(e)
            }

            setVisibleConfirm(false)
        }
    }

    const cancelActiveHandler = () => {
        setActiveIndex(undefined)
        setCogsList([...cogsList.filter(item => item.record_id)])
    }

    const submitItemHandler = async (data) => {
        try {
            const requestData = {
                product_id: productId,
                cogs_start_datetime: moment(data.cogs_start_datetime).set({second: 0, millisecond: 0}).utc(),
                cogs_value: data.cogs_value,
                record_id: data.record_id || undefined
            }

            if (data.record_id) {
                await productsServices.updateProductCogs(requestData)
            } else {
                await productsServices.createProductCogs(requestData)
            }

            setCogsList([...cogsList.map((item, index) => {
                if (index === activeIndex) item = {...data}
                return item
            })])

            getCogs()
        } catch (e) {
            console.log(e)
        }

        setActiveIndex(undefined)
    }

    useEffect(() => {
        if (productId && visible) {
            productsServices.getProductCogs(productId)
                .then(res => {
                    setCogsList(res.result.sort((a, b) => moment(b.cogs_start_datetime).format('YYYYMMDDHHmm') - moment(a.cogs_start_datetime).format('YYYYMMDDHHmm')))
                    cogsFromApi = res.result.sort((a, b) => moment(b.cogs_start_datetime).format('YYYYMMDDHHmm') - moment(a.cogs_start_datetime).format('YYYYMMDDHHmm'))
                })
        }
        setActiveIndex(undefined)
    }, [productId])

    useEffect(() => {
        hasChanges = JSON.stringify(cogsList) !== JSON.stringify(cogsFromApi)
    }, [cogsList])

    useEffect(() => {
        setCogsList([])

        if (!visible && hasChanges) onSetCogs()
    }, [visible])


    return (
        <>
            <ModalWindow
                visible={visible}
                footer={false}
                className={'cogs-window'}
                handleCancel={onClose}
                destroyOnClose={true}
            >
                <div className="window-header">
                    <h2>Edit CoGS</h2>

                    <button className="btn icon" onClick={onClose}>
                        <SVG id={'close-window-icon'}/>
                    </button>
                </div>

                <ul>
                    <li className={'new-item'} onClick={() => addNew(0)}>
                        <PlusIcon/>
                        Add new
                    </li>

                    {cogsList.map((item, index) => <>
                        <div
                            className={`current-value ${(activeIndex === index || activeIndex + 1 === index) ? 'disabled' : ''}`}>
                            <div
                                className="add-new-item"
                                onClick={() => addNew((activeIndex === undefined || cogsList[activeIndex].record_id) ? index : (index > activeIndex || activeIndex === 0) ? index - 1 : index)}
                            >
                                <PlusIcon/>

                                <div className="line"/>
                            </div>

                            <div className="value">{item.cogs_value && `${numberMask(item.cogs_value, 2)}$`}</div>
                        </div>

                        <li className={activeIndex === index && 'active'}>
                            <PlusIcon/>

                            {activeIndex === index ? <EditingCogsFields
                                list={cogsList}
                                index={index}
                                onSubmit={submitItemHandler}
                                onCancel={cancelActiveHandler}
                            /> : <>
                                <div className="time">{moment(item.cogs_start_datetime).format('DD MMM YYYY, HH:mm')},
                                </div>
                                <div className="value">{numberMask(item.cogs_value, 2)}$</div>

                                <button className="btn icon edit-btn" onClick={() => editHandler(item.record_id)}>
                                    <SVG id={'edit-pen-icon'}/>
                                </button>
                                <button className="btn icon remove-btn" onClick={() => removeHandler(item.record_id)}>
                                    <SVG id={'close-window-icon'}/>
                                </button>
                            </>}
                        </li>
                    </>)}

                    {cogsList.length > 0 && <>
                        <div className="current-value">
                            <div className="add-new-item">
                                <PlusIcon/>

                                <div className="line"/>
                            </div>
                        </div>

                        <li className={'new-item'} onClick={() => addNew(cogsList.length)}>
                            <PlusIcon/>
                            Add new
                        </li>
                    </>}
                </ul>
            </ModalWindow>

            <ModalWindow
                footer={false}
                className={'delete-confirm-window'}
                destroyOnClose={true}
                visible={visibleConfirm}
                handleCancel={() => setVisibleConfirm(false)}

            >
                <h1>Delete last COGS entry?</h1>

                <p>
                    You are trying to delete the last known COGS value for product on Optimization. If you delete it,
                    Optimization won't be running until you set new COGS value for this product.
                </p>

                <div className="actions">
                    <button className={'btn white'} onClick={() => removeHandler(cogsList[0].record_id, true)}>
                        Confirm
                    </button>

                    <button type={'button'} className={'btn default'} onClick={() => setVisibleConfirm(false)}>
                        Cancel
                    </button>
                </div>
            </ModalWindow>
        </>
    )
}

const EditingCogsFields = ({onSubmit, list, index, onCancel}) => {
    const [item, setItem] = useState({...list[index]}),
        [processing, setProcessing] = useState(false),
        [visibleDatePicker, setVisibleDatePicker] = useState(false),
        [visibleTimePicker, setVisibleTimePicker] = useState(false)

    const submitHandler = () => {
        setProcessing(true)
        onSubmit(item)
    }

    function disabledDate(current) {
        if (index === 0 && list[index + 1]) {
            return current && (current <= moment(list[index + 1].cogs_start_datetime).subtract(1, 'days').endOf('day') || current <= moment('2010-01-01', 'YYYY-MM-DD'))
        } else if (index === list.length - 1 && list[index - 1]) {
            return current && (current >= moment(list[index - 1].cogs_start_datetime).endOf('day') || current <= moment('2010-01-01', 'YYYY-MM-DD'))
        } else if (index > 0 && index < list.length - 1) {
            return current && (current >= moment(list[index - 1].cogs_start_datetime).endOf('day') || current <= moment(list[index + 1].cogs_start_datetime).subtract(1, 'days').endOf('day')) && current <= moment('2010-01-01', 'YYYY-MM-DD')
        } else {
            return current && current <= moment('2010-01-01', 'YYYY-MM-DD')
        }
    }

    function range(start, end) {
        const result = []
        for (let i = start; i < end; i++) {
            result.push(i)
        }
        return result
    }

    function disabledDateTime() {
        if (list[index + 1] && item.cogs_start_datetime && (moment(list[index + 1].cogs_start_datetime).format('YYYYMMDD') === moment(item.cogs_start_datetime).format('YYYYMMDD'))) {
            return {
                disabledHours: () => range(0, +moment(list[index + 1].cogs_start_datetime).format('HH')),
                disabledMinutes: () => item.cogs_start_datetime && moment(list[index + 1].cogs_start_datetime).format('YYYYMMDDHH') === moment(item.cogs_start_datetime).format('YYYYMMDDHH') ? range(0, +moment(list[index + 1].cogs_start_datetime).format('mm') + 1) : [],
            }
        }

        if (list[index - 1] && item.cogs_start_datetime && (moment(list[index - 1].cogs_start_datetime).format('YYYYMMDD') === moment(item.cogs_start_datetime).format('YYYYMMDD'))) {
            return {
                disabledHours: () => range(+moment(list[index - 1].cogs_start_datetime).format('HH') + 1, 24),
                disabledMinutes: () => item.cogs_start_datetime && moment(list[index - 1].cogs_start_datetime).format('YYYYMMDDHH') === moment(item.cogs_start_datetime).format('YYYYMMDDHH') ? range(+moment(list[index - 1].cogs_start_datetime).format('mm'), 60) : [],
            }
        }
    }

    useEffect(() => {
        setItem({...list[index]})
    }, [list, index])

    return (<>
        <DatePicker
            getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
            showToday={false}
            showNow={false}
            value={item.cogs_start_datetime ? moment(item.cogs_start_datetime) : undefined}
            showTime={{format: 'HH:mm'}}
            format="DD MMM YYYY, HH:mm"
            placeholder={'Date and time'}
            disabledDate={disabledDate}
            disabledTime={disabledDateTime}
            onChange={(value) => setItem({...item, cogs_start_datetime: value})}
            open={visibleDatePicker}
            onOpenChange={(e) => setVisibleDatePicker(true)}
            onPanelChange={(value, mode) => {
                setVisibleTimePicker(mode === 'time')
            }}
            renderExtraFooter={() => <>
                <p onClick={() => setVisibleTimePicker(prevState => !prevState)}>Select {visibleTimePicker ? 'date' : 'time'}</p>

                <div className="actions">
                    <button className={'btn default'}
                            disabled={!item.cogs_start_datetime}
                            onClick={() => setVisibleDatePicker(false)}>
                        Ok
                    </button>

                    <button
                        className={'btn white'}
                        disabled={processing}
                        onClick={() => {
                            setItem(prevState => ({...prevState, cogs_start_datetime: list[index].cogs_start_datetime}))
                            setVisibleDatePicker(false)
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </>}
        />

        <InputCurrency
            value={item.cogs_value}
            onChange={(value) => setItem({...item, cogs_value: value})}
            placeholder={'CoGS'}
            className={item.cogs_value < 0 && 'failed'}
        />

        <button className="btn blue" onClick={submitHandler}
                disabled={processing || item.cogs_value === undefined || item.cogs_value === '' || !item.cogs_start_datetime || item.cogs_value < 0}>
            Save
            {processing && <Spin size={'small'}/>}
        </button>

        <button className="btn white" onClick={onCancel}>
            Cancel
        </button>
    </>)
}


const PlusIcon = () => (<i>
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#6959AB"/>

        <mask id="mask0000" mask-type="alpha" maskUnits="userSpaceOnUse" x="5" y="5" width="10" height="10">
            <rect x="5" y="5" width="10" height="10" fill="#C4C4C4"/>
        </mask>
        <g mask="url(#mask0000)">
            <path d="M10 5.5V10M10 10H14.5M10 10H5.5M10 10V14.5" stroke="white" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </g>
    </svg>
</i>)

export default CogsWindow