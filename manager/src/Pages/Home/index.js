/* eslint-disable */
import React, {useState, useEffect} from 'react'
import ReactMapGL,{ Marker, Popup } from 'react-map-gl'

import api from '../../Services/Api'

import Navbar from '../../Components/Navbar'
import Card from '../../Components/Card'
import Modal from '../../Components/Modal/index'
import CardMarker from '../../Components/CardMarker'


function Home() {
    const [isModalOpen, setModalOpen] = useState(false)
    
    const [ latitude, setLatitude] = useState(0)
    const [ longitude, setLongitude] = useState(0)

    const [storesData, setStoresData] = useState([])

    const [storeByName, setStoreByName] = useState('')

    const [filteredStoresData, setFilteredStoresData] = useState([])

    const [viewport, setViewport] = useState({
      latitude: 0, 
      longitude: 0,
      width: "100vw",
      height: "50vh",
      zoom: 15
    })

    const [selectedStore, setSelectedStore] = useState(null)

    const [isList, setIsList] = useState(true)

    const mapBoxApiToken = "pk.eyJ1IjoicGFibG9waW5oZWlybyIsImEiOiJja21sNnJpdDUxN3dwMm9tZ2N3dHk4MzNhIn0.Oc5I6zLYV5z0hx00P1KG6g"

    useEffect(() => {
      getUserLocation()
    },[])

    async function getUserLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords
          setLatitude(latitude)
          setLongitude(longitude)
          setViewport({...viewport, latitude, longitude})
      }, (err) => {
          console.log(err)
      }, { timeout: 10000})
    }

    useEffect(() => {
      getNearByStores()
    }, [latitude, longitude])

    async function getNearByStores(){
      try {
        const nearByStores = await api.get(`/store?latitude=${latitude}&longitude=${longitude}`)
        const { data } = nearByStores
        setStoresData(data)
      } catch(err){
        alert('Erro ao carregar os estabelecimentos')
      }
    }

    useEffect(() => {
      getFilteredStores()
    }, [storeByName, storesData])

    function getFilteredStores() {
      const filteredStores = storesData.filter(store =>
        (!storeByName || store.name.toLowerCase().includes(storeByName.toLowerCase()))
      )
      setFilteredStoresData(filteredStores)
    }

    function openModal() {
      setModalOpen(true)
    }

    function closeModal() {
      setModalOpen(false)
    }

    function loadList(e){
      e.preventDefault()
      setIsList(true)
    }

    function loadMap(e){
      e.preventDefault()
      setIsList(false)
    }

    return (
      <>
        <Navbar openModal={openModal}/>
        <section className="input-sec">
          <form>
            <h1>Procurar Estabelecimentos</h1>
            <div className="form-inputs">
              <input 
                type="text" 
                placeholder="Pesquisar estabelecimentos"
                value={storeByName}
                onChange={e => setStoreByName(e.target.value)}
              />
            </div>
            {isList ? <button onClick={loadMap}>Ver mapa</button> : <button onClick={loadList}>Ver lista</button>}
            
          </form>
        </section>
        
        {isList ?
          (
            <section className="managers-sec">
             <div className="cards-container">
             {filteredStoresData.map(store => (
              <Card key={store._id}
                name={store.name}
                adress={store.adress}
                type={store.type}
                phone={store.phone}
              />  
              ))}
             </div>
            </section>
          ):
          (
            <section className="stores-map-section">
              <ReactMapGL 
                {...viewport}
                mapboxApiAccessToken={mapBoxApiToken}
                onViewportChange={viewport => {
                  setViewport(viewport)
                }}
              >
                {filteredStoresData.map(store=>(
                  <Marker
                    key={store._id}
                    latitude={store.location.coordinates[1]}
                    longitude={store.location.coordinates[0]}
                  >
                    <div className="marker">
                      <button 
                        className="market-btn"
                        onClick={e => {
                          e.preventDefault()
                          setSelectedStore(store)
                        }}
                      > 
                      <h1>{store.name}</h1>
                      </button>
                    </div>
                  </Marker>
                ))}        

                {selectedStore ? (
                  <Popup 
                    latitude={selectedStore.location.coordinates[1]}
                    longitude={selectedStore.location.coordinates[0]}
                    onClose={() =>{
                      setSelectedStore(null)
                    } }
                  >
                    <CardMarker
                      name={selectedStore.name}
                      adress={selectedStore.adress}
                      type={selectedStore.type}
                      phone={selectedStore.phone}
                    />  
                  </Popup>
                )
                  : null
                }
              </ReactMapGL>
            </section>
          )           
        }   

        <footer className="rodape"/>

        {isModalOpen ? <Modal closeModal={closeModal} /> : null}
      </>
    );
  }
  
  export default Home;
  
  