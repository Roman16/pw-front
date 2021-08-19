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

            const url = await tableauServices.getUrl(res.result.urls.spsd)

            console.log(url)

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
                    src={`${tableauToken.result.urls.spsd}?:language=en-US&:display_count=n&:origin=viz_share_link`}
                    width="100%"
                    height="100%"
                />

                <iframe
                    src={`http://tableau.profitwhales.com/views/ihorprofitwhales_agency/SPSD?:embed=y#2`}
                    width="100%"
                    height="100%"
                />
            </>
        }


    </div>)
}

export default Tableau