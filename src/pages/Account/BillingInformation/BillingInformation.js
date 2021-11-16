import React, {useEffect, useState} from "react"
import './BillingInformation.less'
import AddedCards from "./AddedCards"
import {userService} from "../../../services/user.services"
import CardInformation from "./CardInformation"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"
import _ from 'lodash'
import axios from "axios"


const CancelToken = axios.CancelToken
let source = null

const BillingInformation = () => {
    const [addedCardsList, setAddedCardsList] = useState([]),
        [activeCardIndex, setActiveCardIndex] = useState(0),
        [fetchingProcessing, setFetchingProcessing] = useState(true),
        [defaultProcessing, setDefaultProcessing] = useState(false),
        [deleteProcessing, setDeleteProcessing] = useState(false),
        [newCardValue, setNewCardValue] = useState({
            name: '',
            line1: '',
            city: '',
            postal_code: '',
            country: undefined
        })

    const getPaymentMethodList = async () => {
        setFetchingProcessing(true)

        try {
            const res = await userService.fetchBillingInformation()
            setAddedCardsList([...res.map(i => ({
                id: i.id,
                brand: i.brand,
                default: i.default,
                last4: i.last4,
                exp_month: i.exp_month,
                exp_year: i.exp_year,
                name: i.address.name,
                line1: i.address.address.line1,
                city: i.address.address.city,
                postal_code: i.address.address.postal_code,
                country: i.address.address.country || undefined,

            }))])
        } catch (e) {
            console.log(e)
        }

        setFetchingProcessing(false)
    }

    const deleteCardHandler = async (id) => {
        setDeleteProcessing(id)
        try {
            await userService.deletePaymentMethod(id)

            if (_.find(addedCardsList, {id: id}).default && addedCardsList[0]) {
                setAddedCardsList(prevState => [...prevState.map((i, index) => {
                    i.default = index === 0
                    return i
                })])
            }

            setAddedCardsList(prevState => [...prevState.filter(i => i.id !== id)])
        } catch (e) {
            console.log(e)
        }

        setDeleteProcessing(false)
    }

    const setDefaultCardHandler = async (id) => {
        setDefaultProcessing(id)
        source && source.cancel()
        source = CancelToken.source()

        try {
            await userService.setDefaultPaymentMethod(id, source.token)

            setAddedCardsList(prevState => [...prevState.map(i => {
                i.default = i.id === id
                return i
            })])

            setDefaultProcessing(false)
        } catch (e) {
            if (e.message !== undefined) setDefaultProcessing(false)
        }
    }

    useEffect(() => {
        getPaymentMethodList()
    }, [])

    return (
        <div className="billing-information">
            <AddedCards
                cards={addedCardsList}
                activeCardIndex={activeCardIndex}
                defaultProcessing={defaultProcessing}
                deleteProcessing={deleteProcessing}

                onSetActive={setActiveCardIndex}
                onDelete={deleteCardHandler}
                onSetDefault={setDefaultCardHandler}
            />

            <CardInformation
                card={addedCardsList[activeCardIndex] ? {...addedCardsList[activeCardIndex]} : newCardValue}
                isNewCard={addedCardsList.length === activeCardIndex}
            />

            {fetchingProcessing && <RouteLoader/>}
        </div>
    )
}

export default BillingInformation