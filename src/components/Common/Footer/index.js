import React from 'react'
import "./styles.css"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Footer() {
    return (
        <div className='footer-component'>
            <h2>Crypto Tracker.</h2>
            <div className='social-media-icons'>
                <FacebookRoundedIcon />
                <YouTubeIcon />
                <TwitterIcon />
                <InstagramIcon />
            </div>
        </div>
    )
}

export default Footer
