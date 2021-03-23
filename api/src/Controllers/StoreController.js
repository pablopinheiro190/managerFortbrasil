const Store = require('../Models/Store')
const User = require('../Models/User')

module.exports = {
    async create (req, res){
        const { name, adress, type, phone } = req.body
        const { user_id } = req.params
        const { auth } = req.headers
        
        if(user_id !== auth) return res.status(400).send({message: 'Unauthorized'})

        const randomNumberOrder = Math.floor((Math.random() * 1000) + 1)

        try{
            const userInfo = await User.findById(user_id)

            const { location } = userInfo

            const longitude = location.coordinates[0]
            const latitude = location.coordinates[1]

            const setLocation = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            const createStore = await Store.create({
                name, 
                adress, 
                type,
                phone,
                user: user_id,
                location: setLocation,
                order: randomNumberOrder
            })
            await createStore.populate('user').execPopulate()

            return res.status(201).send(createStore)
        } catch(err) {
            return res.status(400).send(err)
        }
                
    },

    async delete (req, res){
        const { store_id, user_id } = req.params 
        const { auth } = req.headers
        
        if(user_id !== auth) return res.status(400).send({message: 'Unauthorized'})

        try {
            const deletedStore = await Store.findByIdAndDelete(store_id)

            return res.status(200).send({status: "deleted", user: deletedStore})
        } catch(err) {
            return res.status(400).send(err)
        }

    },

    async indexByUser (req, res){
        const { user_id } = req.params
        const { auth } = req.headers
        
        if(user_id !== auth) return res.status(400).send({message: 'Unauthorized'})

        try {
            const allStoresOfAUser = await Store.find({
                user: user_id
            }).populate('user')

            return res.status(200).send(allStoresOfAUser)
        } catch(err){
            return res.status(400).send(err)
        }
    },

    async indexAll (req, res){
        const { longitude, latitude }= req.query

        const maxDistance = 20000
        
        try{
            const allStores = await Store.find({
                location: {
                    $near :{
                        $geometry: {
                            type: 'Point',
                            coordinates: [longitude, latitude]
                        },
                        $maxDistance: maxDistance
                    }
                }
            }).populate('user')               

            return res.status(200).send(allStores)

        } catch(err) {
            return res.status(400).send(err)
        }

    }
}
