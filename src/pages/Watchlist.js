import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import Footer from '../components/Common/Footer'
import Loader from '../components/Common/Loader';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';
import TabsComponent from '../components/Dashboard/Tabs';
import { fetch100Coins } from '../functions/fetch100Coins';

function WatchListPage() {
    const coins = JSON.parse(localStorage.getItem('watchlist'))

    const [isLoading, setIsLoading] = useState(false);
    const [myWatchlist, setMyWatchlist] = useState([]);


    useEffect(()=>{
        getData(); 
    },[])

    const getData = async()=>{
        setIsLoading(true);
        const allCoins = await fetch100Coins();
        if(coins){
            setMyWatchlist(allCoins.filter((coin)=>coins.includes(coin.id)))
        }
        setIsLoading(false);
    }



    return (
        <div>
            <Header/>
            <div className='watch-list'>
                {
                    !coins || isLoading ? (<Loader/>) : (
                    myWatchlist.length === 0 || !coins ? (
                        <div className='no-items-watchlist'>
                        <h1>No Items in the Watchlist</h1>
                        <div className='btn-watchlist'>
                            <Link to='/dashboard'>
                                <Button text='dashboard' onClick={()=>console.log('btn clicked')}/>
                            </Link>
                        </div>
                    </div>) : (
                        <div>
                            <TabsComponent coins={myWatchlist} isWatchlistPage={true}/>
                        </div>
                    ))
                }
            </div>
            <Footer/>
        </div>
    )
}

export default WatchListPage
