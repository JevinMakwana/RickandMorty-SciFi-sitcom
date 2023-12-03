import React from 'react'
import { EpListForFilter } from './EpListForFilter'
// import styles from './filters.module.css'

export const EpisodeFilters = (dataToDisplay) => {
    console.log("dataToDisplay from ep page:", dataToDisplay)
  return (
    <div className='overflow-y-auto custom-scrollbar w-full h-[500px] ml-5'>
        <p>Episode</p>
            <div 
            // className={"custom-scrollbar "+styles.episode}
            >
                <EpListForFilter />
            </div>
    </div>
    
  )
}
