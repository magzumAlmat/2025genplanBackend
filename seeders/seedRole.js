const Role = require('../app/auth/models/Role');
const User = require('../app/auth/models/User');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Получаем роли из БД
    const roles = await Role.findAll();

    const roleMap = {};
    roles.forEach(role => {
      roleMap[role.name] = role.id;
    });

    // Хешируем пароли


    // Создаем пользователей с нужными ролями
    await User.bulkCreate([
      {
        email: 'admin@example.com',
        password:'1',
        phone: '1111111111',
        name: 'Admin',
        lastname: 'User',
        roleId: roleMap['admin'],
      },
      {
        email: 'client@example.com',
        password:'1',
        phone: '2222222222',
        name: 'Client',
        lastname: 'User',
        roleId: roleMap['client'],
      },
      {
        email: 'customer@example.com',
        password:'1',
        phone: '3333333333',
        name: 'Customer',
        lastname: 'User',
        roleId: roleMap['customer'],
      },
      {
        email: 'inspector@example.com',
        password:'1',
        phone: '4444444444',
        name: 'Inspector',
        lastname: 'User',
        roleId: roleMap['inspector'],
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      email: [
        'admin@example.com',
        'client@example.com',
        'customer@example.com',
        'inspector@example.com',
      ],
    });
  },
};
