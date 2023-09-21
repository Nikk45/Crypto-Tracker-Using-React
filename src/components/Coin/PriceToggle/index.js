import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import './styles.css'

export default function PriceToggle({priceType, handlePriceType}) {
  
  return (
  <div className='price-toggle'>
    <ToggleButtonGroup
      value={priceType}
      exclusive
      onChange={handlePriceType}
      sx={{
        "& .Mui-selected":{
            color: "var(--blue) !important",
            backgroundColor: 'rgba(58,128,150,0.2) !important',
        },
        borderColor: "var(--blue)",
        border: "unset !important",
        "& .MuiToggleButtonGroup-grouped":{
            border: "1px solid !important",
            borderColor: "unset",
            color: 'var(--blue)',
        },
        "& .MuiToggleButton-standard": {
            color: "var(--blue)",
        }
      }}
    >
      <ToggleButton value="prices" className='toggle-btn' aria-label="prices">
        price
      </ToggleButton>
      <ToggleButton value="market_caps" className='toggle-btn' aria-label="market_caps">
        mkt cap
      </ToggleButton>
      <ToggleButton value="total_volumes" className='toggle-btn' aria-label="total_volumes">
        total volume
      </ToggleButton>
    </ToggleButtonGroup>
  </div>
  );
}