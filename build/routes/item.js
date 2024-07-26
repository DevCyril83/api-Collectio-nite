"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express = require("express");
exports.itemRouter = express.Router();
const Item = require("../databases/Item");
const Collection = require("../databases/Collection");
const Category = require("../databases/Category");
//Item
//POST collection item
exports.itemRouter.post("/collection/:collectionID", async (request, reponse) => {
    const body = request.body;
    const collection = await Collection.findByPk(request.params.collectionID);
    const item = await Item.create(body);
    await item.addCollection(collection);
    reponse.status(200).json("Item has been add to collection");
});
//GET Item by collection
exports.itemRouter.get("/all/collection/:collectionId", async (request, reponse) => {
    const collectionId = request.params.collectionId;
    const collection = await Collection.findByPk(collectionId)
        .catch(error => { console.log(error); });
    const items = await collection.getItems();
    reponse.status(200).json(items);
});
//GET Items
exports.itemRouter.get("/all", async (request, reponse) => {
    const items = await Item.findAll()
        .catch(error => { console.log(error); });
    reponse.status(200).json(items);
});
//GET Item by id
exports.itemRouter.get("/:id", async (request, reponse) => {
    const itemId = request.params.id;
    const item = await Item.findByPk(itemId)
        .catch(error => { console.log(error); });
    reponse.status(200).json(item);
});
//DELETE Item
exports.itemRouter.delete("/:id", async (request, reponse) => {
    const itemId = request.params.id;
    await Item.destroy({
        where: {
            id: itemId
        }
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json("Item has been deleted");
});
//POST item 
exports.itemRouter.post("/", async (request, reponse) => {
    const itemBody = request.body;
    const item = await Item.create({
        name: itemBody.name
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json(item);
});
//UPDATE Item
exports.itemRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const item = await Item.findByPk(modification.id)
        .catch(error => { console.log(error); });
    item.name = modification.name;
    await item.save()
        .catch(error => { console.log(error); });
    reponse.status(200).json("item has been modified");
});
//Post Item Category
exports.itemRouter.post("/category", async (request, reponse) => {
    const body = request.body;
    const item = await Item.findByPk(body.itemId);
    const category = await Category.findByPk(body.CategoryId);
    item.addCategories(category);
    reponse.status(200).json("category has been had");
});
//GET Item by category
exports.itemRouter.get("/category/:categoryId", async (request, reponse) => {
    const categoryId = request.params.categoryId;
    const category = await Category.findByPk(categoryId);
    const item = await category.getItems();
    reponse.status(200).json(item);
});
