const User = require('../Models/User')
const bcrypt = require('bcrypt')



module.exports = {
    async create(req, res) {

        const { email, password } = req.body

        try {
            const userExists = await User.findOne({ email })
            if(!userExists) return res.status(400).send({ message: 'User dos not exists'})

            const validPassword = await bcrypt.compare(password, userExists.password)
            if (!validPassword) return res.status(400).send({ message: 'Password invalid' })

            return res.status(200).send(userExists)

        } catch(err) {
            return res.status(400).send(err)
        }
    }


}