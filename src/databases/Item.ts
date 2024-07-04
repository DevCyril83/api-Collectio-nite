const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Item = sequelize.define("Item",{
    name : {
        type  :  DataTypes.STRING,
        allowNull : false
    }
})

module.exports = Item ; 