import React, {useEffect, useRef, useState} from "react"
import StanMelroseAvatar from "../../../../assets/img/audit-registration/user-avatars/StanMelrose.png"
import EthanCooperAvatar from "../../../../assets/img/audit-registration/user-avatars/EthanCooper.png"
import AlexeyUkhnalevAvatar from "../../../../assets/img/audit-registration/user-avatars/AlexeyUkhnalev.png"
import VasilyKorobkinAvatar from "../../../../assets/img/audit-registration/user-avatars/VasilyKorobkin.png"
import LightingEquipmentBrandAvatar
    from "../../../../assets/img/audit-registration/user-avatars/LightingEquipmentBrand.png"

import './UserComments.less'
import Slider from "react-slick"
import commentIcon from "../../../../assets/img/landing-pricing/comment-icon.svg"

const comments = [
    {
        userName: 'Stan Melrose',
        userAvatar: StanMelroseAvatar,
        comment: `It was a new company for me... We have started form audit and detailed analysis of our niche. We spent some time to remake and prepare all needed campaigns. After the first 3 weeks, we have <span>launched</span> additional campaigns as SB / SD. We were <span>impressed</span> that our PPC campaigns could work <span>so well</span>. They have <span>improved</span> all our metrics and thanks to software+human control we start focusing on our business.`,
        caseLink: 'https://blog.profitwhales.com/studies/why-amazon-ppc-matters/',
    },
    {
        userName: 'Ethan Cooper',
        userAvatar: EthanCooperAvatar,
        comment: `<span>Amazing company</span>. Loved the <span>support</span> from these guys. They correctly built the structure for my advertising companies. I am also <span>impressed</span> with their software. Very easy to use and you can set a strategy and not worry about the everyday work with advertising.`,
        caseLink: 'https://blog.profitwhales.com/studies/nutritional-supplements/',
    },
    {
        userName: 'Alexey Ukhnalev',
        userAvatar: AlexeyUkhnalevAvatar,
        comment: `I dreamt about <span>PPC automation</span> in several clicks in an efficient way. In <span>Profit Whales</span> they make it happen. For those who tired of high ACOS, CPC and time spent optimizing AD groups.`,
        caseLink: 'https://blog.profitwhales.com/studies/table-tennis-equipment/',
    },
    {
        userName: 'Vasily Korobkin,',
        userRole: 'Divelux, CEO',
        userAvatar: VasilyKorobkinAvatar,
        comment: `Finding a way into the top of page 1 results and directing major demand is an art form of <span>Profit Whales</span>. Our in-house Amazon marketing was adequate, but we needed some external knowledge to break the ice - the guys from Profit Whales are <span>real professionals</span> in regards not only to PPC optimization but also in the field of Amazon itself.`,
        caseLink: 'https://blog.profitwhales.com/studies/zero-to-hero/',
    },
    {
        userName: 'Lighting Equipment Brand',
        userAvatar: LightingEquipmentBrandAvatar,
        comment: `We've decided to <span>use Profit Whales Software</span> because of its user-friendly interface and <span>ready-made full optimization</span>. There wasn’t anything that we have wanted that Profit Whales Team said couldn’t be done with their Automation tool. You indicate your business goal - and the <span>software performs changes</span> by itself.`,
        caseLink: 'https://blog.profitwhales.com/studies/lighting-equipment/',
    },
]

let intervalId = null

const CommentItem = ({comment}) => (
    <>
        <p dangerouslySetInnerHTML={{__html: comment.comment}}/>

        <div className="row">
            <img src={comment.userAvatar} alt=""/>

            <h3>
                {comment.userName}
                {comment.userRole && <><br/> <span>{comment.userRole}</span></>}
            </h3>

            <a href={comment.caseLink} target={'_blank'} className={'btn white'}>Check My Case</a>
        </div>
    </>
)

const UserComments = ({currentStep}) => {
    const refId = useRef(null)

    let sliderRef

    const [intervalIteration, setIntervalIteration] = useState(0),
        [listState, setListState] = useState('start')

    // useEffect(() => {
    //     if (refId.current.clientHeight < intervalIteration) {
    //         clearInterval(intervalId)
    //     } else {
    //         intervalId = setInterval(() => {
    //             document.querySelector('.user-comments').scrollTop = intervalIteration
    //
    //             setIntervalIteration(prevState => prevState + 1)
    //         }, 50)
    //     }
    //
    //     return (() => {
    //         clearInterval(intervalId)
    //     })
    //
    // }, [intervalIteration])


    const scrollHandler = (e) => {
        if (e.target.scrollTop >= e.target.offsetHeight - 110) {
            setListState('finished')
        } else if (e.target.scrollTop >= 10) {
            setListState('progress')
        } else if (e.target.scrollTop < 10) {
            setListState('start')
        }
    }

    useEffect(() => {
        sliderRef && currentStep !== 0 && sliderRef.slickNext()
    }, [currentStep])

    return (
        <>
            <ul className={`${listState} user-comments desc`} ref={refId} onScroll={scrollHandler}>
                {comments.map(item => (
                    <li>
                        <CommentItem comment={item}/>
                    </li>
                ))}
            </ul>

            <div className="user-comments mob">
                <Slider
                    ref={c => (sliderRef = c)}
                    dots={true}
                    infinite={true}
                    arrows={false}
                    speed={500}
                    slidesToShow={1}
                    slidesToScroll={1}
                >
                    {comments.map((item, index) => (
                        <div className="slide-item">
                            <CommentItem comment={item}/>
                        </div>
                    ))}
                </Slider>
            </div>

        </>
    )
}

export default UserComments
