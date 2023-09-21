import {useEffect, useState} from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton, Switch } from '@mui/material';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function TemporaryDrawer() {
  const [open, setOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'? true : false
  )


  useEffect(()=>{
    if(localStorage.getItem("theme") === 'dark'){
      setDark();
    }
    else{
      setLight();
    }
  },[])

  const setDark = () => {
    localStorage.setItem("theme", "dark");
    console.log(document.documentElement);
    document.documentElement.setAttribute("data-theme", "dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
  };

  const changeMode = () => {
    setDarkMode(!darkMode);
    toast.success("Theme Changed!");
    const mode = localStorage.getItem("theme");
    if (mode === "dark") {
      setLight();
    } else {
      setDark();
    }
  };


  return (
    <div>
          <IconButton onClick={()=>setOpen(true)}><MenuRoundedIcon className='link'/></IconButton>
          <Drawer
            anchor={'right'}
            open={open}
            onClose={()=>setOpen(false)}
          >
            <div className='drawer-links'>
                <Link to='/'>
                    <p className='link'>Home</p>
                </Link>
                <Link to='/compare'>
                    <p className='link'>Compare</p>
                </Link>
                <Link to='/watchlist'>
                    <p className='link'>WatchList</p>
                </Link>
                <Link to='/dashboard'>
                    <p className='link'>Dashboard</p>
                </Link>
                <Switch checked={darkMode} onClick={()=>{changeMode()}}/>
            </div>
          </Drawer>
    </div>
  )
}