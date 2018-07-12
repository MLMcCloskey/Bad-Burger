const express = require("express");
const parse = require("body-parser");
var PORT = process.env.PORT || 8080;
const app = express();
const handlebars = require("express-handlebars");
const routes = require("./controllers/burgers_controller.js");

app.use(express.static("public"));

app.use(parse.urlencoded({ extended: true}));

app.use(parse.json());

app.engine("handlebars", handlebars({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(routes);

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`);
});