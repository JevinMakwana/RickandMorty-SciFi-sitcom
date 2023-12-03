import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Results from '../components/Results'
import { EpisodeRes } from './EpisodeRes'
import { LocationRes } from './LocationRes'

import Filters from '../utilities/Filters'
import { EpisodeFilters } from '../utilities/EpisodeFilters'
import { LocationFilters } from '../utilities/LocationFilters'

const Home = () => {
    const [dataToDisplay, setDataToDisplay] = useState("")
    const [input, setInput] = useState("")
    const [mainPage, setmainPage] = useState(true)
    const [locationPage, setlocationPage] = useState(false)
    const [episodePage, setepisodePage] = useState(false)
    const [isFilterApplied, setisFilterApplied] = useState(false)
    
    const [allStatus, setAllStatus] = useState([])

    const fetchData = async (value) => {
        // const searched_data = await axios.get(`https://rickandmortyapi.com/api/character/?name=${value}`)
        // // console.log("searched_data===",searched_data.data.results)
        // setDataToDisplay(searched_data.data.results)
        try {
          const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${value}`);
          setDataToDisplay([])
          const results = response.data.results
          setDataToDisplay((prevData) => [...prevData, ...results]);
          let next = response.data.info.next
          let rem_pages = response.data.info.pages -1;
          while(rem_pages>0){
              const new_data = await axios.get(next);
              const new_results = new_data.data.results
              setDataToDisplay((prevData) => [...prevData, ...new_results]);
              const new_url = new_data.data.info.next;
              next = new_url;
              rem_pages--;
          }
          // setDataToDisplay(response.data.results);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
    }
    const handleChage = (value) =>{
        if(value===null){
          setisFilterApplied(false)
          setmainPage(true)
        }else{
          setisFilterApplied(true)
        }
        setInput(value)
        fetchData(value)
    }
    const activateMain = () => {
      setmainPage(true)
      setlocationPage(false)
      setepisodePage(false)
    }
    const activateLocation = () => {
      setmainPage(false)
      setlocationPage(true)
      setepisodePage(false)
    }
    const activateEpisode = () => {
      setmainPage(false)
      setlocationPage(false)
      setepisodePage(true)
    }
    return (
      <> 
        <div className="app-container">
        {/* <div className="w-2/3 mx-auto p-5 app-container"> */}
          {/* <div className="flex p-5 justify-between border shadow"> */}
          <div className="nav-container">
              <img onClick={activateMain} src="https://rickandmortyapi.com/api/character/avatar/19.jpeg" alt="logo" />
            <div className="nav-btns-div">
              <button className='nav-button' onClick={activateLocation} >Location</button>
              <button className='nav-button' onClick={activateEpisode}>Episode</button>
            </div>
            <div className=" h-10 nav-searchbar">
                <input 
                    className='search-bar'
                    placeholder="Search"
                    value={input}
                    onChange={(e)=>handleChage(e.target.value)}
                />
            </div>
          </div>
  
          {/* <div className="flex p-5 border shadow"> */}
          <div className="main-container">

            {/* Filters */}         
            {
              mainPage ? <>
                          <div className="filter-class" ><Filters dataToDisplay={dataToDisplay} setDataToDisplay={setDataToDisplay} setisFilterApplied={setisFilterApplied} setInput={setInput}/></div>
                          <Results dataToDisplay={dataToDisplay} isFilterApplied={isFilterApplied} setDataToDisplay={setDataToDisplay} />
                        </>
              : (locationPage? <>
                                <div className="filter-class" > <LocationFilters /> </div>
                                <LocationRes dataToDisplay={dataToDisplay} />
                                </> 
              : (episodePage? <>
                                <div className="filter-class" ><EpisodeFilters /></div>
                                <EpisodeRes dataToDisplay={dataToDisplay} />
                                </> : "NoPageFound"))
            }
          </div>
            
        </div>
      </>
    );
}

export default Home;