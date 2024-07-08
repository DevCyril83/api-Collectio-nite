"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize = require("./databases");
const { Op } = require("sequelize");
const express = require("express");
const app = express();
const cors = require("cors");
const Category = require("./databases/Category");
const Collection = require("./databases/Collection");
const Image = require("./databases/Image");
const Item = require("./databases/Item");
const User = require("./databases/User");
app.use(cors());
app.use(express.json());
app.listen(8000, () => {
    console.log("Serveur lancé sur localhost:8000");
});
// Collection
//GET Collections
app.get("/collections", async (request, reponse) => {
    const collections = await Collection.findAll()
        .catch(error => { console.log(error); });
    reponse.status(200).json(collections);
});
//POST Collection
app.post("/collection", async (request, reponse) => {
    const bodyCollection = request.body;
    const collection = await Collection.create({
        name: bodyCollection.name,
        description: bodyCollection.description
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json(collection);
});
//DELETE Collection by id
app.delete("/collection/:id", async (request, reponse) => {
    const collectionId = request.params.id;
    const collection = Collection.findByPk(collectionId)
        .catch(error => { console.log(error); });
    await Collection.destroy(collection)
        .catch(error => { console.log(error); });
    reponse.status(200).json(collection);
});
//Update Collection
app.put("/collection", async (request, reponse) => {
    const modification = request.body;
    const collection = await Collection.findByPk(modification.id)
        .catch(error => { console.log(error); });
    collection.name = modification.name;
    collection.description = modification.description;
    await collection.save()
        .catch(error => { console.log(error); });
    reponse.json({
        message: "product has been modified",
        data: collection
    })
        .catch(error => { console.log(error); });
});
//GET Collection by id
app.get("/collection/:id", async (request, reponse) => {
    const collection = await Collection.findByPk(request.params.id)
        .catch(error => { console.log(error); });
    reponse.status(200).json(collection);
});
//GET Collection by search
app.get("/product/search/:input", async (request, reponse) => {
    const search = request.params.input;
    const collection = await Collection.findAll({
        where: {
            name: { [Op.like]: "%" + search + "%" }
        }
    })
        .catch(error => { console.log(error); });
    reponse.json(collection);
});
//GET collection by category
app.get("/collection/category/:categoryId", async (request, reponse) => {
    const categoryId = request.params.categoryId;
    const collection = await Collection.findAll({
        where: {
            CategoryId: categoryId
        }
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json(collection);
});
//Category
//GET Categories
app.get("categories", async (request, reponse) => {
    const categories = await Category.findAll()
        .catch(error => { console.log(error); });
    reponse.status(200).json(categories);
});
//GET Category by id
app.get("/category/:id", async (request, reponse) => {
    const category = await Category.findByPk(request.params.id)
        .catch(error => { console.log(error); });
    reponse.status(200).json(category);
});
//GET Category by search 
app.get("/category/search/:input", async (request, reponse) => {
    const search = request.params.input;
    const category = await Category.findAll({
        where: {
            name: { [Op.like]: "%" + search + "%" }
        }
    })
        .catch(error => { console.log(error); });
    reponse.json(category);
});
//POST Category
app.post("/category", async (request, reponse) => {
    const bodyCategory = request.body;
    const category = await Category.create({
        name: bodyCategory.name
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json(category);
});
//DELETE Category by id
app.delete("/category/:id", async (request, reponse) => {
    const categoryId = request.params.id;
    Category.destroy({
        where: {
            id: categoryId
        }
    })
        .catch(error => { console.log(error); });
});
//UPDATE Category
app.put("/category", async (request, reponse) => {
    const modification = request.body;
    const category = await Category.findAll({
        where: {
            id: modification.id
        }
    })
        .catch(error => { console.log(error); });
    category.name = modification.name;
    await category.save()
        .catch(error => { console.log(error); });
    reponse.json("Category :" + category + "has been modified");
});
