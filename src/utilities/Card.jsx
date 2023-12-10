import React from 'react';
import { Link } from "react-router-dom";

const Card = (data) => {
  data = data.data;
  const char_name = data.name;

  return (
    <div className="card">
      {/* each character card will lead to separate character card where all the detail are mentdioned */}
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
