"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Item = require("./Item");
const Collection = sequelize.define("Collection", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
});
Collection.belongsToMany(Item, { through: "item-collection" });
Item.belongsToMany(Collection, { through: "item-collection" });
module.exports = Collection;
