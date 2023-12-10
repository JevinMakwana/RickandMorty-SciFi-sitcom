import { useEffect, useState } from 'react';
import '../App.css'
import Card from '../utilities/Card';
import axios from 'axios';
// import Character from "../pages/Character";

const Results = ({dataToDisplay, isFilterApplied, setDataToDisplay}) => {
  const [isBottom, setisBottom] = useState(false);
  const [pageNo, setpageNo] = useState(2)
  // console.log("dataToDisplay recieved at res.jsx:", dataToDisplay)
  const handleScroll = (event) => {
    if(isFilterApplied === false){
      const elem = event.target
      console.log("Math.floor(elem.scrollHeight-elem.scrollTop)=",Math.floor(elem.scrollHeight-elem.scrollTop), "elem.clientHeight=",elem.clientHeight);
      setisBottom(Math.floor(elem.scrollHeight-elem.scrollTop) === elem.clientHeight || Math.floor(elem.scrollHeight-elem.scrollTop)+1 === elem.clientHeight || Math.floor(elem.scrollHeight-elem.scrollTop)-1 === elem.clientHeight);
    }else{
      return 
    }
  }

  useEffect(() => {
    const get_all_data = async () => {
      try{
          if(!isFilterApplied){
            const recieved_data = await axios.get('https://rickandmortyapi.com/api/character/?page=1')
            const abstracted_data = recieved_data.data.results
            let var1=Array.from(new Set(
              abstracted_data.map((elem)=>(elem.status))
            ))
            console.log("var1===",var1)
            setDataToDisplay(abstracted_data)
          }
      }catch(error){
        console.log("error from useEffect<-AllRes.js :- ", error);
      }
    }
    get_all_data();
  }, [])

  useEffect(() => {
    console.log("useEffect from caused by scroll...")
    const get_all_data = async () => {
      try {
        const recieved_data = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pageNo}`)
        setpageNo(pageNo+1)
        const abstracted_data = recieved_data.data.results
        setDataToDisplay((prevData) => [...prevData, ...abstracted_data]);
      } catch (error) {
        console.log("error from useEffect<-AllRes.js :- ", error);
      }
    }
    if(isBottom){
      get_all_data();
      setisBottom(false);
    }
  
    return () => {}
  }, [isBottom])
  
  return (
    <div className="custom-scrollbar content-screen" 
      onScroll={handleScroll}
    >
      {dataToDisplay.length ? dataToDisplay.map((content) => (
        <>
          <Card key={content.id} data={content} />
          {isBottom?<p>Loading...</p>:""}
        </>
      )) : "grid is empty..."} 
    </div>
  ) 
}

export default Results;