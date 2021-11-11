import React from "react"
import './Profile.less'
import {useSelector} from "react-redux"

const Profile = () => {
    const userInformation = useSelector(state => state.user.user)

    return (<section className={'profile'}>
        <div className="container">
            <SectionIcon/>

            <div className="col">
                <h3>Personal Information</h3>

                <p>You can change your personal information here.</p>

                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        placeholder={'First Name'}
                        value={userInformation.name}
                    />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        placeholder={'Last Name'}
                        value={userInformation.last_name}
                    />
                </div>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        disabled
                        placeholder={'Email Address'}
                        value={userInformation.email}
                    />
                </div>
            </div>
        </div>
    </section>)
}

const SectionIcon = () => <i>
    <svg width="122" height="120" viewBox="0 0 122 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="62" cy="60" r="60" fill="#F3F3F3"/>
        <mask id="mask0_20467:62927" maskUnits="userSpaceOnUse" x="2" y="0"
              width="120" height="120">
            <circle cx="62" cy="60" r="60" fill="#C4C4C4"/>
        </mask>
        <g>
            <path
                d="M90 50.9992V52.4027C90 54.1225 90.2773 55.8309 90.821 57.4622L94 66.9991H99.9999V44.999H95.9999C92.6863 44.9993 90 47.6854 90 50.9992Z"
                fill="#A9ADBB"/>
            <path
                d="M117.384 55.1544L114 66.9998L98 52.9999C95.7907 52.9999 94 51.2089 94 49C94 45.6863 96.6863 43 100 43H114C116.209 43 118 44.791 118 47V50.7592C118 52.2455 117.793 53.7248 117.384 55.1544Z"
                fill="#BABDC8"/>
            <path d="M109.999 73.001H97.9988V81.8527H109.999V73.001Z" fill="#C9CBD4"/>
            <path
                d="M98 76.6737C99.8549 77.4274 101.878 77.8517 104 77.8517C106.122 77.8517 108.145 77.4274 110 76.6737V73H98V76.6737Z"
                fill="#C9CBD4"/>
            <path
                d="M119.648 80.6084L109.999 77.8518L104 81.8331L98 77.8516L88.3518 80.6084C85.7758 81.3444 84.0001 83.6987 84.0001 86.3775V111.5C84.0001 112.605 84.8955 113.5 86.0001 113.5H122C123.105 113.5 124 112.605 124 111.5V86.3775C124 83.6985 122.224 81.3444 119.648 80.6084Z"
                fill="white"/>
            <path d="M106 107.5H102L103 81.8516H105L106 107.5Z" fill="#C9CBD4"/>
            <path
                d="M104 74.9999C97.3724 74.9999 92 69.6272 92 63V60.6569C92 59.5961 92.4214 58.5787 93.1715 57.8284L96.7982 54.2016C97.5662 53.4336 98.6163 52.9921 99.7018 53.0263C106.095 53.228 111.754 54.5976 114.847 57.6189C115.605 58.3585 116 59.3931 116 60.4515V63C116 69.6275 110.627 74.9999 104 74.9999Z"
                fill="#DEDFE4"/>
            <path
                d="M97.9999 61.1531C97.9999 58.846 99.9375 57.0122 102.24 57.1589C106.277 57.4166 112.269 58.0914 115.944 59.8593C115.824 59.0156 115.462 58.219 114.847 57.6189C111.754 54.5976 106.095 53.228 99.7018 53.0263L99.7016 53.0265V53.0263C98.6163 52.9921 97.566 53.4339 96.7982 54.2016L93.1717 57.8281C92.4214 58.5782 92 59.5956 92 60.6566V62.9998C92 68.4723 95.667 73.0799 100.675 74.5228C99.0082 72.4662 98.0002 69.8554 98.0002 66.9998L97.9999 61.1531Z"
                fill="#C9CBD4"/>
            <path
                d="M116 92.3371C116 90.7457 116.632 89.2197 117.757 88.0945L122.906 82.9463C123.594 83.9298 124 85.1139 124 86.3778V101C124 102.105 123.105 103 122 103H116V92.3371Z"
                fill="#C7CFE2"/>
            <path
                d="M105 85.8515H103C102.448 85.8515 102 85.4037 102 84.8515V81.8516H106V84.8515C106 85.4037 105.552 85.8515 105 85.8515Z"
                fill="#BABDC8"/>
            <path
                d="M104 81.8336L100.61 84.4229C100.026 84.869 99.1819 84.6902 98.829 84.0455L95.7881 78.4922L97.0121 76.6251C97.2836 76.211 97.8622 76.1405 98.2252 76.4772L104 81.8336Z"
                fill="white"/>
            <path
                d="M104 81.8334L107.39 84.4229C107.974 84.869 108.818 84.6902 109.171 84.0455L112.212 78.4922L110.988 76.6251C110.716 76.211 110.138 76.1405 109.775 76.4772L104 81.8334Z"
                fill="white"/>
            <path
                d="M35.8007 74.1648C34.0916 69.6364 32.7361 61.8517 32.4433 57.7987C31.8862 50.086 26.074 43.7988 18.2169 43.7988C10.3599 43.7988 4.54761 50.0863 3.99058 57.7987C3.69777 61.8515 2.34225 69.6364 0.633132 74.1648C0.256531 75.1631 0.691257 76.2638 1.6743 76.7094C3.50572 77.5394 7.41051 79.1655 12.1198 79.7988H24.3137C29.001 79.164 32.9332 77.537 34.7593 76.7094C35.7426 76.2638 36.1773 75.1631 35.8007 74.1648Z"
                fill="#A9ADBB"/>
            <path
                d="M34.7595 76.7094C35.7423 76.2638 36.1773 75.1631 35.8005 74.1648C34.0916 69.6363 32.7358 61.8517 32.4433 57.7987C31.8865 50.086 26.074 43.7988 18.2172 43.7988C18.1973 43.7988 18.1777 43.7988 18.1578 43.7991C12.1291 43.8235 9.99853 52.0456 15.1884 55.1133C15.5001 55.2976 15.6999 55.3863 15.6999 55.3863L20.2455 79.7988H24.314C29.0013 79.1635 32.9334 77.5367 34.7595 76.7094Z"
                fill="#BABDC8"/>
            <path
                d="M32.6832 83.8141L26.211 80.5783C24.8557 79.9006 23.9996 78.5153 23.9998 77.0002L24.0003 71H11.9999V77.0004C11.9999 78.5156 11.144 79.9004 9.78873 80.578L3.31652 83.8141C1.28384 84.8304 0 86.9078 0 89.1803V101C0 102.104 0.895367 103 1.99998 103H34C35.1046 103 36 102.104 36 101V89.1805C36 86.9078 34.7159 84.8304 32.6832 83.8141Z"
                fill="#C9CBD4"/>
            <path
                d="M18.0001 78.9999C20.1536 78.9999 22.2163 78.556 24.1073 77.7657C24.0576 77.5136 23.9998 77.263 23.9998 77.0002L24.0002 71H11.9999V77.0004C11.9999 77.2647 11.942 77.5165 11.8918 77.7696C13.7841 78.5558 15.8458 78.9999 18.0001 78.9999Z"
                fill="#C9CBD4"/>
            <path
                d="M32.6832 83.8144L28.0724 81.509C25.9344 84.8105 22.2263 87.0002 18.0001 87.0002C13.7739 87.0002 10.0656 84.8105 7.92752 81.5088L3.31676 83.8144C1.28408 84.8306 0 86.9081 0 89.1806V111C0 112.105 0.895367 113 1.99998 113H34C35.1046 113 36 112.105 36 111V89.1808C36 86.9081 34.7159 84.8306 32.6832 83.8144Z"
                fill="white"/>
            <path
                d="M18.0002 75C11.899 75 6.86147 70.4469 6.09979 64.5533C5.98935 63.6993 6.39986 62.8621 7.16856 62.4743C8.08936 62.0098 9.42745 61.2266 10.7086 60.0835C12.1353 58.8105 12.9723 57.4681 13.4451 56.4826C13.8522 55.634 14.788 55.154 15.7001 55.3867C22.7419 57.1828 27.536 60.8464 29.2754 62.3421C29.7424 62.7437 30.0114 63.3358 29.9635 63.95C29.4789 70.133 24.3079 75 18.0002 75Z"
                fill="#DEDFE4"/>
            <path
                d="M29.2751 62.3421C27.536 60.8464 22.7416 57.1828 15.6998 55.3867C14.7877 55.154 13.8519 55.634 13.4448 56.4826C13.0868 57.229 12.4952 58.1799 11.6172 59.1506C11.617 59.153 11.6163 59.1549 11.616 59.1573C11.3436 59.4661 11.0534 59.7756 10.7086 60.0837C9.42738 61.2271 8.0893 62.0101 7.1685 62.4746C6.3998 62.8623 5.98953 63.6998 6.09973 64.5538C6.78391 69.8468 10.9258 74.0599 16.1808 74.8634C13.7863 73.2345 12.0001 70.9943 12.0001 67.0006V64.1486C12.4545 63.8131 12.912 63.4787 13.3716 63.0684C14.4833 62.0764 15.4537 60.9292 16.2319 59.694C21.6189 61.3751 25.271 64.175 26.6556 65.3656C27.0347 65.6979 27.9753 66.5649 29.0758 67.5973C29.5493 66.4578 29.8624 65.2353 29.9629 63.9505C30.0111 63.336 29.7421 62.7439 29.2751 62.3421Z"
                fill="#C9CBD4"/>
            <path
                d="M1.21917 85.5752C0.448773 86.5977 0 87.852 0 89.1804V101C0 102.104 0.895367 103 1.99998 103H7.99994V92.9222C7.99994 91.7071 7.44751 90.5577 6.49862 89.7987L1.21917 85.5752Z"
                fill="#C7CFE2"/>
            <path
                d="M90.7338 81.0842L73.9999 74.999L62 78.9992L50.0001 74.9993L33.2661 81.0845C30.1046 82.2341 28 85.2387 28 88.6027V128C28 129.104 28.8954 130 30 130H94C95.1046 130 96 129.104 96 128V88.6027C96 85.2385 93.8956 82.2339 90.7338 81.0842Z"
                fill="#A9ADBB"/>
            <path d="M59.9048 83L58 129.5H66L64.0951 83H59.9048Z" fill="#828796"/>
            <path
                d="M64.0999 85.7478H59.9003C59.127 85.7478 58.5002 85.121 58.5002 84.3477V79H65.4997V84.3477C65.5 85.1208 64.8732 85.7478 64.0999 85.7478Z"
                fill="#8C909E"/>
            <path
                d="M93.8472 83.1523C95.1977 84.6018 96 86.5323 96 88.603V121C96 122.105 95.1047 123 94 123H84.0001V96.3133C84.0001 94.1915 84.8429 92.1566 86.3433 90.6565L93.8472 83.1523Z"
                fill="#BABDC8"/>
            <path
                d="M84 33.7545V17C84 14.7907 82.2091 13 80.0001 13H56C47.1635 13 39.9999 20.1634 39.9999 29.0001V33.7545C39.9999 35.9042 40.3464 38.0398 41.0263 40.079L41.692 42.0763C41.896 42.6881 41.9999 43.3287 41.9999 43.9736V45H81.9998V43.9736C81.9998 43.3287 82.1037 42.6881 82.3076 42.0763L82.9734 40.079C83.6535 38.0395 84 35.9039 84 33.7545Z"
                fill="#A9ADBB"/>
            <path
                d="M50.0001 21.1249C50.0001 25.6122 53.6378 29.2498 58.125 29.2498H59.25L59.793 44.9997H81.9999V43.9734C81.9999 43.3284 82.1038 42.6878 82.3077 42.0761L82.9735 40.0787C83.6533 38.0395 83.9999 35.9039 83.9999 33.7543V17C83.9999 14.7907 82.2089 13 79.9999 13H58.125C53.6378 13 50.0001 16.6377 50.0001 21.1249Z"
                fill="#BABDC8"/>
            <path d="M74.0004 61.001H49.9996V79.0003H74.0004V61.001Z" fill="#C9CBD4"/>
            <path
                d="M50 67.7628C53.533 69.8096 57.6233 70.9999 61.9999 70.9999C66.3765 70.9999 70.467 69.8096 73.9998 67.7628V61H49.9998L50 67.7628Z"
                fill="#C9CBD4"/>
            <path
                d="M62 79L55.6213 85.3787C54.7639 86.236 53.3469 86.1394 52.614 85.1736L46.0001 76.4587L47.7301 72.813C48.2406 71.7372 49.5721 71.343 50.5859 71.9678L62 79Z"
                fill="#BABDC8"/>
            <path
                d="M62 79L68.3787 85.3787C69.2361 86.236 70.6531 86.1394 71.386 85.1736L77.9999 76.4587L76.2699 72.813C75.7594 71.7372 74.4278 71.343 73.4141 71.9678L62 79Z"
                fill="#BABDC8"/>
            <path
                d="M62.0001 67C50.9544 67 42 58.0456 42 47V44.6568C42 43.596 42.4214 42.5786 43.1715 41.8283L44.8283 40.1715C45.5783 39.4214 45.9997 38.404 45.9997 37.343V32.5486C45.9997 31.6225 46.6217 30.818 47.5228 30.6051C52.253 29.4879 66.9724 26.8415 76.9896 34.2088C77.6401 34.6871 77.9997 35.473 77.9997 36.2805V37.343C77.9997 38.4038 78.4211 39.4212 79.1712 40.1715L80.828 41.8283C81.578 42.5783 81.9994 43.5958 81.9994 44.6568V47C82.0002 58.0456 73.0458 67 62.0001 67Z"
                fill="#DEDFE4"/>
            <path
                d="M76.9898 34.2094C69.9446 29.0278 60.5862 28.8035 54.0001 29.5129C51.222 29.812 48.9266 30.2743 47.5233 30.6056C46.6221 30.8185 46.0002 31.6231 46.0002 32.5492V37.3433C46.0002 38.4043 45.5788 39.4217 44.8285 40.172L43.1717 41.8288C42.4214 42.5791 42 43.5966 42 44.6576V47.0005C42 57.2266 49.6798 65.6453 59.5833 66.8405C56.1324 63.2467 53.9999 58.3765 53.9999 53.0005V38.3818C53.9999 36.3549 55.507 34.6611 57.5179 34.4089C62.3176 33.8071 71.1085 33.4453 77.9997 37.3438V36.2811C78.0002 35.4736 77.6398 34.6875 76.9898 34.2094Z"
                fill="#C9CBD4"/>
            <path
                d="M30.1528 83.1523C28.8024 84.6018 28 86.5323 28 88.603V123.5C28 124.605 28.8954 125.5 30 125.5H39.9999V96.3133C39.9999 94.1915 39.1571 92.1566 37.6567 90.6565L30.1528 83.1523Z"
                fill="#BABDC8"/>
        </g>
        <path
            d="M1.6743 76.7094C0.691257 76.2638 0.256531 75.1631 0.633132 74.1648C1.51634 71.8247 2.30512 68.6149 2.90162 65.5L6.35468 78.5C4.30971 77.8605 2.67962 77.1651 1.6743 76.7094Z"
            fill="#A9ADBB"/>
    </svg>
</i>

export default Profile