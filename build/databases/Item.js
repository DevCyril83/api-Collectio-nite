"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Item = sequelize.define("Item", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Item;
