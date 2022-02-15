import React, {useEffect, useState} from "react"
import './BillingInformation.less'
import AddedCards from "./AddedCards"
import {userService} from "../../../services/user.services"
import CardInformation from "./CardInformation"
import RouteLoader from "../../../components/RouteLoader/RouteLoader"
import _ from 'lodash'
import axios from "axios"
import {notification} from "../../../components/Notification"
import {toast} from 'react-toastify'


const CancelToken = axios.CancelToken
let source = null

const BillingInformation = () => {
    const [addedCardsList, setAddedCardsList] = useState([]),
        [activeCardIndex, setActiveCardIndex] = useState(0),
        [fetchingProcessing, setFetchingProcessing] = useState(true),
        [defaultProcessing, setDefaultProcessing] = useState(false),
        [deleteProcessing, setDeleteProcessing] = useState([]),
        [updateProcessing, setUpdateProcessing] = useState(false),
        [newCardValue, setNewCardValue] = useState({
            name: '',
            line1: '',
            city: '',
            postal_code: '',
            country: undefined
        })

    const mapCards = (cards) => {
        return [...cards.map(i => ({
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

        }))]
    }

    const getPaymentMethodList = async () => {
        setFetchingProcessing(true)

        try {
            const res = await userService.fetchBillingInformation()
            setAddedCardsList(mapCards(res))
        } catch (e) {
            console.log(e)
        }

        setFetchingProcessing(false)
    }

    const deleteCardHandler = async (id) => {
        setDeleteProcessing(prevState => [...prevState, id])
        try {
            await userService.deletePaymentMethod(id)

            setAddedCardsList(prevState => [...prevState.filter(i => i.id !== id)])

            if (_.find(addedCardsList, {id: id}).default && addedCardsList[0]) {
                setAddedCardsList(prevState => [...prevState.map((i, index) => {
                    i.default = index === 0
                    return i
                })])
            }

            if (_.findIndex(addedCardsList, {id: id}) === activeCardIndex) setActiveCardIndex(0)
        } catch (e) {
            console.log(e)
        }

        setDeleteProcessing(prevState => [...prevState.filter(i => i !== id)])
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

    const addNewCardHandler = async (card, isDefault) => {
        setUpdateProcessing(true)

        try {
            const res = await userService.addPaymentMethod(card)
            setAddedCardsList(mapCards(res.map((i, index) => {
                if (index === 0 && isDefault) i.default = true
                return i
            })))

            setActiveCardIndex(0)

            if (isDefault) setDefaultCardHandler(card.stripe_token)
        } catch (e) {
            console.log(e)
        }

        setUpdateProcessing(false)
    }

    const updateCardHandler = async (card, isDefault) => {
        setUpdateProcessing(true)

        try {
            if (isDefault && !addedCardsList[activeCardIndex].default) setDefaultCardHandler(card.stripe_token)

            const res = await userService.updatePaymentMethod(card)
            setAddedCardsList(mapCards(res))

            notification.success({title: 'Completed'})
        } catch (e) {
            console.log(e)
        }

        setUpdateProcessing(false)
    }

    useEffect(() => {
        getPaymentMethodList()

        const toastId = notification.info({
            title: 'We’re sorry!',
            description: 'We do not accept Pioneer cards yet, but our team works on this issue. Until we deal with the problem, please, do not enter the Pioneer card number because the payment will not be completed.'
        })

        return (() => {
            toast.dismiss(toastId)
        })
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
                cardList={addedCardsList}
                card={addedCardsList[activeCardIndex] ? {...addedCardsList[activeCardIndex]} : newCardValue}
                isNewCard={addedCardsList.length === activeCardIndex}
                updateProcessing={updateProcessing}
                deleteProcessing={deleteProcessing}

                onAddCard={addNewCardHandler}
                onUpdateCard={updateCardHandler}
                onDelete={deleteCardHandler}
            />

            {fetchingProcessing && <RouteLoader/>}
        </div>
    )
}

export default BillingInformation