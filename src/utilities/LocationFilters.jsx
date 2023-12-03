import React from 'react'
import { LocationListForFilter } from './LocationListForFilter'
import styles from './filters.module.css'


export const  LocationFilters = () => {
  return (
    <div className='overflow-y-auto custom-scrollbar w-full h-[500px] ml-5'>
        <p>Locations</p>
        <div 
        // className={"custom-scrollbar "+styles.episode}
        >
            <LocationListForFilter />
        </div>
    </div>
  )
}
