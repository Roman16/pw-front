import React, {useEffect, useState} from "react"
import './BillingInformation.less'
import AddedCards from "./AddedCards"
import {userService} from "../../../services/user.services"
import CardInformation from "./CardInformation"

const BillingInformation = () => {
    const [addedCardsList, setAddedCardsList] = useState([]),
        [activeCardIndex, setActiveCardIndex] = useState(0)

    const getPaymentMethodList = async () => {
        try {
            const res = await userService.fetchBillingInformation()
            setAddedCardsList(res)
        } catch (e) {
            console.log(e)
        }
    }

    const deleteCardHandler = async () => {
        try {

        } catch (e) {
            console.log(e)
        }
    }

    const setDefaultCardHandler = async () => {
        try {

        } catch (e) {
            console.log(e)
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

                onSetActive={setActiveCardIndex}
                onDelete={deleteCardHandler}
                onSetDefault={setDefaultCardHandler}
            />

            <CardInformation
                activeCard={addedCardsList[activeCardIndex]}
            />
        </div>
    )
}

export default BillingInformation