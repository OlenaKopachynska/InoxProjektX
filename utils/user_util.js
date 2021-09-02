const userNormalizator = (userToNormalize) => {
  const fieldToRemove = [
    'password',
    '__v',
    'createdAt',
    'updatedAt'
  ];
  fieldToRemove.forEach((filed) => {
    delete userToNormalize[filed];
  });

  return userToNormalize;
};

module.exports = {
  userNormalizator
};
