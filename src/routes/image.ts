import { json, Op } from "sequelize";

const express = require("express");

export const imageRouter = express.Router();

const Item = require("../databases/Item");
const Collection = require("../databases/Collection");
const Image = require("../databases/Image");
const User = require("../databases/User");



imageRouter.get("/:id", async (request,reponse)=>{
    const imageId = request.params.id;

    const image = await Image.findByPk(imageId)
    .catch(error=>{console.log(error)});
   
    reponse.status(200).json(image);
});


imageRouter.post("/", async (request,reponse)=>{
    const imageBody = request.body;

    const image = await Image.create({
        url : imageBody.url,
        description : imageBody.url,
        auteur : imageBody.auteur
    })
    .catch(error=>{console.log(error)})

    reponse.status(200).json(image)
});


imageRouter.post("/user", async (request,reponse)=>{
    const body = request.body;
    console.log(body)
    const user = await User.findByPk(body.userId);
    console.log(user)
    const image = await Image.findByPk(body.imageId);
    console.log(image)
    await image.addUser(user);

    reponse.status(200).json("image has been add to user")
});


imageRouter.get("/:userId", async (request,reponse)=>{
    const userId = request.params.userId;

    const user = await User.findByPk(userId)
    .catch(error =>{console.log(error)});

    const image = await user.getImages
    reponse.status(200).json(image);
});


imageRouter.post("/item", async (request, reponse) => {
    const body = request.body;
    const item = await Item.findByPk(body.itemId);
    const image = await Image.findByPk(body.imageId);
    console.log(image);
    await image.addItem(item);
    reponse.status(200).json("image has been add to item");
});


imageRouter.get("/item/:itemId", async (request, reponse) => {
    const itemId = request.params.itemId;
    const item = await Item.findByPk(itemId)
        .catch(error => { console.log(error); });
    const image = await item.getImages();
    reponse.status(200).json(image);
});


imageRouter.post("/collection", async (request, reponse) => {
    const body = request.body;
    const collection = await Collection.findByPk(body.collectionId);
    const image = await Image.findByPk(body.imageId);
    await image.addCollection(collection);
    reponse.status(200).json("image has been add to collection");
});


imageRouter.get("/collection/:collectionId", async (request, reponse) => {
    const collectionId = request.params.collectionId;
    const collection = await Collection.findByPk(collectionId)
        .catch(error => { console.log(error); });
    const image = await Image.findByPk(collection.ImageId);
    reponse.status(200).json(image);
});

