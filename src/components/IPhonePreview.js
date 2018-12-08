import React from 'react'

import ClipIframeContainer from '../containers/central/ClipIframeContainer'
import PreviewSwitcherContainer from "../containers/central/PreviewSwitcherContainer"

const IPhonePreview = () => {

    const renderIPhone = () => (`
        <svg class="iphone-svg" width="320" height="634" viewBox="0 0 300 598">
                <g>
                <title>iPhone 6</title>
            <g fill-rule="evenodd" fill="none" id="Page-1">
                <g stroke="#7E89A3">
                    <path fill="#fff" id="bezel"
                          d="m299.06943,561.75696c0,20.27826 -16.50864,35.66663 -36.87408,35.66663l-224.69522,0c-20.36548,0 -36.87412,-15.38837 -36.87412,-35.66663l0,-525.31793c0,-20.27824 16.50864,-35.75151 36.87412,-35.75151l224.69522,0c20.36545,0 36.87408,15.47327 36.87408,35.75151l0,525.31793l0,0z"/>
                    <path id="speaker" fill="#f3f4f5"
                          d="m177.3954,58.64567c0,1.45779 -1.00781,2.63321 -2.24983,2.63321l-46.14888,0c-1.24429,0 -2.24982,-1.17772 -2.24982,-2.63321l0,-5.923c0,-1.45779 1.00782,-2.63322 2.24982,-2.63322l46.14888,0c1.242,0 2.24983,1.17772 2.24983,2.63322l0,5.923l0,0z"/>

                    <circle fill="#f3f4f5" r="7" cy="27" cx="150" id="camera"/>

                    <rect id="screen" height="427" width="257" y="82" x="21" fill="transparent"/>
                    <ellipse fill="#f3f4f5" ry="23" rx="23" cy="553" cx="150" id="lock"/>
                </g>
            </g>
            </g>
        </svg>`
    )

    const resizeSimulator = () => {

        var iPhone = document.getElementById("iPhonePreview")
        var iframe = iPhone.querySelector("iframe")

        // Best height for simulator ?
        var simulatorHeight = Math.min(800, 0.80*window.innerHeight)

        var viewBoxWidth = 300
        var viewBoxHeight = 598
        var svgWidth = 270
        var svgHeight = 535

        var sizeFactor = simulatorHeight/svgHeight;

        var iframeWidth =  sizeFactor * svgWidth * 257 / viewBoxWidth
        var iframeHeight =  sizeFactor * svgHeight * 427 / viewBoxHeight

        // Adapt each components to this new height
        var iPhoneSVG = iPhone.querySelector('.iphone-svg')
        iPhoneSVG.style.width = (sizeFactor * svgWidth)+ "px"
        iPhoneSVG.style.height = (sizeFactor * svgHeight) + "px"

        var iPhone6 = iPhone.querySelector('.iPhone6')
        iPhone6.style.top = (sizeFactor * svgHeight * 82 / viewBoxHeight) + "px"
        iPhone6.style.left = Math.ceil(sizeFactor * svgWidth * 21 / viewBoxWidth) + "px"
        iPhone6.style.width = Math.floor(sizeFactor * svgWidth * 257 / viewBoxWidth) + "px"
        iPhone6.style.height = (sizeFactor * svgHeight * 427 / viewBoxHeight) + "px"

        // Adapt "zoom" of iframe
        let refWidth = 300
        let refScale = 0.8
        let realWidth = refWidth / refScale

        iframe.style.width = (iframeWidth / 0.8)+ "px"
        iframe.style.height = (iframeHeight / 0.8) + "px"
    }

    // Resize simulator dynamically to keep
    window.addEventListener("resize", resizeSimulator)

    // We use resizeSimulator at different levels to ensure having no strange transition at preview

    return <div id="iPhonePreview" className={"absolute absolute-center"} onLoad={() => resizeSimulator()} >

            <div dangerouslySetInnerHTML={{__html: renderIPhone()}} onLoad={() => resizeSimulator()} />

            <div className="iPhone6" >

                <div className="container" onLoad={() => resizeSimulator()} >
                    <ClipIframeContainer is_preview={1}/>
                </div>

            </div>

        <PreviewSwitcherContainer />

    </div>
}


export default IPhonePreview
