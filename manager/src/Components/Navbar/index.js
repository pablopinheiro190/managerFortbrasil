import React, { useContext } from 'react';

import { UserContext } from '../../Context/UserContext'

import Logo from '../../Assets/LOGOMANAGER.png'

function Navbar ({openModal}) {
  const [userData, setUserData] = useContext(UserContext)

  async function logoutHandler(e) {
    e.preventDefault()

    setUserData(prevState => ({
      ...prevState, 
      isLogged: false,
      email: '',
      name: '',
      _id: '',
    }))
  }

  return (
    <nav>
      <div className="nav-container">
        <img src={Logo} alt="Logo Manager" />
        {userData.isLogged ? 
          <>
          <div className="logout">
            <p>Olá, {userData.name}</p>
            <button onClick={logoutHandler}>Logout</button>   
          </div>
          </>:
          <button onClick={openModal}>Login</button>}
      </div>
    </nav>
  )
}

export default Navbar;