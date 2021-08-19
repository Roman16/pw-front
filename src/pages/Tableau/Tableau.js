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
        var divElement = document.getElementById('viz1629369153169')
        var vizElement = divElement.getElementsByTagName('object')[0]
        if (divElement.offsetWidth > 800) {
            vizElement.style.width = '100%'
            vizElement.style.height = (divElement.offsetWidth * 0.75) + 'px'
        } else if (divElement.offsetWidth > 500) {
            vizElement.style.width = '1000px'
            vizElement.style.height = '827px'
        } else {
            vizElement.style.width = '100%'
            vizElement.style.height = '2927px'
        }
        var scriptElement = document.createElement('script')
        scriptElement.src = 'https://public.tableau.com/javascripts/api/viz_v1.js'
        vizElement.parentNode.insertBefore(scriptElement, vizElement)

        getTableauToken()
    }, [])

    return (<div className={'tableau-page'}>

        {loading ? <RouteLoader/> :
            <>

                <script type='text/javascript'>
                </script>
                <iframe
                    src={`${tableauToken.result.urls.fullview}?:embed=yes&:tabs=yes&:toolbar=yes`}
                    width="100%"
                    height="100%"
                />

            </>
        }

        <div className='tableauPlaceholder' id='viz1629369153169'>
            <noscript><a href='#'>
                <img alt='7 days check '
                     src='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Da&#47;Dashboardupd&#47;Fullview&#47;1_rss.png'
                /></a></noscript>
            <object className='tableauViz' style={{'display': 'none'}}>
                <param name='host_url' value='https%3A%2F%2Fpublic.tableau.com%2F'/>
                <param name='embed_code_version' value='3'/>
                <param name='site_root' value=''/>
                <param name='name' value='Dashboardupd&#47;Fullview'/>
                <param name='tabs' value='no'/>
                <param name='toolbar' value='yes'/>
                <param name='static_image'
                       value='https:&#47;&#47;public.tableau.com&#47;static&#47;images&#47;Da&#47;Dashboardupd&#47;Fullview&#47;1.png'/>
                <param name='animate_transition' value='yes'/>
                <param name='display_static_image' value='yes'/>
                <param name='display_spinner' value='yes'/>
                <param name='display_overlay' value='yes'/>
                <param name='display_count' value='yes'/>
                <param name='language' value='en-US'/>
            </object>
        </div>

    </div>)
}

export default Tableau