import React, { useState } from 'react'
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import './styles.css'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import { hasBeenAdded } from '../../../functions/hasBeenAdded';
import { removeFromWatchlist } from '../../../functions/removeFromWatchList';
import { addToWatchlist } from '../../../functions/addToWatchList';


function GridComponent({coin ,isWatchlistPage}) {
    const [added, setAdded] = useState(hasBeenAdded(coin.id))

    return (
        <>
            <Link to={`/coin/${coin.id}`}>
            <div className={`grid-container ${coin.price_change_percentage_24h < 0 && 'grid-container-red'}`}
                style={{display: isWatchlistPage && !added && 'none'}}
            >
                <div className='coin-info'>
                    <div className='info-flex'>
                        <img src={coin.image} alt='logoImg' className='coin-logo'/>
                        <div className='name-col'>
                            <p className='coin-symbol'>{coin.symbol}</p>
                            <p className='coin-name'>{coin.name}</p>
                        </div>
                    </div>
                    <IconButton 
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
                    </IconButton>
                </div>
                {coin.price_change_percentage_24h > 0 ?
                    <div className='chip-flex'>
                        <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='up-chip'><TrendingUpRoundedIcon /></div>
                    </div>:
                    <div className='chip-flex '>
                        <div className='price-chip red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='down-chip'><TrendingDownRoundedIcon /></div>
                    </div>
                }
                <div className='info-container'>
                    <h3 className='coin-price'
                        style={{
                            color: coin.price_change_percentage_24h > 0 ?
                                    'var(--green)':
                                    'var(--red)',
                            fontWeight: 600,
                            }}
                    >${coin.current_price.toLocaleString()}</h3>
                </div>
                <p className='total-volume'><span>total volume :</span> ${coin.total_volume.toLocaleString()}</p>
                <p className='market-cap'><span>Market cap :</span> ${coin.market_cap.toLocaleString()}</p>
            </div>
            </Link>
        </>
    )
}

export default GridComponent
