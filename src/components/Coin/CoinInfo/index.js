import React, { useState } from 'react'
import './styles.css'
function CoinInfo({heading,desc}) {
    const [isFullPara, setIsFullPara] = useState(false);

    const shortDesc = desc.slice(0,250) + '<span class="sliced-para"> Read More...</span>'
    const longDesc = desc + '<span class="sliced-para"> Read Less...</span>'

    return (
        <div className='coin-wrapper'>
            <h2 className='coin-info-heading'>{heading}</h2>
            <p className='coin-info-desc'
                onClick={()=>setIsFullPara(!isFullPara)}
                dangerouslySetInnerHTML={{__html: !isFullPara ? shortDesc : longDesc}}/>
        </div>
    )
}

export default CoinInfo
