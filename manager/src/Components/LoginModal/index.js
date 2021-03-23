import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import api from '../../Services/Api'

import { UserContext } from '../../Context/UserContext';

function LoginModal({setRegisterForm}) {
    const [userData, setUserData] = useContext(UserContext)

    console.log(userData)

    const [ email, setEmail ] = useState('')
    const [ password, setPassword] = useState('')

    const history = useHistory()


    async function loginHandler(e) { //evita ficar carregando ao click do login
        e.preventDefault()
        try {
            const userData = await api.post('session', {
                email,
                password
            })

            const userInfo = userData.data

            setUserData(prevState => ({
                ...prevState, 
                isLogged: true,
                email: userInfo.email,
                name: userInfo.name,
                _id: userInfo._id
            }))
            
            history.push('/dashboard')

        } catch(err){
            alert('Falha no login, tente novamente.')
        }
    }

    return (
        <div className="modal">
            <h1>Login</h1>
            <form>
                <input 
                    type="text" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <button onClick={loginHandler}>Entrar</button>
            </form>
            <div className="link">
                <Link onClick={setRegisterForm}>Criar Conta</Link>
            </div>
        </div>        
    )
}

export default LoginModal;