import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Character = () => {
  const { id } = useParams();
  const [characterData, setCharacterData] = useState(null);
  const [allEpsOfChar, setAllEpsOfChar] = useState([]);
  const [currentLocationData, setCurrentLocationData] = useState([]);
  const [originData, setOriginData] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
        console.log("chsr response:::",response)
        setCharacterData(response.data);
        
        const locationResponse = await axios.get(response.data.location.url);
        setCurrentLocationData(locationResponse.data);

        const originResponse = await axios.get(response.data.origin.url);
        setOriginData(originResponse.data);

        const episodeRequests = response.data.episode.map((link) => axios.get(link));
        const episodesData = await Promise.all(episodeRequests);
        console.log("episodesData:::",episodesData)
        const episodes = episodesData.map((data) => data.data.episode);
        // const episodes = episodesData.map((data) => data.data.name);
        setAllEpsOfChar(episodes);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <h1 className="page-loader">Loading...</h1>;
  }
  // if (!characterData || !currentLocationData || !originData) {
  //   return <h1 className="w-[250px] mx-auto p-5 ">Loading...</h1>;
  // }

  return (
    <div className="character-page">
      <img src={characterData.image} alt="loading" />
      <p>
        <span> Character  </span>id: {id}</p>
      <p>
        <span> Name: </span> {characterData.name}</p>
      <p>
        <span> Species: </span> {characterData.species}</p>
      <p>
        <span> Status: </span> {characterData.status}</p>
      <p>
        <span> Type: </span> {characterData.type ? characterData.type : "N.A."}</p>
      <hr />
{/*  */}


      {originData.url ? <p><span>Origin:</span>  {originData.name}</p> : <p>Origin: Unknown</p>}
      {originData.url ? <p><span>Dimension:</span> {originData.dimension}</p> : <p>Origin Location Dimension: Unknown</p>}
      {originData.url && <p><span>Population:</span> {originData.residents.length}</p>}
      <hr />
      {currentLocationData.name && <p><span>Current Location:</span> {currentLocationData.name}</p>}
      {currentLocationData.dimension && <p><span>Dimension:</span> {currentLocationData.dimension}</p>}
      {currentLocationData.url && <p><span>Population:</span> {currentLocationData.residents.length}</p>}
      <hr />
{/*  */}
      <p><span>Episodes</span></p>
      {/*{allEpsOfChar.map((episode, index) => (
        <span key={index}> {episode}, </span>
      ))} */}
       {allEpsOfChar.map((episode, index) => (
            <div key={index}>
              {index+1} - {episode}
            </div>
          ))}

    </div>
  );
};

export default Character;
