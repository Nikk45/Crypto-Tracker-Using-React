import React, { useEffect, useState } from 'react'
import Header from '../components/Common/Header'
import TabsComponent from '../components/Dashboard/Tabs'
import axios from 'axios';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import Footer from '../components/Common/Footer';
import BackToTop from '../components/Common/BackToTop';
import { fetch100Coins } from '../functions/fetch100Coins';

function DashboardPage() {

    const [coins, setCoins] = useState([]);
    const [paginatedCoins, setPaginatedCoins] = useState([]);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [loader, setLoader] = useState(true);

    const handlePageChange = (event, value) => {
        setPage(value);
        let prevIndex = (value - 1) * 10;
        setPaginatedCoins(coins.slice(prevIndex, prevIndex+10));
    };
        
    function onSearchChange(e){
        console.log(e.target.value);
        setSearch(e.target.value)
    }

    const filteredCoins = coins.filter((coin)=>
        coin.name.toLowerCase().includes(search.toLowerCase()) || 
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    )

    useEffect(()=>{
        getCoins();
    },[])

    const getCoins = async ()=>{
        const myCoins = await fetch100Coins();
        if(myCoins){
            setCoins(myCoins)
            setPaginatedCoins(myCoins.slice(0,10));
            setLoader(false)
        }
    }

    return (
        <>
            <Header />
            <div className='dashboard'>
            {
                loader ? <Loader /> :
                <div>
                    <Search search={search} onSearchChange={onSearchChange} />
                    <TabsComponent coins={search ? filteredCoins : paginatedCoins}/>
                    {
                        !search && <PaginationComponent page={page} handlePageChange={handlePageChange}/>
                    }
                </div>
            }
            </div>
            <Footer />
            <BackToTop />
        </>
    )
}

export default DashboardPage
