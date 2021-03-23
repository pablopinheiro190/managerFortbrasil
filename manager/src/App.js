import React from 'react'

import './Styles/style.scss'
import { UserProvider } from './Context/UserContext'
import Routes from './Routes/index'

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
