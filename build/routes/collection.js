"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionRouter = void 0;
const sequelize_1 = require("sequelize");
const express = require("express");
exports.collectionRouter = express.Router();
const Collection = require("../databases/Collection");
//GET
exports.collectionRouter.get("/all", async (request, reponse) => {
    const collections = await Collection.findAll()
        .catch(error => { console.log(error); });
    reponse.status(200).json(collections);
});
exports.collectionRouter.get("/:id", async (request, reponse) => {
    const collection = await Collection.findByPk(request.params.id)
        .catch(error => { console.log(error); });
    reponse.status(200).json(collection);
});
exports.collectionRouter.get("/search/:input", async (request, reponse) => {
    const search = request.params.input;
    console.log(search);
    const collection = await Collection.findAll({
        where: {
            name: { [sequelize_1.Op.like]: "%" + search + "%" }
        }
    })
        .catch(error => { console.log(error); });
    reponse.json(collection);
});
exports.collectionRouter.get("/category/:categoryId", async (request, reponse) => {
    const categoryId = request.params.categoryId;
    const collection = await Collection.findAll({
        where: {
            CategoryId: categoryId
        }
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json(collection);
});
//POST
exports.collectionRouter.post("/", async (request, reponse) => {
    const bodyCollection = request.body;
    console.log(bodyCollection);
    const collection = await Collection.create({
        name: bodyCollection.name,
        description: bodyCollection.description
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json(collection);
});
//Detlete
exports.collectionRouter.delete("/:id", async (request, reponse) => {
    const collectionId = request.params.id;
    const collection = await Collection.findByPk(collectionId)
        .catch(error => { console.log(error); });
    await Collection.destroy({
        where: {
            id: collectionId
        }
    })
        .catch(error => { console.log(error); });
    reponse.status(200).json("collection has been deleted");
});
//PUT
exports.collectionRouter.put("/", async (request, reponse) => {
    const modification = request.body;
    const collection = await Collection.findByPk(modification.id)
        .catch(error => { console.log(error); });
    collection.name = modification.name;
    collection.description = modification.description;
    await collection.save()
        .catch(error => { console.log(error); });
    reponse.status(200).json({
        message: "product has been modified",
        data: collection
    });
});
