import { MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { fetch100Coins } from '../../../functions/fetch100Coins';
import './styles.css'


function SelectCoin({crypto1, crypto2, handleCoinChange}) {

    const [allCoins, setAllCoins] = useState([]);

    const styles = {
        height: '2.5rem',
        color: "var(--white)",
        "& .MuiOutlinedInput-notchedOutline":{
            borderColor: 'var(--white)',
        },
        "& .MuiSvgIcon-root":{
            color:'var(--white)',
        },
        "&:hover":{
            "&& fieldset":{
                borderColor:'#3a80e9',
            },
        },
    }

    useEffect(()=>{
        getCoins()
    },[])

    async function getCoins(){
        const myCoins = await fetch100Coins();
        setAllCoins(myCoins)
    }


    return (
    <div className='select-coin'>
        <p>Crypto 1</p>
        <Select
            sx={styles}
            value={crypto1}
            label="Crypto 1"
            onChange={(event)=>handleCoinChange(event, false)}
            >
            {
                allCoins.filter((coin)=>coin.id!==crypto2).map((coin,i)=>
                    <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
                )
            }
        </Select>
        <p>Crypto 2</p>
        <Select
            sx={styles}
            value={crypto2}
            label="Crypto 2"
            onChange={(event)=>handleCoinChange(event, true)}
            >
            { 
                allCoins.filter((coin)=>coin.id!==crypto1).map((coin,i)=>
                    <MenuItem key={i} value={coin.id}>{coin.name}</MenuItem>
                )
            }
        </Select>
    </div>
    )
}

export default SelectCoin
