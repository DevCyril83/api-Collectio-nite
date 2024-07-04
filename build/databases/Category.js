"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { DataTypes } = require("sequelize");
const sequelize = require(".");
const Category = sequelize.define("Category", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
module.exports = Category;
