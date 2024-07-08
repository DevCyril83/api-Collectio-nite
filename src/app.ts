const sequelize = require("./databases");
const {Op} = require("sequelize");

const express = require("express");
const app = express();

const cors = require("cors");

const Category = require("./databases/Category");
const Collection = require("./databases/Collection");
const Image = require("./databases/Image");
const Item = require("./databases/Item");
const User = require("./databases/User")


app.use(cors());
app.use(express.json());

app.listen(8000,()=>{
    console.log("Serveur lancé sur localhost:8000")
})