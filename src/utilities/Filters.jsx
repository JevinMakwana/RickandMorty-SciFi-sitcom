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
    const [humanoid, setHumanoid] = useState(false)
    const [alien, setAlien] = useState(false)
    const [poopybutthole, setPoopybutthole] = useState(false)
    const [mythologicalCreture, setMythologicalCreture] = useState(false)
    const [animal, setAnimal] = useState(false)
    const [cronenberg, setCronenberg] = useState(false)
    const [diease, setDiease] = useState(false)

    // Humanoid, 
    // Poopybutthole, 
    // Mythological Creature, 
    // Animal, 
    // Cronenberg, 
    // Disease


    const [planet, setPlanet] = useState(false)
    const [spaceSt, setSpaceSt] = useState(false)
    
    const updateUrl = async (isAlive, isDead, isMale, isFemale, isGenderless, isUnkown, isHuman, isAlien, isPlanet, isSpaceSt, selectedEpId, isHumanoid,  isPoopybutthole, isMythologicalCreature, isAnimal, isCronenberg, isDiease) => {
        setInput("")
        if (isAlive) {url+='status=alive&';}
        if (isDead) {url+='status=dead&';}
        if (isMale) {url+='gender=male&';}
        if (isFemale) {url+='gender=female&';}
        if (isGenderless) {url+='gender=genderles&';}
        if (isUnkown) {url+='gender=unkown&';}
        if (isHuman) {url+='species=human&';} 
        if (isAlien) {url+='species=alien&';}
        if (isHumanoid) {url+='species=humanoid&';}
        if (isPoopybutthole) {url+='species=poopybutthole&';}
        if (isMythologicalCreature) {url+='species=Mythological Creature&';}
        if (isAnimal) {url+='species=animal&';}
        if (isCronenberg) {url+='species=cronenberg&';}
        if (isDiease) {url+='species=diease&';}        
        if (isPlanet) {url+='type=planet&';}
        if (isSpaceSt) {url+='type=Space Station&';}

        if(isAlive || isDead || isMale || isFemale || isGenderless || isUnkown || isHuman || isAlien || isPlanet ||  isSpaceSt || selectedEpId){
            setisFilterApplied(true);
        }else{
            setisFilterApplied(false);
        }
        
        try {
            const response = await axios.get(url);
            const results = response.data.results
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
        updateUrl(alive, isDead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);
    };
    
    const clickedMale =({ currentTarget: input })=>{
        const isMale = input.checked;
        setMale(isMale);
        updateUrl(alive, dead, isMale, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);
    }
    const clickedFemale =({ currentTarget: input })=>{
        const isFemale = input.checked;
        setFemale(isFemale);
        updateUrl(alive, dead, male, isFemale, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);    
    }
    const clickedGenderless =({ currentTarget: input })=>{
        const isGenderless = input.checked;
        setGenderless(isGenderless);
        updateUrl(alive, dead, male, female, isGenderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);  
    }
    const clickedUnknown =({ currentTarget: input })=>{
        const isUnkown = input.checked;
        setUnknown(isUnkown);
        updateUrl(alive, dead, male, female, genderless, isUnkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);
    }
    
    const clickedHuman = ({ currentTarget: input })=>{
        const isHuman = input.checked;
        setHuman(isHuman);
        updateUrl(alive, dead, male, female, genderless, unkown, isHuman, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);
    }
    const clickedAlien = ({ currentTarget: input })=>{
        const isAlien = input.checked;
        setAlien(isAlien);
        updateUrl(alive, dead, male, female, genderless, unkown, human, isAlien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);
    }
    const clickedPlanet = ({ currentTarget: input })=>{
        const isPlanet = input.checked;
        setPlanet(isPlanet);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, isPlanet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);
    }
    const clickedSpaceSt = ({ currentTarget: input })=>{
        const isSpaceSt = input.checked;
        setSpaceSt(isSpaceSt);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, isSpaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, diease);
    }
    const clickedHumanoid = ({currentTarget: input})=>{
        const isHumanoid = input.checked;
        setHumanoid(isHumanoid);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, isHumanoid, poopybutthole, mythologicalCreture, animal, cronenberg, diease);
    }
    const clickedPoopybutthole = ({currentTarget: input})=>{
        const isPoopybutthole = input.checked;
        setPoopybutthole(isPoopybutthole);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  isPoopybutthole, mythologicalCreture, animal, cronenberg, diease);
    }
    const clickedMythologicalCreature = ({currentTarget: input})=>{
        const isMythologicalCreature = input.checked;
        setMythologicalCreture(isMythologicalCreature);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, isMythologicalCreature, animal, cronenberg, diease);
    }
    const clickedAnimal = ({currentTarget: input})=>{
        const isAnimal = input.checked;
        setAnimal(isAnimal);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, isAnimal, cronenberg, diease);
    }
    const clickedCronenberg = ({currentTarget: input})=>{
        const isCronenberg = input.checked;
        setCronenberg(isCronenberg);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, isCronenberg, diease);
    }
    const clickedDiease = ({currentTarget: input})=>{
        const isDiease = input.checked;
        setDiease(isDiease);
        updateUrl(alive, dead, male, female, genderless, unkown, human, alien, planet, spaceSt, selectedEpId, humanoid,  poopybutthole, mythologicalCreture, animal, cronenberg, isDiease);
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
            {/* // Humanoid, 
                // Poopybutthole, 
                // Mythological Creature, 
                // Animal, 
                // Cronenberg, 
                // Disease */}
            <div className="dropdown">
                <div className='filters-elem-div'>
                    <input type="checkbox" name="species-box" onClick={clickedHuman} /> <span>Human</span>
                </div>
                <div className='filters-elem-div'>
                    <input type="checkbox" name="species-box" onClick={clickedAlien} /> <span>Alien</span>
                </div>
                <div className='filters-elem-div'>
                    <input type="checkbox" name="species-box" onClick={clickedHumanoid} /> <span>Humanoid</span>
                </div>
                <div className='filters-elem-div'>
                    <input type="checkbox" name="species-box" onClick={clickedPoopybutthole} /> <span>Poopybutthole</span>
                </div>
                <div className='filters-elem-div'>
                    <input type="checkbox" name="species-box" onClick={clickedMythologicalCreature} /> <span>Mythological Creture</span>
                </div>
                <div className='filters-elem-div'>
                    <input type="checkbox" name="species-box" onClick={clickedAnimal} /> <span>Animal</span>
                </div>
                <div className='filters-elem-div'>
                    <input type="checkbox" name="species-box" onClick={clickedCronenberg} /> <span>Cronenberg</span>
                </div>
                <div className='filters-elem-div'>
                    <input type="checkbox" name="species-box" onClick={clickedDiease} /> <span>Diease</span>
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
            <div className='filters-elem-div'>
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