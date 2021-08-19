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
                    src={tableauToken.result.urls.spsd}
                    width="100%"
                    height="100%"
                />

                <script type='text/javascript' src='http://tableau.profitwhales.com/javascripts/api/viz_v1.js'></script>
                <div className='tableauPlaceholder'>
                    <object className='tableauViz' width='1920' height='851' style={{'display': 'none'}}>
                        <param name='host_url' value='http%3A%2F%2Ftableau.profitwhales.com%2F'/>
                        <param name='embed_code_version' value='3'/>
                        <param name='site_root' value=''/>
                        <param name='name' value='ihorprofitwhales_agency&#47;SPSD'/>
                        <param name='tabs' value='no'/>
                        <param name='toolbar' value='yes'/>
                    </object>
                </div>
            </>
        }
    </div>)
}

export default Tableau