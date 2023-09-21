import React, { useState } from 'react'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import Tooltip from '@mui/material/Tooltip';
import './styles.css';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import {motion} from 'framer-motion';
import numberConvert from '../../../functions/numberConvert';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { removeFromWatchlist } from '../../../functions/removeFromWatchList';
import { addToWatchlist } from '../../../functions/addToWatchList';
import { hasBeenAdded } from '../../../functions/hasBeenAdded';

function ListComponent({coin, isWatchlistPage}) {
    const [added,setAdded] = useState(hasBeenAdded(coin.id))

    return (
        <Link to={`/coin/${coin.id}`}>
        <motion.tr className='list-row'
            style={{ display: isWatchlistPage && !added && "none" }}
            initial={{opacity:0, x:-90}}
            animate={{opacity:1, x:0}}
            transition={{duration:1.5}}
        >
            <td className='logo-td'>
                <Tooltip title='Logo' placement='bottom-start'>
                    <img src={coin.image} alt='logoImg' className='coin-logo coin-logo-list'/>
                </Tooltip>
            </td>
            <td className='info'>
                <Tooltip title='Symbol' placement='bottom-start'>    
                    <div className='name-col'>
                        <p className='coin-symbol coin-symbol-list'>{coin.symbol}</p>
                        <p className='coin-name coin-name-list'>{coin.name}</p>
                    </div>
                </Tooltip>
            </td>
            <td>
                <Tooltip title='Price Change' placement='bottom-start'>
                    {coin.price_change_percentage_24h > 0 ?
                        <div className='chip-flex chip-flex-list'>
                            <div className='price-chip price-chip-list'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                            <div className='up-chip stock-icon'><TrendingUpRoundedIcon /></div>
                        </div>:
                        <div className='chip-flex chip-flex-list'>
                            <div className='price-chip red red-list price-chip-list'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                            <div className='down-chip stock-icon'><TrendingDownRoundedIcon /></div>
                        </div>
                    }
                </Tooltip>
            </td>
            <td className='info-container'>
                <Tooltip title='Current Price' placement='bottom'>    
                    <h3 className='coin-price td-center-align'
                        style={{
                            color: coin.price_change_percentage_24h > 0 ?
                                    'var(--green)':
                                    'var(--red)',
                            fontWeight: 600,
                            }}
                    >${coin.current_price.toLocaleString()}</h3>
                </Tooltip>
            </td>
            <Tooltip title='Total Volume' placement='bottom'>
                <td className='total-volume td-right-align'>${coin.total_volume.toLocaleString()}</td>
            </Tooltip>
            <Tooltip title='Market Cap' placement='bottom'>
                <td className='market-cap td-right-align market-cap-list'>${coin.market_cap.toLocaleString()}</td>
            </Tooltip>
            
            {/* For Mobile view converting total volume from big number to short  number with symbol(312.3M, 33K, 123.32M) */}
            
            <Tooltip title='Total Volume' placement='bottom'>
                <td className='total-volume td-right-align mobile-total-volume'>${numberConvert(coin.total_volume)}</td>
            </Tooltip>
            <Tooltip title='WatchList' placement='bottom'>
                <td className='td-right-align'><IconButton 
                        onClick={(e)=>{
                            e.preventDefault();
                            if(added){
                                removeFromWatchlist(coin.id)
                                setAdded(false);
                            }
                            else{
                                addToWatchlist(coin.id)
                                setAdded(true)
                            }
                        }}
                    >
                        {
                            added ?
                            <StarRoundedIcon className={`watchlist-icon ${
                                coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                              }`} />:
                            <StarBorderRoundedIcon className={`watchlist-icon ${
                                coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                              }`} />
                        }
                    </IconButton></td>
            </Tooltip>
        </motion.tr>
        </Link>
    )
}

export default ListComponent
