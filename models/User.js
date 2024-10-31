const { Model, DataTypes } = require("sequelize");
const { db } = require('../db/connection.js');

class User extends Model{};

User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING
}, {
    sequelize: db
});



module.exports = User;