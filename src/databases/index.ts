import { Sequelize, DataTypes } from "sequelize";

import { readFileSync } from "node:fs";

const password = readFileSync("../password.txt",
    {encoding : "utf8"}
)

const login = {
    database : "collectio-nite",
    username : "cyril",
    password : password
}

export const sequelize = new Sequelize(login.database, login.username, login.password,{
    host : "localhost",
    dialect : "mysql",
    logging : false
})

sequelize.authenticate()
.then(()=>{
    console.log("Connexion a la base de donnée réussi")
})
.catch(error=>console.log(error));

module.exports = sequelize;



sequelize.sync({ force: false });