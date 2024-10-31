const { Model, DataTypes } = require("sequelize");
const { db } = require('../db/connection.js');

class Like extends Model{};

Like.init({
    reactionType: DataTypes.STRING,
    createdAt: DataTypes.STRING,
}, {
    sequelize: db
});

module.exports = Like;