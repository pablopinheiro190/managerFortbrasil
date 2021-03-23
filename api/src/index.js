const express = require('express') //Auxilio no roteamento, requisições HTTP
const mongoose = require ('mongoose')
const cors = require ('cors')
require('dotenv').config()     //Dotent para criar variaveis globais e não ficar exposto no GIT

const router = require('./Routes/Router')

const app = express ()

const dbUri = process.env.DB_URI

//Conectar com Mongo
mongoose.connect(dbUri, {
    useUnifiedTopology: true,  //evitar erros
    useNewUrlParser: true
}, () => console.log('Connected to database'))

app.use(cors())
app.use(express.json())
app.use(router)

app.listen(3333,  ()=> console.log('Server running on port 3333')) 