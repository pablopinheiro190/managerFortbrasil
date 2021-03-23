import React from 'react';

function DeletableCard ({ name, adress, type, phone, deleteStoreHandler }) {
  return (
    <div className="card">
      <button onClick={deleteStoreHandler}>Excluir</button>
      <h2>{name}</h2>
      <div className="card-marker-separation"></div>
      <h1>{adress}</h1>
      <div className="card-info">
        <div className="card-info-detail">
          <p>{type}</p>    
        </div>  
        <div className="card-info-detail">
          <p>{phone}</p>  
        </div>
      </div>        
    </div>  
  )
}

export default DeletableCard;