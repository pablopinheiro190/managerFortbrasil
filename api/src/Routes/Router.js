const { Router } = require('express')

const UserController = require('../Controllers/UserController')
const SessionController = require('../Controllers/SessionController')
const StoreController = require('../Controllers/StoreController')


const routes = Router()

routes.post('/user', UserController.create)
routes.get('/user', UserController.index)
routes.delete('/user/:user_id', UserController.delete)

routes.post('/:user_id/store', StoreController.create)
routes.delete('/:user_id/store/:store_id', StoreController.delete)
routes.get('/store', StoreController.indexAll)
routes.get('/store/:user_id', StoreController.indexByUser)

routes.post('/session', SessionController.create)

module.exports = routes