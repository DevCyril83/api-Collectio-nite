const { DataTypes } = require("sequelize");
const sequelize = require(".");

const Collection = sequelize.define("Collection",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    description : {
        type : DataTypes.STRING,
        allowNull : true
    }

})

module.exports = Collection ;