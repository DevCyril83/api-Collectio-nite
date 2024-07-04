const { DataTypes } = require("sequelize");
const sequelize = require(".");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const Collection = require("./Collection")



const User = sequelize.define("User",{
    name : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : DataTypes.STRING,
        async set(value){
            this.setDataValue("password",bcrypt.hashSync(value,saltRounds));
        },
        allowNull : false,
        unique : true
    },
    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    }

});
Collection.belongsToMany(User, {through:"user-collection"});
User.belongsToMany(Collection, {through:"user-collection"});

module.exports = User ;