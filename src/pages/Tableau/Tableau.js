import React, {useEffect} from "react"
import './Tableau.less'
import RouteLoader from "../../components/RouteLoader/RouteLoader"
import {tableauServices} from "../../services/tableau.services"

const Tableau = () => {
    const getTableauToken = async () => {
        try {
            const res = await tableauServices.getToken()
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getTableauToken()
    }, [])

    return (<div className={'tableau-page'}>
        <RouteLoader/>
    </div>)
}

export default Tableau