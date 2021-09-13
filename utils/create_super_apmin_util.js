require('mongoose');
const { User } = require('../dataBase');

const superAdmin = {
  name: 'superAdmin',
  email: 'superadmin@gmail.com',
  password: 'adminADMIN!123',
  role: 'admin'
};

User.create(superAdmin, (e) => {
  if (e) {
    User.updateOne(superAdmin, superAdmin);
  }
});
