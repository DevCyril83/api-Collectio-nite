const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Category = require("./Category");

const Item = sequelize.define("Item",{
    name : {
        type  :  DataTypes.STRING,
        allowNull : false
    }
})

Item.belongsToMany(Category, {through : "collection-category"});
Category.belongsToMany(Item, {through : "collection-category"});

module.exports = Item ; 