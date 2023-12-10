import { useEffect, useState } from 'react';
import '../App.css'
import Card from '../utilities/Card';
import axios from 'axios';

const Results = ({ dataToDisplay, isFilterApplied, setDataToDisplay }) => {
  const [isBottom, setisBottom] = useState(false);
  const [pageNo, setpageNo] = useState(2)
  const handleScroll = (event) => {
    if (isFilterApplied === false) {
      const elem = event.target
      setisBottom(Math.floor(elem.scrollHeight - elem.scrollTop) === elem.clientHeight || Math.floor(elem.scrollHeight - elem.scrollTop) + 1 === elem.clientHeight || Math.floor(elem.scrollHeight - elem.scrollTop) - 1 === elem.clientHeight);
    } else {
      return
    }
  }
  // when the page is first time run on browser, only the charcters from first page will render in order to 
  // avoid user waiting for all data to be fetched
  useEffect(() => {
    const get_all_data = async () => {
      try {
        if (!isFilterApplied) {
          const recieved_data = await axios.get('https://rickandmortyapi.com/api/character/?page=1')
          const abstracted_data = recieved_data.data.results
          // let var1=Array.from(new Set(abstracted_data.map((elem)=>(elem.status))))
          setDataToDisplay(abstracted_data)
        }
      } catch (error) {
        console.log("error from useEffect<-AllRes.js :- ", error);
      }
    }
    get_all_data();
  }, [])

  useEffect(() => {
    const get_all_data = async () => {
      try {
        const recieved_data = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNo}`)
        setpageNo(pageNo + 1)
        const abstracted_data = recieved_data.data.results
        setDataToDisplay((prevData) => [...prevData, ...abstracted_data]);
      } catch (error) {
        console.log("error from useEffect<-AllRes.js :- ", error);
      }
    }
    if (isBottom) {
      get_all_data();
      setisBottom(false);
    }

    return () => { }
  }, [isBottom])

  return (
    // onScroll is used for adding new character data to give site infinite scrolling feature    
    <div className="custom-scrollbar content-screen"
      onScroll={handleScroll}
    >
      {/* iterate over all the characters and display them individually */}
      {dataToDisplay.length ? dataToDisplay.map((content) => (
        <>
          <Card key={content.id} data={content} />
          {isBottom ? <p>Loading...</p> : ""}
        </>
      )) : "grid is empty..."}
    </div>
  )
}

export default Results;