import React, {useEffect, useState} from "react"
import './Tableau.less'
import RouteLoader from "../../components/RouteLoader/RouteLoader"
import {tableauServices} from "../../services/tableau.services"

const Tableau = () => {
    const [loading, setLoading] = useState(true),
        [tableauToken, setTableauToken] = useState('')

    const getTableauToken = async () => {
        setLoading(true)

        try {
            const res = await tableauServices.getToken()

            setTableauToken(res)
            console.log(res)
        } catch (e) {
            console.log(e)
        }

        setLoading(false)
    }


    useEffect(() => {
        getTableauToken()
    }, [])

    return (<div className={'tableau-page'}>
        {loading ? <RouteLoader/> :
            <>
                <iframe
                    src={`${tableauToken.result.urls.spsd}?:showVizHome=no&:embed=true`}
                    width="100%"
                    height="100%"
                />
            </>
        }
    </div>)
}

export default Tableau