
const sequelize = require("./databases");
const {Op} = require("sequelize");

const express = require("express");
const app = express();

const cors = require("cors");


app.use(cors());
app.use(express.json());

const {collectionRouter} = require("./routes/collection");
const {categoryRouter} = require("./routes/category");
const {itemRouter} = require("./routes/item");
const {userRouter} = require("./routes/user");
const {imageRouter} = require("./routes/image");

app.use("/image", imageRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
app.use("/item", itemRouter);
app.use("/collection", collectionRouter);

app.listen(8000,()=>{
    console.log("Serveur lancé sur localhost:8000")
});




