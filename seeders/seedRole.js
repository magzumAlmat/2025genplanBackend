const Role=require('../app/auth/models/Role')
const sequelize = require('../config/db')

module.exports={
    up:async(queryInterface,Sequelize)=>{
        await Role.bulkCreate([
            {name:'admin'},
            {name:'client'},//  тот кто держит уже билборды и его  проверяет инспектор
            {name:'customer'},// тот  кто будет закупать  рекламу и отдавать на проверку
            {name:'inspector'},// тот  кто будет закупать  рекламу и отдавать на проверку
            // advertiser//рекламодатель
            // bannerholder//держатель баннера
            // manager
            // gov

        ])
    },
}

down:async(queryInterface,Sequelize)=>{
    await queryInterface.bulkDelete('Roles',null,{})
}