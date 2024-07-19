
const sequelize = require("./databases");
const {Op} = require("sequelize");

const express = require("express");
const app = express();

const cors = require("cors");
const bcrypt = require("bcrypt")

const Category = require("./databases/Category");
const Collection = require("./databases/Collection");
const Image = require("./databases/Image");
const Item = require("./databases/Item");
const User = require("./databases/User");
const ItemCategory = require("./databases/User");


app.use(cors());
app.use(express.json());

app.listen(8000,()=>{
    console.log("Serveur lancé sur localhost:8000")
});


// Collection

//GET Collections
app.get("/collections", async (request, reponse)=>{
    const collections = await Collection.findAll()
    .catch(error=>{console.log(error)});
    reponse.status(200).json(collections);
});

//POST Collection
app.post("/collection", async (request,reponse)=>{
    const bodyCollection = request.body;
    const collection = await Collection.create({
        name : bodyCollection.name,
        description : bodyCollection.description
    })
    .catch(error=>{console.log(error)});

    reponse.status(200).json(collection)
});

//DELETE Collection by id
app.delete("/collection/:id", async (request,reponse)=>{
    const collectionId = request.params.id;

    const collection = await Collection.findByPk(collectionId)
    .catch(error=>{console.log(error)});

    await Collection.destroy({
        where : {
            id : collectionId
        }
    })
    .catch(error=>{console.log(error)});

    reponse.status(200).json("collection has been deleted");
})

//Update Collection
app.put("/collection", async (request,reponse)=>{
    const modification = request.body;

    const collection = await Collection.findByPk(modification.id)
    .catch(error =>{console.log(error)});

    collection.name = modification.name;
    collection.description = modification.description;
    
    await collection.save()
    .catch(error=>{console.log(error)});

    reponse.status(200).json({
        message : "product has been modified",
        data : collection
    })
})

//GET Collection by id
app.get("/collection/:id", async (request,reponse)=>{
    const collection = await Collection.findByPk(request.params.id)
    .catch(error=>{console.log(error)});

    reponse.status(200).json(collection)
});

//GET Collection by search
app.get("/collection/search/:input", async (request,reponse)=>{
    const search = request.params.input;
    console.log(search)
    const collection = await Collection.findAll({
        where : {
            name : {[Op.like]: "%"+search+"%"}
        }
    })
    .catch(error=>{console.log(error)});
    reponse.json(collection);
});

//GET collection by category

app.get("/collection/category/:categoryId" , async (request,reponse)=>{
    const categoryId = request.params.categoryId;
    const collection = await Collection.findAll({
        where : {
            CategoryId : categoryId
        }
    })
    .catch(error=>{console.log(error)});
    reponse.status(200).json(collection);
})

//Category

//GET Categories

app.get("/categories",async (request, reponse)=>{
    const categories = await Category.findAll()
    .catch(error=>{console.log(error)});

    reponse.status(200).json(categories);
});

//GET Category by id

app.get("/category/:id", async (request,reponse)=>{
    const category = await Category.findByPk(request.params.id)
    .catch(error=>{console.log(error)});

    reponse.status(200).json(category)
});

//GET Category by search 

app.get("/category/search/:input", async (request,reponse)=>{
    const search = request.params.input;
    const category = await Category.findAll({
        where : {
            name : {[Op.like] : "%"+search+"%"}
        }
    })
    .catch(error=>{console.log(error)});
    reponse.json(category)
});

//POST Category

app.post("/category", async (request,reponse)=>{
    const bodyCategory = request.body;
    const category = await Category.create({
        name : bodyCategory.name
    })
    .catch(error=>{console.log(error)});
    reponse.status(200).json(category);
});

//DELETE Category by id
app.delete("/category/:id", async (request,reponse)=>{
    const categoryId = request.params.id;
    Category.destroy({
        where : {
            id : categoryId
        }
    })
    .catch(error=>{console.log(error)});
    reponse.status(200).json("Category has been deleted")
});

//UPDATE Category
app.put("/category",async (request,reponse)=>{
    const modification = request.body;

    const category = await Category.findByPk(modification.id)
    .catch(error=>{console.log(error)});
    console.log(category)

    category.name = modification.name
    await category.save()
    .catch(error=>{console.log(error)});

    reponse.status(200).json("Category :" + category + "has been modified");
});

//Item
//POST collection item
app.post("/item/collection", async (request, reponse) => {
    const body = request.body;
    const collection = await Collection.findByPk(body.collectionId);
    const item = await Item.findByPk(body.itemId);
    await item.addCollection(collection);
    reponse.status(200).json("Item has been add to collection");
});
//GET Item by collection
app.get("/items/collection/:collectionId", async (request, reponse) => {
    const collectionId = request.params.collectionId;
    const collection = await Collection.findByPk(collectionId)
        .catch(error => { console.log(error); });

    const items = await collection.getItems();
    reponse.status(200).json(items);
});

//GET Items
app.get("/items", async (request,reponse)=>{
    const items = await Item.findAll()

    .catch(error=>{console.log(error)});

    reponse.status(200).json(items)
});

//GET Item by id
app.get("/item/:id",async (request,reponse)=>{
    const itemId = request.params.id;

    const item = await Item.findByPk(itemId)
    .catch(error=>{console.log(error)});

    reponse.status(200).json(item)
});

