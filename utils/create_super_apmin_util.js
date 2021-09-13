require('mongoose');
const { User } = require('../dataBase');
const { configs } = require('../configs');
const { userRolesEnum } = require('../entities');
const passwordService = require('../services/password_service');

const superAdmin = {
  name: configs.SUPER_ADMIN_NAME,
  email: configs.SUPER_ADMIN_EMAIL,
  password: configs.SUPER_ADMIN_PASS,
  role: userRolesEnum.SUPER_ADMIN
};

async function CreateAdmin() {
  const hashSuperAdminPassword = await passwordService.hash(superAdmin.password);

  await User.create({ ...superAdmin, password: hashSuperAdminPassword }, (e) => {
    if (e) {
      User.updateOne(superAdmin, { $set: { password: hashSuperAdminPassword } });
    }
  });
}

CreateAdmin();
