import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import api from '../../Services/Api'

function RegisterModal ({setLoginForm}) {
    const [ name, setName] = useState('')
    const [ email, setEmail] = useState('')
    const [ phone, setPhone] = useState('')
    const [ password, setPassword] = useState('')
    const [ latitude, setLatitude] = useState(0)
    const [ longitude, setLongitude] = useState(0)


    useEffect(() => {
        getUserLocation()
    },[])

    async function registrationHandler(e){
        e.preventDefault()
        try {
            await api.post('/user', {
                name,
                email,
                phone,
                password,
                latitude,
                longitude
            })
            alert('Cadastro realizado com sucesso!')
            setLoginForm()
        } catch(err) {
            alert('Erro ao cadastrar usuário, tente novamente.')
        }
    }

    async function getUserLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords
            setLatitude(latitude)
            setLongitude(longitude)
        }, (err) => {
            console.log(err)
        }, { timeout: 10000})
    }

    return (        
        <div className="modal">
            <h1>Criar Conta</h1>
            <form action="">
                <input 
                    type="text" 
                    placeholder="Nome"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="E-mail"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <input 
                    type="text" 
                    placeholder="Celular"
                    value={phone}
                    onChange={e=>setPhone(e.target.value)}
                />
                <input 
                    type="password" 
                    placeholder="Senha"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <button onClick={registrationHandler}>Cadastrar</button>
            </form>
            <div className="link">
                <Link onClick={setLoginForm}>Já tenho uma conta</Link>
            </div>           
        </div>
    )
}

export default RegisterModal;