const Role = require('../auth/models/Role')
const User = require('../auth/models/User')

const isInspector = async (req, res, next) => {
    console.log('isEmployee started')
    try {
        if(req.user){
            const role = await Role.findByPk(req.user.roleId)
            console.log('ROLE= ',role.name)
            if(role.name === "inspector") next()
            else res.status(403).send({message: "Access denied"})
        }
        else res.status(403).send({message: "Unauthorized"})
    } catch (error) {
        res.status(500).send(error)
    }
}

const isAdmin = async (req, res, next) => {
    console.log('isEmployee started')
    try {
        if(req.user){
            const role = await Role.findByPk(req.user.roleId)
            console.log('ROLE= ',role.name)
            if(role.name === "admin") next()
            else res.status(403).send({message: "Access denied"})
        }
        else res.status(403).send({message: "Unauthorized"})
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports={isInspector,isAdmin}