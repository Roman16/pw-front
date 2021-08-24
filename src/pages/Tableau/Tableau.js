import React, {useEffect, useState} from "react"
import './Tableau.less'
import RouteLoader from "../../components/RouteLoader/RouteLoader"
import {tableauServices} from "../../services/tableau.services"
import TableauReport from 'tableau-react-embed'

const Tableau = () => {
    const [loading, setLoading] = useState(true),
        [tableauToken, setTableauToken] = useState('')

    const getTableauToken = async () => {
        setLoading(true)

        try {
            const res = await tableauServices.getToken()
            setTableauToken(res)
        } catch (e) {
            console.log(e)
        }

        setLoading(false)
    }

    const options = {
        height: '100%',
        width: '100%',
        hideTabs: false,
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
            </>
        }


    </div>)
}

export default Tableau