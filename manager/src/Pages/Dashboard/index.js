/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react'
import api from '../../Services/Api'

import { UserContext } from '../../Context/UserContext'

import Navbar from '../../Components/Navbar/index'
import DeletableCard from '../../Components/DeletableCard/index'

function Dashboard() {
  const [userData, setUserData] = useContext(UserContext)

  const [storeName, setStoreName] = useState('')
  const [storeAdress, setStoreAdress] = useState('')
  const [storeType, setStoreType] = useState('')
  const [storePhone, setStorePhone] = useState('')

  const [storesData, setStoresData] = useState([])

  useEffect(() => {
    getUsersStores()
  },[storesData])

  async function newStoreHandler(e){
    e.preventDefault()
    try{
      await api.post(`${userData._id}/store`, {
        name: storeName,
        adress: storeAdress,
        type: storeType,
        phone: storePhone
      }, {
        headers: {
          auth: userData._id
        }
      })
      alert('Estabelecimento cadastrado com sucesso!')

      setStoreName('')
      setStoreAdress('')
      setStoreType('')
      setStorePhone('')

    } catch(err){
      alert('Falha ao adicionar o estabelecimento, tente novamente.')
    }
  }

  async function getUsersStores(){
    try {
      const userStoresData = await api.get(`/store/${userData._id}` ,{
        headers: {
          auth: userData._id
        }
      })
      const { data } = userStoresData
      setStoresData(data)
    } catch(err){
      alert('Erro ao carregar estabelecimentos')
    } 
  }

  async function deleteStoreHandler(store_id) {
    try {
      await api.delete(`/${userData._id}/store/${store_id}`, {
        headers: {
          auth: userData._id
        }
      })
      alert('Estabelecimento removido com sucesso!')
    } catch(err){
      alert('Erro ao deletar o estabelecimento')
    }

  }
  
  return (
    <>
    <Navbar />
      <section className="input-sec">
        <form>
          <h1>Cadastrar Estabelecimento</h1>
          <div className="store-inputs">
            <input 
              type="text" 
              placeholder="Nome"
              value={storeName}
              onChange={e=>setStoreName(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Endereço"
              value={storeAdress}
              onChange={e=>setStoreAdress(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Tipo de serviço"
              value={storeType}
              onChange={e=>setStoreType(e.target.value)}
            />
            <input 
              type="text" 
              placeholder="Fone"
              value={storePhone}
              onChange={e=>setStorePhone(e.target.value)}
            />
          </div>
          <button className="btn-stores-inputs" onClick={newStoreHandler}>Cadastrar</button>
        </form>
      </section>

      <section className="managers-sec">
        <div className="cards-container">
          {storesData.map(store => (            
            <DeletableCard key={store._id}
              name={store.name}
              adress={store.adress}
              type={store.type}
              phone={store.phone}
              deleteStoreHandler={()=>{deleteStoreHandler(store._id)}}
            /> 
          ))}                     
        </div>
      </section>
      <footer className="rodape"/>
    </>
    );
  }
  
  export default Dashboard;
  