import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Lname } from './Lname';


export const LocationListForFilter = ({ selectedLocationId, setSelectedLocationId }) => {
  let url = "https://rickandmortyapi.com/api/location/"
  let id = 0;
  let locations = [];
  const [lList, setlList] = useState([])
  useEffect(() => {
    const getData = async () => {
      const received_data = await axios.get("https://rickandmortyapi.com/api/location");
      let next = received_data.data.info.next;
      const results = received_data.data.results;
      results.map((elem) => (
        locations[locations.length] = elem.name
      ))
      let rem_pages = received_data.data.info.pages - 1;
      // loop over all the pages
      while (rem_pages > 0) {
        const new_data = await axios.get(next);
        const new_results = new_data.data.results
        new_results.map((elem) => (
          locations[locations.length] = elem.name
        ))
        const new_url = new_data.data.info.next;
        next = new_url;
        rem_pages--;
      }
      setlList(locations);
    }

    getData();
    return () => { }
  }, [])

  return (
    <>
      {
        lList.length ? lList.map((location) => (
          <Lname key={id} id={id++} location={location} url={url} selectedLocationId={selectedLocationId} setSelectedLocationId={setSelectedLocationId} />
        )) : "locations is empty"
      }
    </>
  )
}
