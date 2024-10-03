const expres = require("express");
const router = expres.Router();
const whatsappController = require("./WhatsappController");

router
.get("/", whatsappController.VerifyToken)
.post("/",whatsappController.ReceivedMessage)

module.exports = router;