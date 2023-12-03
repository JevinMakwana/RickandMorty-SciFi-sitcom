import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Epname } from './Epname';

export const EpListForFilter = ({setselectedEpId, setisFilterApplied, dataToDisplay, setDataToDisplay}) => {
    let url = "https://rickandmortyapi.com/api/episode/"
    let id=0;
    let eps = [];
    const [epList, setEpList] = useState([])
    useEffect(() => {
        const getData = async () => {
            const received_data = await axios.get("https://rickandmortyapi.com/api/episode");
            let next = received_data.data.info.next;
            const results = received_data.data.results;
            results.map((elem) => (
                // console.log("```````elem:", elem)
                eps[eps.length]=elem.episode
                // eps[eps.length]=elem.id
            ))
            let rem_pages = received_data.data.info.pages;
            rem_pages--; 
            while (rem_pages>0) {
                const new_data = await axios.get(next); // await here to get the result
                const new_results = new_data.data.results
                new_results.map((elem) =>(
                    // eps[eps.length]=elem.id
                    eps[eps.length]=elem.episode
                ))   
                const new_url = new_data.data.info.next;
                next = new_url;
                rem_pages--;
            }
            setEpList(eps)
            console.log("all eps::", eps);
        };

        getData();
    }, []);

    return (
        <>
            {    
                epList.length ? epList.map((ep)=>(
                    <Epname key={id} id={id++} epstr={ep} url={url} setselectedEpId={setselectedEpId} setisFilterApplied={setisFilterApplied} dataToDisplay={dataToDisplay} setDataToDisplay={setDataToDisplay}/>
                )): "ep is empty"
            }
        </>
    ) 
};