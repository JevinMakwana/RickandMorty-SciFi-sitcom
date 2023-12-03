import React from 'react'


export const Epname = ({ id, epstr, url, setselectedEpId, setisFilterApplied, dataToDisplay, setDataToDisplay}) => {
  const  clickedEp = ({ currentTarget: input }) => {
    const ischecked = input.checked;    
    if(ischecked){
      console.log("before:", url);
      url+=`${id},`
      const r = dataToDisplay.filter((i)=>{
        return i.episode.includes(`https://rickandmortyapi.com/api/episode/${id}`);
      })
      console.log("new ep-vise data:::", r);
      setDataToDisplay(r);

      setisFilterApplied(true)
      console.log("after:", url);
      setselectedEpId(id)
    }else{
      setselectedEpId(null)
      setisFilterApplied(false)
      console.log("unchecked", id);
    }
  }
  return (
    <div className='filters-elem-div'>
      <input type="checkbox" name="species-box" onClick={clickedEp}  />
      {epstr} <br />
    </div>
  )
}

// export default Epname;