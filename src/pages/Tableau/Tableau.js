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

    useEffect(() => {
        // if (!loading) {
        //     var divElement = document.getElementById('viz1626099549770')
        //     var vizElement = divElement.getElementsByTagName('object')[0]
        //     if (divElement.offsetWidth > 800) {
        //         vizElement.style.width = '100%'
        //         vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px'
        //     } else if (divElement.offsetWidth > 500) {
        //         vizElement.style.width = '1000px'
        //         vizElement.style.height = '827px'
        //     } else {
        //         vizElement.style.width = '100%'
        //         vizElement.style.height = '2927px'
        //     }
        //     var scriptElement = document.createElement('script')
        //     scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
        //     vizElement.parentNode.insertBefore(scriptElement, vizElement)
        // }
    }, [loading])


    return (<div className={'tableau-page'}>
        {loading ? <RouteLoader/> :

            <>
                {/*<script type="text/javascript" src="http://myserver/javascripts/api/viz_v1.js"></script>*/}
                {/*<object className="tableauViz" width="800" height="600" style={{display: 'none'}}>*/}
                {/*    <param name="name" value="MyCoSales/SalesScoreCard"/>*/}
                {/*    <param name="ticket" value="9D1ObyqDQmSIOyQpKdy4Sw==:dg62gCsSE0QRArXNTOp6mlJ5"/>*/}
                {/*</object>*/}

                <iframe
                    // src="http://tabserver/trusted/9D1ObyqDQmSIOyQpKdy4Sw==:dg62gCsSE0QRArXNTOp6mlJ5/views/workbookQ4/SalesQ4?:embed=yes"
                    src={tableauToken.result.urls.spsd}
                    width="100%"
                    height="100%"
                />
            </>
           }
    </div>)
}

export default Tableau