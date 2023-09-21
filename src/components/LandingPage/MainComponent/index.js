import React from 'react'
import './styles.css'
import Button from '../../Common/Button'
import iphone from '../../../assets/iphone.png'
import gradient from '../../../assets/gradient.png'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function MainComponent() {
    return (
        <div className='flex-info'>
            <div className='left-component'>
                <motion.h1 
                    className='track-crypto-heading'
                    initial={{opacity:0, y:50}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.5}}
                >Track Crypto</motion.h1>
                <motion.h1 className='real-time-heading'
                    initial={{opacity:0, y:50}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.5, delay: 0.2}}
                >Real Time.</motion.h1>
                <motion.p className='info-text'
                    initial={{opacity:0, y:50}}
                    animate={{opacity:1, y:0}}
                    transition={{duration: 0.5, delay: 0.5}}
                >Track crypto through a public api in real time. Visit the dashboard to do so!</motion.p>
                <motion.div className='btn-flex'
                        initial={{opacity:0, x:50}}
                        animate={{opacity:1, x:0}}
                        transition={{duration: 0.5, delay: 0.8}}
                >
                    <Link to={'/dashboard'}>
                        <Button text={'dashboard'} onClick={()=>console.log('btn clicked')}/>
                    </Link>
                    <Button text={'share'} outlined={true}/>
                </motion.div>
            </div>
            <div className='right-component'>
                <motion.img 
                    src={iphone}
                    className='iphone' 
                    alt='iphone'
                    initial={{y:-10}}
                    animate={{y:10}}
                    transition={{
                        type:'smooth',
                        repeatType:'mirror',
                        duration: 1.5,
                        repeat: Infinity,
                    }}
                    />
                <img src={gradient} className='gradient' alt='gradient'/>
            </div>
        </div>
    )
}

export default MainComponent
