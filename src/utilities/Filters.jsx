import axios from 'axios'
import styles  from './filters.module.css'
import React, { useState } from 'react'

import { EpListForFilter } from './EpListForFilter'
import { LocationListForFilter } from './LocationListForFilter'


const Filters = ({ dataToDisplay, setDataToDisplay, setisFilterApplied, setInput }) => {
    var url = "https://rickandmortyapi.com/api/character/?"

    const [selectedEpId, setselectedEpId] = useState(null) //selectedEpId = selected Ep Id
    const [selectedLocationId, setSelectedLocationId] = useState(null)

    const [alive, setAlive] = useState(false)
    const [dead, setDead] = useState(false)

    const [male, setMale] = useState(false)
    const [female, setFemale] = useState(false)
    const [genderless, setGenderless] = useState(false)
    const [unkown, setUnknown] = useState(false)

    const [human, setHuman] = useState(false)
    const [alien, setAlien] = useState(false)

    const [planet, setPlanet] = useState(false)
    const [spaceSt, setSpaceSt] = useState(false)
    
    const updateUrl = async (isAlive, isDead, isMale, isFemale, isGenderless, isUnkown, isHuman, isAlien, isPlanet, isSpaceSt, selectedEpId) => {
        setInput("")
        if (isAlive) {url+='status=alive&';}
        if (isDead) {url+='status=dead&';}
        if (isMale) {url+='gender=male&';}
        if (isFemale) {url+='gender=female&';}
        if (isGenderless) {url+='gender=genderles&';}
        if (isUnkown) {url+='gender=unkown&';}
        if (isHuman) {url+='species=human&';}
        if (isAlien) {url+='species=alien&';}
        if (isPlanet) {url+='type=planet&';}
        if (isSpaceSt) {url+='type=Space%20station&';}

        if(isAlive || isDead || isMale || isFemale || isGenderless || isUnkown || isHuman || isAlien || isPlanet ||  isSpaceSt){
            setisFilterApplied(true);
        }else{
            setisFilterApplied(false);
        }
        // console.log("updateUrl",url)
        
        try {
            const response = await axios.get(url);
            const results = response.data.results
            // console.log("searched_data from filter:", response);
            let next = response.data.info.next
            let rem_pages = response.data.info.pages -1;
            setDataToDisplay([])
            setisFilterApplied(true)
            setDataToDisplay(results)
            while(rem_pages>0){
                const new_data = await axios.get(next);
                const new_results = new_data.data.results
                setDataToDisplay((prevData) => [...prevData, ...new_results]);
                const new_url = new_data.data.info.next;
                next = new_url;
                rem_pages--;
            }
            if(selectedLocationId!==null){
                console.log("Entered into selectedLocationId!!!==null")
                const locationFilterdData = dataToDisplay.filter((item)=>(
                    item.location.name.includes(selectedLocationId)
                ))                
                console.log("locationFilterdData--", locationFilterdData);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    if(selectedEpId !== null){
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId)
    }
    const clickedAlive = ({ currentTarget: input }) => {
        const isAlive = input.checked;
        setAlive(isAlive);
        updateUrl(isAlive, dead, male, female, genderless, unkown, human, alien, planet, spaceSt);
    };

    const clickedDead = ({ currentTarget: input }) => {
        const isDead = input.checked;
        setDead(isDead);
        updateUrl(alive, isDead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId);
    };
    
    const clickedMale =({ currentTarget: input })=>{
        const isMale = input.checked;
        setMale(isMale);
        updateUrl(alive, dead, isMale, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId);
    }
    const clickedFemale =({ currentTarget: input })=>{
        const isFemale = input.checked;
        setFemale(isFemale);
        updateUrl(alive, dead, male, isFemale, genderless, unkown, human, alien, planet, spaceSt, selectedEpId);    
    }
    const clickedGenderless =({ currentTarget: input })=>{
        const isGenderless = input.checked;
        setGenderless(isGenderless);
        updateUrl(alive, dead, male, female, isGenderless, unkown, human, alien, planet, spaceSt, selectedEpId);  
    }
    const clickedUnknown =({ currentTarget: input })=>{
        const isUnkown = input.checked;
        setUnknown(isUnkown);
        updateUrl(alive, dead, male, female, genderless, isUnkown, human, alien, planet, spaceSt, selectedEpId);
    }
    
    const clickedHuman = ({ currentTarget: input })=>{
        const isHuman = input.checked;
        setHuman(isHuman);
        updateUrl(alive, dead, male, female, genderless, unkown, isHuman, alien, planet, spaceSt, selectedEpId);
    }
    const clickedAlien = ({ currentTarget: input })=>{
        const isAlien = input.checked;
        setAlien(isAlien);
        updateUrl(alive, dead, male, female, genderless, unkown, human, isAlien, planet, spaceSt, selectedEpId);
    }
    const clickedPlanet = ({ currentTarget: input })=>{
        const isPlanet = input.checked;
        setPlanet(isPlanet);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, isPlanet, spaceSt, selectedEpId);
    }
    const clickedSpaceSt = ({ currentTarget: input })=>{
        const isSpaceSt = input.checked;
        setSpaceSt(isSpaceSt);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, isSpaceSt, selectedEpId);
    }
    let darkMode = false;
    const chaneTheme = ()=>{

        const isChecked = !darkMode
        darkMode  = isChecked
        const elemBody = document.getElementsByTagName("body")[0].style
        if(isChecked){
            elemBody.backgroundColor = "black";
            elemBody.color = "white";

            const elemBtn = document.querySelector(".nav-searchbar");
            if (elemBtn) {
                elemBtn.style.borderColor = "white";
                elemBtn.style.backgroundColor = "white";
            }

        }else{
            elemBody.backgroundColor = "white";
            elemBody.color = "black";

            const elemBtn = document.querySelector(".nav-searchbar");
            if (elemBtn) {
                elemBtn.style.borderColor = "rgba(64, 0, 255, 0.468)";
            }
        }
    }

    return (
        <div className='filters-container'>
        <div className='switchmode' onClick={chaneTheme}>💡</div>
        <div className='filters-elem'>
            <p style={{marginTop:"0"}}>Status</p>
                <div className="dropdown">
            <div className='filters-elem-div'>
                <input type="checkbox" name="status-box" onChange={clickedAlive} /> <span>Alive</span>
            </div>
            <div className='filters-elem-div'>
                <input type="checkbox" name="status-box" onChange={clickedDead} /> <span>Dead</span> 
            </div>
                </div>
        </div>
        {/* <hr /> */}
        <div className='filters-elem'>
            <p>Gender</p>
            <div className="dropdown">
            <div className='filters-elem-div'>
            <input type="checkbox" name="gender-box" onChange={clickedMale} /> <span>Male</span>
            </div>
            <div className='filters-elem-div'>
            <input type="checkbox" name="gender-box" onChange={clickedFemale} /> <span>Female</span>
            </div>
            <div className='filters-elem-div' style={{
                // width: "140px"
                }}>
            <input type="checkbox" name="gender-box" onChange={clickedGenderless} /> <span>Genderless</span>
            </div>
            <div className='filters-elem-div'>
            <input type="checkbox" name="gender-box" onChange={clickedUnknown} /> <span>Unknown</span>
            </div>
            </div>
        </div>
        {/* <hr /> */}
        <div className='filters-elem'>
            <p>Species</p>
            <div className="dropdown">
            <div className='filters-elem-div'>
            <input type="checkbox" name="species-box" onClick={clickedHuman} /> <span>Human</span>
            </div>
            <div className='filters-elem-div'>
            <input type="checkbox" name="species-box" onClick={clickedAlien} /> <span>Alien</span>
            </div>
            </div>
        </div>
        {/* <hr /> */}
        <div className='filters-elem'>
            <p>Type</p>
            <div className="dropdown">
            <div className='filters-elem-div'>
            <input type="checkbox" name="species-box" onClick={clickedPlanet} /> <span>Planet</span>
            </div>
            <div className='filters-elem-div' style={{
                // width: "150px"
                }}>
            <input type="checkbox" name="species-box" onClick={clickedSpaceSt} /> <span>Space</span>
            </div>
            </div>
        </div>

        <div className='filters-elem'>
            <p>Locations</p>
                {selectedLocationId}
            <div className="dropdown">
            <div className={"custom-scrollbar  "+styles.location}>
                <LocationListForFilter selectedLocationId={selectedLocationId} setSelectedLocationId={setSelectedLocationId} />
            </div>
            </div>
        </div>

        <div className='filters-elem'>
            <p>Episode</p>
                {selectedEpId} 
            <div className="dropdown">
            <div className={"custom-scrollbar scrollable-filter  "+styles.episode}>
                <EpListForFilter setselectedEpId={setselectedEpId} setisFilterApplied={setisFilterApplied} dataToDisplay={dataToDisplay} setDataToDisplay={setDataToDisplay} />
            </div>
            </div>
        </div> 
        </div>
    )
}
export default Filters;