//DELETE Item
app.delete("/item/:id", async (request, reponse)=>{
    const itemId = request.params.id;

    await Item.destroy({
        where : {
            id : itemId
        }
    })
    .catch(error=>{console.log(error)});
    reponse.status(200).json("Item has been deleted")
});

//POST item 
app.post("/item",async (request,reponse)=>{
    const itemBody = request.body;

    const item = await Item.create({
        name : itemBody.name
    })
    .catch(error=>{console.log(error)})
    reponse.status(200).json(item)
});

//UPDATE Item
app.put("/item",async (request,reponse)=>{
    const modification = request.body;

    const item = await Item.findByPk(modification.id)
    .catch(error=>{console.log(error)});
    
    item.name = modification.name;

    await item.save()
    .catch(error=>{console.log(error)});

    reponse.status(200).json("item has been modified")

});

//Post Item Category
app.post("/item/category", async (request,reponse)=>{
    const body = request.body;
   

    const item = await Item.findByPk(body.itemId);

    const category = await Category.findByPk(body.CategoryId)
 
    item.addCategories(category);

    reponse.status(200).json("category has been had");
});

//GET Item by category
app.get("/item/category/:categoryId", async (request , reponse)=>{
    const categoryId = request.params.categoryId;

    const category = await Category.findByPk(categoryId);

    const item = await category.getItems();

    reponse.status(200).json(item)
});

//User

//GET USERS
app.get("/users",async (request,reponse)=>{

    const users = await User.findAll()
    .catch(error=>{console.log(error)});

    reponse.status(200).json(users);
});

//GET user by id

app.get("/user/:id",async (request,reponse)=>{
    const user = await User.findByPk(request.params.id)
    .catch(error=>{console.log(error)});
    reponse.status(200).json(user);
});

//Post User SignUp
app.post("/user/signup", async (request,reponse)=>{
    const signUpForm = request.body;
    const user = await User.create({
        name : signUpForm.name,
        email : signUpForm.email,
        password : signUpForm.password
    })
    .catch(error=>{console.log(error)});
    reponse.status(200).json(user);
});
//Post User SignIn
app.post("/user/signin", async (request,reponse)=>{
    const signInForm = request.body;

    const user = await User.findOne({
        where : {
            email : signInForm.email
        }
    }).catch(error=>{console.log(error)});

    const isPasswordValid = await bcrypt.compare(signInForm.password, user.password)
    .catch(error=>{console.log(error)})

    if(isPasswordValid){
        return reponse.status(200).json("connected");
    }else{
        reponse.status(401).json("Identifiant invalid")
    }
});

//UPDATE User

app.put("/user", async (request,reponse)=>{
    const modification = request.body;

    const user = await User.findByPk(modification.id)
    .catch(error=>{console.log(error)});

    user.email = modification.email;
    user.name = modification.name;
    user.password = modification.password;
    await user.save()
    .catch(error=>{console.log(error)})
    
    reponse.status(200).json("User has been modified")
});

//Image

//GET Image by id
app.get("/image/:id", async (request,reponse)=>{
    const imageId = request.params.id;

    const image = await Image.findByPk(imageId)
    .catch(error=>{console.log(error)});
   
    reponse.status(200).json(image);
});

//POST Image 
app.post("/image", async (request,reponse)=>{
    const imageBody = request.body;

    const image = await Image.create({
        url : imageBody.url,
        description : imageBody.url,
        auteur : imageBody.auteur
    })
    .catch(error=>{console.log(error)})

    reponse.status(200).json(image)
});

//POST USER image
app.post("/user/image", async (request,reponse)=>{
    const body = request.body;
    console.log(body)
    const user = await User.findByPk(body.userId);
    console.log(user)
    const image = await Image.findByPk(body.imageId);
    console.log(image)
    await image.addUser(user);

    reponse.status(200).json("image has been add to user")
});
//GET User image
app.get("/image/:userId", async (request,reponse)=>{
    const userId = request.params.userId;

    const user = await User.findByPk(userId)
    .catch(error =>{console.log(error)});

    const image = await user.getImages
    reponse.status(200).json(image);
});
//POST Item Image
app.post("/item/image", async (request, reponse) => {
    const body = request.body;
    const item = await Item.findByPk(body.itemId);
    const image = await Image.findByPk(body.imageId);
    console.log(image);
    await image.addItem(item);
    reponse.status(200).json("image has been add to item");
});
//GET Item Image
app.get("/image/item/:itemId", async (request, reponse) => {
    const itemId = request.params.itemId;
    const item = await Item.findByPk(itemId)
        .catch(error => { console.log(error); });
    const image = await item.getImages();
    reponse.status(200).json(image);
});
//POST collection Image
app.post("/collection/image", async (request, reponse) => {
    const body = request.body;
    const collection = await Collection.findByPk(body.collectionId);
    const image = await Image.findByPk(body.imageId);
    await image.addCollection(collection);
    reponse.status(200).json("image has been add to collection");
});
//GET collection Image
app.get("/image/collection/:collectionId", async (request, reponse) => {
    const collectionId = request.params.collectionId;
    const collection = await Collection.findByPk(collectionId)
        .catch(error => { console.log(error); });
    const image = await Image.findByPk(collection.ImageId);
    reponse.status(200).json(image);
});

