const { User, UserSchema } = require('./user.model')

function setupModel(sequelize) {
  User.init(UserSchema, User.config())
}

module.exports = setupModel;
