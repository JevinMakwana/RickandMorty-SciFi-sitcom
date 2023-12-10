import React from 'react'

export const Lname = ({ id, location, url, selectedLocationId, setSelectedLocationId }) => {
  const clickedLocation = ({ currentTarget: input }) => {
    const ischecked = input.checked;
    if (ischecked) {
      console.log("selected location id = ", id)
      url += `${id},`
      setSelectedLocationId(location)
    } else {
      console.log("unchecked", id);
      setSelectedLocationId(null)
    }
    return;
  }
  return (
    <div className='filters-elem-div'>
      <input type="checkbox" name="species-box" onClick={clickedLocation} />
      {location} <br />
    </div>
  )
}
