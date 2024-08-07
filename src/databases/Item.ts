const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Category = require("./Category");

const Item = sequelize.define("Item",{
    name : {
        type  :  DataTypes.STRING,
        allowNull : false
    }
})

Category.hasMany(Item);
Item.belongsTo(Category);

module.exports = Item ; 