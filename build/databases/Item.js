"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Category = require("./Category");
const Item = sequelize.define("Item", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
Item.belongsToMany(Category, { through: "Item-category" });
Category.belongsToMany(Item, { through: "Item-category" });
module.exports = Item;
