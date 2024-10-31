const { Model, DataTypes } = require("sequelize");
const { db } = require('../db/connection.js');

class Post extends Model{};

Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    createdAt: DataTypes.STRING
}, {
    sequelize: db
});


module.exports = Post;