import React, { useState } from 'react';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import {createTheme, ThemeProvider} from '@mui/material';
import GridComponent from '../Grid';
import './styles.css'
import ListComponent from '../List';

export default function TabsComponent({coins, isWatchlistPage}) {
  const [value, setValue] = useState('grid');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style={
    color:'var(--white)',
    fontSize: '1.2rem',
    fontWeight: 600,
    fontFamily: 'Inter',
    textTransform: 'capitalize'
  }

  const theme = createTheme({
    palette:{
        primary:{
            main: '#3a80e9'
        }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <div>
          <TabList onChange={handleChange} variant="fullWidth" aria-label="lab API tabs example">
            <Tab label="Grid" value="grid" sx={style} />
            <Tab label="List" value="list" sx={style} />
          </TabList>
        </div>
        <TabPanel value="grid">
            <div className='grid-flex'>
              {
                coins.length === 0 && <p className='no-crypto'>No Crypto Currencies Found</p> 
              }
              {
                  coins.map((coin,i)=>{
                      return <GridComponent coin={coin} key={i} isWatchlistPage={isWatchlistPage}/>
                  })
              }
            </div>
        </TabPanel>
        <TabPanel value="list">
            <table className='list-table'>
              {
                coins.length === 0 && <p className='no-crypto'>No Crypto Currencies Found</p> 
              }
                {
                    coins.map((coin,i)=>{
                        return <ListComponent coin={coin} key={i} isWatchlistPage={isWatchlistPage}/>
                    })
                }
            </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}