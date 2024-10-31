const { Model, DataTypes } = require("sequelize");
const { db } = require('../db/connection.js');

class Profile extends Model{};

Profile.init({
    bio: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    birthday: DataTypes.STRING
}, {
    sequelize: db
});


module.exports = Profile;