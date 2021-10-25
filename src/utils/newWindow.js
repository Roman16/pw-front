export const popupCenter = ({url, title, w, h, importantWidth = true}) => {
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : window.screen.width
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : window.screen.height

    const systemZoom = width / window.screen.availWidth
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    return window.open(url, title,
        `
      scrollbars=yes,
      width=${importantWidth ? `${w}px` : w / systemZoom}, 
      height=${importantWidth ? `${h}px` : h / systemZoom}, 
      top=${top}, 
      left=${left}
     `)
}