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

            console.log(res.result.urls.spsd.split('/')[4])

            // const url = await tableauServices.getUrl(res.result.urls.spsd)

            // console.log(url)

        } catch (e) {
            console.log(e)
        }

        setLoading(false)
    }

    const options = {
        height: '100%',
        width: '100%',
        hideTabs: false,
        // All other vizCreate options are supported here, too
        // They are listed here: https://onlinehelp.tableau.com/current/api/js_api/en-us/JavaScriptAPI/js_api_ref.htm#ref_head_9
    }

    const filters = {
        Colors: ['Blue', 'Red'],
        Sizes: ['Small', 'Medium']
    }

    const parameters = {
        Param1: 'Value',
        Param2: 'Other Value'
    }


    useEffect(() => {

        getTableauToken()
    }, [])

    return (<div className={'tableau-page'}>
        {loading ? <RouteLoader/> :
            <>
                {/*<iframe*/}
                {/*    src={`${tableauToken.result.urls.spsd}?:language=en-US&:display_count=n&:origin=viz_share_link`}*/}
                {/*    width="100%"*/}
                {/*    height="100%"*/}
                {/*/>*/}

                {/*<iframe*/}
                {/*    src={`http://tableau.profitwhales.com/views/ihorprofitwhales_agency/SPSD?:embed=y#2`}*/}
                {/*    width="100%"*/}
                {/*    height="100%"*/}
                {/*/>*/}

                <TableauReport
                    url={tableauToken.result.urls.spsd}
                    token={tableauToken.result.urls.spsd.split('/')[4]}
                    filters={filters}
                    parameters={parameters}
                    options={options} // vizCreate options
                />
            </>
        }


    </div>)
}

export default Tableau