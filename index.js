const express = require("express");
const apiRoute = require("/routes");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/whatsapp", apiRoute);

app.listen(PORT, (res) => {
    console.log("The port is: " +PORT)
});

app.get("/", (req, res) => {
    res.send("<h1>Node.js Application Deployed...</h1>");
});

