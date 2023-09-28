import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Footer from "../components/Common/Footer";
import SelectCoin from "../components/Compare/SelectCoin";
import SelectDays from "../components/Coin/SelectDays";
import { getCoinData } from "../functions/getCoinData";
import { coinObject } from "../functions/coinObject";
import { getCoinPrices } from "../functions/getCoinPrices";
import { settingChartData } from "../functions/settingChartData";
import Loader from "../components/Common/Loader";
import ListComponent from "../components/Dashboard/List";
import CoinInfo from "../components/Coin/CoinInfo";
import LineChart from "../components/Coin/LineChart";
import PriceToggle from "../components/Coin/PriceToggle";

function ComparePage() {
  const [crypto1, setCrypto1] = useState("bitcoin");
  const [crypto2, setCrypto2] = useState("ethereum");
  const [days, setDays] = useState(30);
  const [isLoading, setIsLoading] = useState(true);
  const [crypto1Data, setCrypto1Data] = useState({});
  const [crypto2Data, setCrypto2Data] = useState({});
  const [priceType, setPriceType] = useState("prices");
  const [chartData, setChartData] = useState([]);

  const handleDaysChange = async (event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices1 = await getCoinPrices(crypto1, event.target.value, priceType);
    const prices2 = await getCoinPrices(crypto2, event.target.value, priceType);
    settingChartData(setChartData, prices1, prices2);
    setIsLoading(false);
  };

  const handlePriceType = async (event, newPriceType) => {
    setIsLoading(true);
    setPriceType(newPriceType);
    const prices1 = await getCoinPrices(crypto1, days, newPriceType);
    const prices2 = await getCoinPrices(crypto2, days, newPriceType);
    settingChartData(setChartData, prices1, prices2);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setIsLoading(true);
    const coinData1 = await getCoinData(crypto1);
    if (coinData1) {
      const coinData2 = await getCoinData(crypto2);
      coinObject(setCrypto1Data, coinData1);
      if (coinData2) {
        coinObject(setCrypto2Data, coinData2);
        const prices1 = await getCoinPrices(crypto1, days, priceType);
        const prices2 = await getCoinPrices(crypto2, days, priceType);
        console.log("prices for both coins", prices1, prices2);
        settingChartData(setChartData, prices1, prices2);
        setIsLoading(false);
      }
    }
  }

  const handleCoinChange = async (event, isCrypto2) => {
    setIsLoading(true);
    if (isCrypto2) {
      setCrypto2(event.target.value);
      const coinData = await getCoinData(event.target.value);
      coinObject(setCrypto2Data, coinData);
      const prices1 = await getCoinPrices(crypto1, days, priceType);
      const prices2 = await getCoinPrices(event.target.value, days, priceType);
      settingChartData(setChartData, prices1, prices2);
      if (prices1 && prices2) {
        // settingChartData(setChartData, prices1)
        setIsLoading(false);
      }
    } else {
      setCrypto1(event.target.value);
      const coinData = await getCoinData(event.target.value);
      coinObject(setCrypto1Data, coinData);
      const prices1 = await getCoinPrices(event.target.value, days, priceType);
      const prices2 = await getCoinPrices(crypto2, days, priceType);
      settingChartData(setChartData, prices1, prices2);
      setIsLoading(false);
    }
  };

  return (
    <div className="compare-page">
      <Header />
      <div className="compare-section">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="compare-details">
              <SelectCoin
                crypto1={crypto1}
                crypto2={crypto2}
                handleCoinChange={handleCoinChange}
              />
              <SelectDays
                days={days}
                handleDaysChange={handleDaysChange}
                noPTag={true}
              />
            </div>
            <div className="coin-wrapper">
              <ListComponent coin={crypto1Data} />
            </div>
            <div className="coin-wrapper">
              <ListComponent coin={crypto2Data} />
            </div>
            <div className="coin-wrapper chart-wrapper">
              <PriceToggle
                priceType={priceType}
                handlePriceType={handlePriceType}
              />
              <LineChart
                chartData={chartData}
                priceType={priceType}
                multiAxis={true}
              />
            </div>
            <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc} />
            <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc} />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default ComparePage;
