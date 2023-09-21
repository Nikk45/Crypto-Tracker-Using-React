import axios from "axios";

export const fetch100Coins =()=>{

    const myCoins = axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en")
        .then((res)=>{
            console.log(res.data);
            return res.data;
        })
        .catch((error)=>{
                console.log(error);
        })

        return myCoins;
}