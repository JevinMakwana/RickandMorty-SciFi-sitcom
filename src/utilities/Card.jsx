import React, { useState } from 'react';
import { Link } from "react-router-dom";

const Card = (data) => {
  // console.log("data from Card.jsx =", data);
  data = data.data;
  const char_name = data.name;
  // const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="card">
      <Link to={`/character/${data.id}`} className='link-to-char'>
        <img src={data.image} alt="loading" />
        <p className="card-char-name">
          {char_name}
          {/* {char_name.length > 6 ? data.name.slice(0, 6) + "..." : char_name} */}
        </p>
      </Link>
    </div>
  );
};

export default Card;
