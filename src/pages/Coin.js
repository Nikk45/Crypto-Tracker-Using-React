import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import Header from '../components/Common/Header';
import { coinObject } from '../functions/coinObject';
import Loader from '../components/Common/Loader';
import ListComponent from '../components/Dashboard/List';
import Footer from '../components/Common/Footer';
import CoinInfo from '../components/Coin/CoinInfo';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import { convertDate } from '../functions/convertDate';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import PriceToggle from '../components/Coin/PriceToggle';


function CoinPage() {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coinData, setCoinData] = useState();
    const [days, setDays] = useState(30);
    const [chartData, setChartData] = useState({})
    const [priceType, setPriceType] = useState('prices');

    useEffect(()=>{
        if(id){
            getData();
        }
    },[id])

    async function getData(){
        const coinData = await getCoinData(id);
        if(coinData){
            coinObject(setCoinData, coinData)
            const prices = await getCoinPrices(id, days,priceType)
            if(prices){
                console.log("prices fetched");
                settingChartData(setChartData,prices)
                setIsLoading(false);
            }
        }
    }

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        setDays(event.target.value);
        const prices = await getCoinPrices(id, event.target.value, priceType)
        console.log('prices by pricetype', prices);
            if(prices){
                console.log("prices fetched by days");
                settingChartData(setChartData,prices)
                setIsLoading(false);
            }
      };

      const handlePriceType = async (event, newPriceType) => {
        setIsLoading(true);
        setPriceType(newPriceType);
        const prices = await getCoinPrices(id, days, newPriceType)
            if(prices){
                console.log("prices fetched by pricetype");
                settingChartData(setChartData,prices)
                setIsLoading(false);
            }
      };

    return (
        <>
            <Header/>
            <div className='coin-details'>
                {
                    isLoading ? <Loader/> :(
                        <>
                            <div className='coin-wrapper'>
                                <ListComponent coin={coinData}/>
                            </div>
                            <div className='coin-wrapper chart-wrapper'>
                                <SelectDays days={days} handleDaysChange={handleDaysChange}/>
                                <PriceToggle priceType={priceType} handlePriceType={handlePriceType}/>
                                <LineChart chartData={chartData} priceType={priceType}/>
                            </div>
                            <CoinInfo heading={coinData.name} desc={coinData.desc}/>
                        </>
                    )
                }
                
            </div>
            <Footer/>
        </>
    )
}

export default CoinPage
