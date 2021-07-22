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

const CogsWindow = ({visible, productId, onClose}) => {
    const [cogsList, setCogsList] = useState([]),
        [activeItem, setActiveItem] = useState(),
        [activeIndex, setActiveIndex] = useState()

    const getCogs = async () => {
        try {
            const res = await productsServices.getProductCogs(productId)

            setCogsList(res.result.sort((a,b) => moment(b.start_date).format('YYYYMMDD') - moment(a.start_date).format('YYYYMMDD')))
        } catch (e) {
            console.log(e)
        }
    }

    const addNew = (index) => {
        const defaultItem = {start_date: undefined, cogs_value: undefined},
            list = [...cogsList]

        if (index === 0) {
            setCogsList([defaultItem, ...list])
            setActiveIndex(0)
        } else if (index === cogsList.length) {
            setCogsList([...list, defaultItem])
            setActiveIndex(cogsList.length)
        } else {
            list.splice(index, 0, defaultItem)

            setCogsList([...list])
            setActiveIndex(index)
        }
    }

    const onEdit = (index, item) => {
        setActiveIndex(index)
        setActiveItem(item)
    }

    const onRemove = async (id) => {
        try {
            await productsServices.deleteProductCogs(id)
            setCogsList([...cogsList.filter((item) => item.record_id !== id)])
        } catch (e) {
            console.log(e)
        }
    }

    const submitItemHandler = async (data) => {
        try {
            const requestData = {
                product_id: productId,
                start_date: moment(data.start_date).utc(),
                cogs_value: data.cogs_value,
                record_id: data.record_id || undefined
            }

            if (data.record_id) {
                await productsServices.updateProductCogs(requestData)
            } else {
                await productsServices.createProductCogs(requestData)
            }

            getCogs()
        } catch (e) {
            console.log(e)
        }

        setActiveIndex(undefined)
    }

    useEffect(() => {
        productId && getCogs()
    }, [productId])

    return (
        <ModalWindow
            visible={visible}
            footer={false}
            className={'cogs-window'}
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

                {cogsList.map((item, index) => <li className={activeIndex === index && 'active'}>
                    <div className="add-new-item" onClick={() => addNew(index)}>
                        <PlusIcon/>
                    </div>

                    <PlusIcon/>

                    {activeIndex === index ? <EditingCogsFields
                        data={activeItem}
                        list={cogsList}
                        index={index}
                        onSubmit={submitItemHandler}
                    /> : <>
                        <div className="time">{moment(item.start_date).format('DD MMM YYYY, HH:mm')},</div>
                        <div className="value">{numberMask(item.cogs_value, 2)}$</div>

                        <button className="btn icon edit-btn" onClick={() => onEdit(index, item)}>
                            <SVG id={'edit-pen-icon'}/>
                        </button>
                        <button className="btn icon remove-btn" onClick={() => onRemove(item.record_id)}>
                            <SVG id={'close-window-icon'}/>
                        </button>
                    </>}
                </li>)}

                {cogsList.length > 0 &&
                <li className={'new-item'} onClick={() => addNew(cogsList.length)}>
                    <div className="add-new-item">
                        <PlusIcon/>
                    </div>

                    <PlusIcon/>
                    Add new
                </li>}
            </ul>
        </ModalWindow>
    )
}

const EditingCogsFields = ({data, onSubmit, list, index}) => {
    const [item, setItem] = useState({...data}),
        [processing, setProcessing] = useState(false)

    const submitHandler = () => {
        setProcessing(true)
        onSubmit(item)
    }

    function disabledDate(current) {
        if (index === 0) {
            return current && current <= moment(list[index + 1].start_date).endOf('day')
        } else if (index === list.length - 1) {
            return current && current >= moment(list[index - 1].start_date).subtract(1, "days").endOf('day')
        } else {
            return current && (current >= moment(list[index - 1].start_date).subtract(1, "days").endOf('day') || current <= moment(list[index + 1].start_date).endOf('day'))
        }
    }

    return (<>
        <DatePicker
            getCalendarContainer={(trigger) => trigger.parentNode.parentNode.parentNode}
            showToday={false}
            value={item.start_date ? moment(item.start_date) : undefined}
            showTime={{format: 'HH:mm'}}
            format="DD MMM YYYY, HH:mm"
            placeholder={'Date and time'}
            disabledDate={disabledDate}
            onChange={(value) => setItem({...item, start_date: value})}
        />

        <InputCurrency
            value={item.cogs_value}
            onChange={(value) => setItem({...item, cogs_value: value})}
            placeholder={'CoGS'}
        />

        <button className="btn default" onClick={submitHandler} disabled={processing}>
            Save
            {processing && <Spin size={'small'}/>}
        </button>
    </>)
}

const PlusIcon = () => (<i>
    <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="10" fill="#6D6DF6"/>

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