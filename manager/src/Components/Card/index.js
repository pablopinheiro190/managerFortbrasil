import React from 'react';

function Card ({ name, adress, type, phone }) {

  return (
    <div className="card">
      <h2>{name}</h2>
      <div className="card-marker-separation"></div>
      <h1>{adress}</h1>
      <div className="card-info">
        <div className="card-info-detail">
          <p>{type}</p>   
          <p>{phone}</p>   
        </div>
      </div>        
    </div>  
  )
}

export default Card;