import React from "react"
import logo from '../../../assets/img/logo/sds-sidebar-logo.svg'
import img from '../../../assets/img/page-login/description-img.svg'

const PageDescription = ({location}) => (
    <div className="page-description">
        <a href="https://sponsoreds.com" className={'logo'}>
            {location === 'registration' ? <>
                <svg width="2000" height="392" viewBox="0 0 2000 392" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_953_26231)">
                        <path
                            d="M412.35 276.823C400.069 276.855 387.842 275.203 376.01 271.913C364.416 268.479 355.083 264.086 348.01 258.733L360.42 231.473C367.783 236.688 375.937 240.686 384.57 243.313C393.614 246.248 403.061 247.756 412.57 247.783C422.95 247.783 430.616 246.293 435.57 243.313C440.543 240.193 443.026 236.099 443.02 231.033C443.051 229.257 442.658 227.5 441.874 225.907C441.089 224.314 439.936 222.931 438.51 221.873C435.206 219.108 431.36 217.064 427.22 215.873C422.713 214.379 416.543 212.739 408.71 210.953C398.697 208.71 388.827 205.875 379.15 202.463C371.493 199.649 364.662 194.963 359.28 188.833C353.873 182.586 351.166 174.253 351.16 163.833C351.063 155.051 353.678 146.453 358.65 139.213C363.61 131.759 371.056 125.876 380.99 121.563C391.07 117.243 403.333 115.083 417.78 115.083C427.746 115.066 437.676 116.269 447.35 118.663C456.268 120.744 464.805 124.209 472.65 128.933L461.37 156.413C446.77 148.226 432.173 144.129 417.58 144.123C407.34 144.123 399.74 145.763 394.78 149.043C389.96 152.323 387.553 156.656 387.56 162.043C387.566 167.429 390.35 171.449 395.91 174.103C401.63 176.636 410.296 179.169 421.91 181.703C431.922 183.943 441.793 186.775 451.47 190.183C459.036 192.938 465.789 197.549 471.11 203.593C476.683 209.693 479.466 217.959 479.46 228.393C479.503 237.178 476.823 245.762 471.79 252.963C466.816 260.296 459.293 266.106 449.22 270.393C439.146 274.679 426.856 276.823 412.35 276.823Z"></path>
                        <path
                            d="M572.759 117.762C586.759 117.762 598.872 120.072 609.099 124.692C619.479 129.312 627.456 135.866 633.029 144.352C638.602 152.839 641.386 162.892 641.379 174.512C641.379 185.972 638.596 196.026 633.029 204.672C627.456 213.152 619.479 219.702 609.099 224.322C598.872 228.776 586.759 231.002 572.759 231.002H540.929V274.112H504.369V117.762H572.759ZM570.759 201.542C581.739 201.542 590.072 199.232 595.759 194.612C601.479 189.852 604.339 183.152 604.339 174.512C604.339 165.719 601.479 159.016 595.759 154.402C590.039 149.629 581.706 147.246 570.759 147.252H540.959V201.542H570.759Z"></path>
                        <path
                            d="M746.199 276.822C729.799 276.822 714.979 273.322 701.739 266.322C689.026 259.675 678.34 249.723 670.809 237.512C663.442 225.172 659.756 211.336 659.749 196.002C659.742 180.669 663.429 166.892 670.809 154.672C678.293 142.375 688.986 132.35 701.739 125.672C714.979 118.672 729.799 115.172 746.199 115.172C762.599 115.172 777.346 118.672 790.439 125.672C803.194 132.347 813.888 142.373 821.369 154.672C828.889 166.892 832.649 180.669 832.649 196.002C832.841 210.637 828.934 225.033 821.369 237.562C813.84 249.775 803.154 259.728 790.439 266.372C777.352 273.339 762.606 276.822 746.199 276.822ZM746.199 245.992C755.023 246.12 763.731 243.968 771.479 239.742C778.895 235.537 784.993 229.349 789.089 221.872C793.382 213.909 795.63 205.004 795.63 195.957C795.63 186.911 793.382 178.006 789.089 170.042C785.029 162.595 778.917 156.469 771.479 152.392C763.731 148.141 755.037 145.912 746.199 145.912C737.362 145.912 728.667 148.141 720.919 152.392C713.461 156.499 707.288 162.595 703.089 170.002C698.936 178.01 696.769 186.897 696.769 195.917C696.769 204.937 698.936 213.825 703.089 221.832C707.317 229.284 713.477 235.457 720.919 239.702C728.663 243.944 737.37 246.114 746.199 246.002V245.992Z"></path>
                        <path
                            d="M1005.04 117.762V274.142H975.04L896.25 179.202V274.142H860.13V117.762H890.38L968.93 212.762V117.762H1005.04Z"></path>
                        <path
                            d="M1094.34 276.822C1082.06 276.854 1069.83 275.202 1058 271.912C1046.41 268.479 1037.08 264.086 1030 258.732L1042.41 231.472C1049.78 236.686 1057.93 240.683 1066.57 243.312C1075.61 246.249 1085.06 247.757 1094.57 247.782C1104.96 247.782 1112.62 246.292 1117.57 243.312C1122.53 240.192 1125.01 236.099 1125.02 231.032C1125.05 229.256 1124.65 227.499 1123.87 225.906C1123.08 224.312 1121.93 222.93 1120.5 221.872C1117.2 219.109 1113.36 217.066 1109.22 215.872C1104.7 214.379 1098.53 212.739 1090.71 210.952C1080.69 208.711 1070.82 205.876 1061.14 202.462C1053.48 199.651 1046.66 194.965 1041.28 188.832C1035.86 182.586 1033.15 174.252 1033.15 163.832C1033.05 155.072 1035.65 146.493 1040.6 139.262C1045.56 131.809 1053.01 125.926 1062.94 121.612C1073.03 117.292 1085.3 115.132 1099.74 115.132C1109.7 115.117 1119.63 116.319 1129.3 118.712C1138.23 120.773 1146.79 124.222 1154.65 128.932L1143.37 156.412C1128.77 148.226 1114.17 144.129 1099.58 144.122C1089.35 144.122 1081.75 145.762 1076.78 149.042C1071.97 152.322 1069.57 156.656 1069.56 162.042C1069.55 167.429 1072.34 171.449 1077.91 174.102C1083.63 176.636 1092.3 179.169 1103.91 181.702C1113.92 183.943 1123.8 186.775 1133.48 190.182C1141.04 192.936 1147.79 197.547 1153.11 203.592C1158.68 209.692 1161.47 217.959 1161.47 228.392C1161.51 237.18 1158.83 245.765 1153.79 252.962C1148.83 260.296 1141.31 266.106 1131.22 270.392C1121.13 274.679 1108.84 276.822 1094.34 276.822Z"></path>
                        <path
                            d="M1477.48 274.142L1447.01 230.582H1413.37V274.142H1376.81V117.762H1445.2C1459.2 117.762 1471.31 120.072 1481.54 124.692C1491.92 129.312 1499.9 135.866 1505.47 144.352C1511.04 152.839 1513.83 162.892 1513.82 174.512C1513.82 186.126 1510.96 196.179 1505.24 204.672C1499.67 213.012 1491.7 219.416 1481.31 223.882L1516.75 274.142H1477.48ZM1476.8 174.512C1476.8 165.719 1473.94 159.016 1468.22 154.402C1462.5 149.629 1454.17 147.246 1443.22 147.252H1413.42V201.762H1443.22C1454.2 201.762 1462.53 199.379 1468.22 194.612C1473.91 189.846 1476.77 183.146 1476.8 174.512Z"></path>
                        <path
                            d="M1665.12 245.102V274.102H1542.79V117.762H1662.19V146.762H1579.13V180.762H1652.48V208.912H1579.13V245.102H1665.12Z"></path>
                        <path
                            d="M1694.22 117.762H1766C1783.15 117.762 1798.28 121.039 1811.37 127.592C1824.61 133.999 1834.84 143.086 1842.06 154.852C1849.44 166.612 1853.13 180.312 1853.12 195.952C1853.11 211.592 1849.43 225.296 1842.06 237.062C1834.84 248.822 1824.61 257.982 1811.37 264.542C1798.27 270.942 1783.15 274.142 1766 274.142H1694.22V117.762ZM1764.22 244.432C1780.02 244.432 1792.59 240.099 1801.92 231.432C1811.4 222.652 1816.14 210.812 1816.14 195.912C1816.14 181.012 1811.4 169.249 1801.92 160.622C1792.59 151.836 1780.02 147.442 1764.22 147.442H1730.82V244.442L1764.22 244.432Z"></path>
                        <path
                            d="M1932.65 276.822C1920.37 276.854 1908.14 275.202 1896.31 271.912C1884.73 268.479 1875.4 264.086 1868.31 258.732L1880.73 231.472C1888.09 236.688 1896.25 240.685 1904.88 243.312C1913.92 246.248 1923.37 247.756 1932.88 247.782C1943.26 247.782 1950.93 246.292 1955.88 243.312C1960.85 240.192 1963.33 236.099 1963.33 231.032C1963.36 229.257 1962.97 227.5 1962.18 225.906C1961.4 224.313 1960.25 222.93 1958.82 221.872C1955.51 219.11 1951.67 217.066 1947.53 215.872C1943.02 214.379 1936.85 212.739 1929.02 210.952C1919 208.709 1909.13 205.874 1899.45 202.462C1891.8 199.646 1884.97 194.961 1879.59 188.832C1874.17 182.586 1871.46 174.252 1871.46 163.832C1871.37 155.072 1873.97 146.495 1878.91 139.262C1883.88 131.809 1891.33 125.926 1901.26 121.612C1911.34 117.292 1923.6 115.132 1938.05 115.132C1948.02 115.117 1957.95 116.319 1967.62 118.712C1976.53 120.796 1985.06 124.261 1992.9 128.982L1981.61 156.462C1967.02 148.276 1952.42 144.179 1937.82 144.172C1927.59 144.172 1919.99 145.812 1915.03 149.092C1910.21 152.372 1907.8 156.706 1907.8 162.092C1907.8 167.479 1910.59 171.499 1916.16 174.152C1921.87 176.686 1930.54 179.219 1942.16 181.752C1952.18 183.992 1962.05 186.823 1971.73 190.232C1979.3 192.987 1986.05 197.598 1991.37 203.642C1996.94 209.742 1999.73 218.009 1999.72 228.442C1999.76 237.228 1997.08 245.812 1992.05 253.012C1987.08 260.346 1979.56 266.156 1969.47 270.442C1959.38 274.729 1947.11 276.856 1932.65 276.822Z"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M1218.41 266.323C1205.7 259.678 1195.01 249.725 1187.49 237.513C1180.12 225.173 1176.44 211.336 1176.43 196.003C1176.42 180.669 1180.11 166.893 1187.49 154.673C1194.97 142.374 1205.66 132.347 1218.41 125.673C1231.65 118.673 1246.47 115.173 1262.88 115.173C1274.09 115.069 1285.24 116.924 1295.82 120.653C1299.7 122.045 1303.48 123.716 1307.12 125.653C1310.54 127.474 1313.83 129.528 1316.96 131.803C1325.45 137.939 1332.62 145.724 1338.04 154.693C1345.57 166.899 1349.34 180.669 1349.33 196.003C1349.52 210.639 1345.61 225.036 1338.04 237.563C1330.51 249.775 1319.83 259.728 1307.12 266.373C1294.03 273.373 1279.29 276.873 1262.88 276.873C1261.98 276.873 1261.09 276.873 1260.21 276.873C1247.96 276.705 1235.86 274.154 1224.58 269.363C1222.49 268.409 1220.43 267.396 1218.41 266.323ZM1305.76 221.873C1301.66 229.346 1295.57 235.534 1288.16 239.743C1283.3 242.428 1278.02 244.271 1272.55 245.193C1269.36 245.736 1266.12 246.004 1262.88 245.993C1254.06 246.121 1245.35 243.968 1237.6 239.743C1230.15 235.503 1223.99 229.328 1219.77 221.873C1215.62 213.865 1213.45 204.978 1213.45 195.958C1213.45 186.938 1215.62 178.05 1219.77 170.043C1223.97 162.608 1230.16 156.495 1237.65 152.393C1245.35 148.026 1254.08 145.789 1262.93 145.913C1269.11 145.859 1275.25 146.919 1281.06 149.043C1282.06 149.393 1282.96 149.783 1283.88 150.193C1285.36 150.852 1286.8 151.586 1288.21 152.393C1293.96 155.542 1298.93 159.931 1302.77 165.243C1303.87 166.78 1304.87 168.383 1305.77 170.043C1310.07 178.004 1312.32 186.91 1312.32 195.958C1312.32 205.005 1310.07 213.911 1305.77 221.873H1305.76Z"></path>
                        <path
                            d="M174.04 367.162L177.52 319.582C177.532 319.424 177.509 319.265 177.451 319.118C177.393 318.97 177.303 318.837 177.186 318.729C177.07 318.621 176.93 318.541 176.779 318.495C176.627 318.449 176.466 318.438 176.31 318.462C162.35 320.356 148.199 320.356 134.24 318.462C134.081 318.44 133.919 318.453 133.766 318.501C133.613 318.549 133.473 318.63 133.356 318.74C133.239 318.849 133.148 318.983 133.09 319.133C133.031 319.282 133.008 319.443 133.02 319.602L135.84 351.112C135.825 351.244 135.837 351.377 135.874 351.504C135.911 351.63 135.972 351.749 136.055 351.852C136.222 352.06 136.464 352.193 136.73 352.222C136.995 352.252 137.261 352.174 137.469 352.007C137.677 351.84 137.811 351.598 137.84 351.332L141.2 340.882C141.213 340.617 141.331 340.368 141.528 340.19C141.725 340.012 141.984 339.919 142.25 339.932C142.515 339.946 142.764 340.064 142.942 340.261C143.12 340.458 143.213 340.717 143.2 340.982L154.15 391.102C154.15 391.368 154.255 391.622 154.443 391.81C154.63 391.997 154.884 392.102 155.15 392.102C155.415 392.102 155.669 391.997 155.857 391.81C156.044 391.622 156.15 391.368 156.15 391.102L164.52 344.772C164.512 344.507 164.609 344.25 164.791 344.057C164.973 343.863 165.224 343.75 165.49 343.742C165.755 343.735 166.012 343.832 166.206 344.014C166.399 344.196 166.512 344.447 166.52 344.712L171.95 367.372C171.978 367.65 172.114 367.904 172.33 368.081C172.546 368.257 172.823 368.34 173.1 368.312C173.377 368.285 173.632 368.148 173.808 367.932C173.984 367.717 174.068 367.44 174.04 367.162Z"></path>
                        <path
                            d="M9.95987 316.053C9.4186 316.644 8.76048 317.116 8.02719 317.44C7.2939 317.763 6.5014 317.931 5.69987 317.933C4.90479 317.94 4.11719 317.779 3.38855 317.461C2.65991 317.142 2.00664 316.674 1.47146 316.086C0.936287 315.498 0.53125 314.803 0.282834 314.048C0.0344186 313.293 -0.0517808 312.494 0.029872 311.703C2.37987 289.363 7.50987 264.703 14.6799 239.343C20.3399 219.343 27.2699 198.833 35.1099 178.663C35.4567 177.776 36.0635 177.015 36.8505 176.48C37.6375 175.945 38.568 175.66 39.5199 175.663C40.6367 175.684 41.7151 176.074 42.587 176.772C43.4588 177.47 44.0752 178.438 44.3399 179.523C47.5299 191.713 54.7299 201.723 63.9899 209.853C73.6199 218.303 85.4799 224.713 97.3899 229.453C107.832 233.578 118.577 236.887 129.53 239.353C145.11 242.733 187.8 245.443 191.86 229.183C195.92 212.923 160.02 207.503 138.33 202.763C136.46 202.353 134.18 201.883 131.59 201.333C108.85 196.463 62.0099 185.003 48.4899 146.503C45.5944 138.014 44.352 129.049 44.8299 120.093C45.9999 91.8027 57.2099 71.0927 74.9899 56.5827C85.0999 48.3627 97.3299 42.1727 111.05 37.7827C124.97 20.0027 138.8 6.73267 151.59 -0.077331C152.724 -0.683094 153.989 -1 155.275 -1C156.56 -1 157.826 -0.683094 158.96 -0.077331C169.87 5.73267 181.54 16.2527 193.37 30.2527C207.006 31.4713 220.494 33.9928 233.65 37.7827C245.106 41.0088 256.173 45.4858 266.65 51.1327C267.72 51.7447 268.526 52.7305 268.914 53.9006C269.301 55.0708 269.243 56.3429 268.75 57.4727L245.42 112.473C244.877 113.742 243.856 114.747 242.577 115.267C241.298 115.788 239.865 115.783 238.59 115.253C223.08 108.873 199.86 100.793 181.73 99.1027C152.59 96.3927 134.3 101.813 132.94 115.363C131.58 128.913 161.4 134.363 187.83 138.363C201.64 140.493 224.17 144.503 245.42 158.643C264.81 171.543 283.15 192.873 292.85 228.883C301.61 257.883 307.85 286.293 310.55 311.683C310.63 312.473 310.543 313.272 310.294 314.026C310.045 314.781 309.639 315.475 309.105 316.062C308.57 316.65 307.917 317.119 307.189 317.437C306.461 317.756 305.674 317.918 304.88 317.913C304.078 317.913 303.285 317.746 302.551 317.422C301.818 317.099 301.16 316.625 300.62 316.033C290.54 305.033 276.62 290.333 261 274.703C252.73 283.813 232.65 300.033 193.4 306.703C180.807 308.778 168.062 309.781 155.3 309.703C96.3599 309.703 66.2999 296.833 42.3599 281.923C29.6499 294.883 18.4599 306.753 9.95987 316.053Z"></path>
                    </g>
                    <defs>
                        <clipPath id="clip0_953_26231">
                            <rect width="2000" height="392"></rect>
                        </clipPath>
                    </defs>
                </svg>
                <span>by ProfitWhales</span>
            </> : <img src={logo} alt=""/>}
        </a>

        <img src={img} alt="" className="description-img"/>

        <p>An all-in-one ad management platform to <br/> scale your Amazon business.</p>

        <div className="social">
            <a
                href="https://www.facebook.com/Sponsoreds-103322802120393"
                target="_blank"
                title="Facebook"
            >
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.00879 10.125L9.50871 6.86742H6.38297V4.75348C6.38297 3.86227 6.81961 2.99355 8.21953 2.99355H9.64055V0.220078C9.64055 0.220078 8.35102 0 7.11809 0C4.54395 0 2.86137 1.56023 2.86137 4.38469V6.86742H0V10.125H2.86137V18H6.38297V10.125H9.00879Z"
                    />
                </svg>
            </a>

            <a
                href="https://www.linkedin.com/company/76485296/admin"
                target="_blank"
                title="LinkedIn"
            >
                <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M4.09414 15.4286H0.895472V5.1277H4.09414V15.4286ZM2.49309 3.72257C1.47025 3.72257 0.640625 2.87536 0.640625 1.8525C0.640625 1.36119 0.835794 0.889997 1.1832 0.542585C1.5306 0.195174 2.00178 0 2.49309 0C2.98439 0 3.45557 0.195174 3.80297 0.542585C4.15038 0.889997 4.34555 1.36119 4.34555 1.8525C4.34555 2.87536 3.51557 3.72257 2.49309 3.72257ZM16.0658 15.4286H12.874V10.4142C12.874 9.21912 12.8499 7.68656 11.2109 7.68656C9.54787 7.68656 9.29302 8.98493 9.29302 10.3281V15.4286H6.09779V5.1277H9.1656V6.53284H9.21037C9.63741 5.72351 10.6806 4.86941 12.2368 4.86941C15.4741 4.86941 16.0692 7.00121 16.0692 9.77015V15.4286H16.0658Z"
                    />
                </svg>
            </a>

            <a
                href="https://www.instagram.com/sponsoreds_com"
                target="_blank"
                title="Instagram"
            >
                <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M9.07335 4.38503C6.51885 4.38503 4.45838 6.4455 4.45838 9C4.45838 11.5545 6.51885 13.615 9.07335 13.615C11.6279 13.615 13.6883 11.5545 13.6883 9C13.6883 6.4455 11.6279 4.38503 9.07335 4.38503ZM9.07335 12.0003C7.42257 12.0003 6.07302 10.6548 6.07302 9C6.07302 7.3452 7.41855 5.99967 9.07335 5.99967C10.7282 5.99967 12.0737 7.3452 12.0737 9C12.0737 10.6548 10.7241 12.0003 9.07335 12.0003ZM14.9535 4.19625C14.9535 4.79471 14.4715 5.27268 13.8771 5.27268C13.2786 5.27268 12.8007 4.79069 12.8007 4.19625C12.8007 3.60181 13.2827 3.11983 13.8771 3.11983C14.4715 3.11983 14.9535 3.60181 14.9535 4.19625ZM18.0101 5.28874C17.9418 3.84681 17.6125 2.56956 16.5561 1.51724C15.5038 0.464911 14.2265 0.135557 12.7846 0.0632601C11.2985 -0.0210867 6.84419 -0.0210867 5.35808 0.0632601C3.92017 0.131541 2.64292 0.460895 1.58657 1.51322C0.530231 2.56555 0.204893 3.8428 0.132596 5.28473C0.0482492 6.77084 0.0482492 11.2251 0.132596 12.7113C0.200877 14.1532 0.530231 15.4304 1.58657 16.4828C2.64292 17.5351 3.91615 17.8644 5.35808 17.9367C6.84419 18.0211 11.2985 18.0211 12.7846 17.9367C14.2265 17.8685 15.5038 17.5391 16.5561 16.4828C17.6084 15.4304 17.9378 14.1532 18.0101 12.7113C18.0944 11.2251 18.0944 6.77485 18.0101 5.28874ZM16.0902 14.3058C15.7769 15.093 15.1704 15.6995 14.3792 16.0168C13.1943 16.4868 10.3827 16.3783 9.07335 16.3783C7.76397 16.3783 4.94839 16.4828 3.76754 16.0168C2.9803 15.7036 2.37381 15.0971 2.05651 14.3058C1.58657 13.1209 1.69502 10.3094 1.69502 9C1.69502 7.69062 1.59059 4.87504 2.05651 3.69419C2.36979 2.90695 2.97629 2.30046 3.76754 1.98315C4.95241 1.51322 7.76397 1.62167 9.07335 1.62167C10.3827 1.62167 13.1983 1.51724 14.3792 1.98315C15.1664 2.29644 15.7729 2.90293 16.0902 3.69419C16.5601 4.87906 16.4517 7.69062 16.4517 9C16.4517 10.3094 16.5601 13.125 16.0902 14.3058Z"
                    />
                </svg>
            </a>
        </div>
    </div>
)

export default PageDescription
