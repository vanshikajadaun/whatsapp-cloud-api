const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
const ProcessMessage = require("./ProcessMessage"); 
//const WhatsappService = require("../services/WhatsappService");
//const SampleModels = require("../shared/SampleModels");

//console.log('WhatsappService:', WhatsappService); 
//console.log('SendMessageWhatsapp:', WhatsappService.SendMessageWhatsapp);

const VerifyToken = (req, res) => {  
    try {
        const accessToken = "ECONNECTSOLUTIONSPVTLTD";
        const token = req.query["hub.verify_token"];
        const challenge = req.query["hub.challenge"];

        if (challenge != null && token != null && token == accessToken) {
            res.send(challenge);
        } else {
            res.status(400).send();
        }
    } catch (e) {
        res.status(400).send();
    }
}

const ReceivedMessage = async (req, res) => {
    try {
        const entry = (req.body["entry"])[0];
        const changes = (entry["changes"])[0];
        const value = changes["value"];
        const messageObject = value["messages"];

        // Ensure messageObject exists and has at least one message
        if (!messageObject || messageObject.length === 0) {
            myConsole.log("No messages in messageObject");
            res.send("EVENT_RECEIVED");
            return;
        }

        const messages = messageObject[0];
        const number = messages["from"];

        const text = GetTextUser(messages);

        myConsole.log(text);

        if(text != ""){
            ProcessMessage.Process(text, number);
            
        }

        res.send("EVENT_RECEIVED");
    } catch (e) {
        myConsole.log(e);
        res.send("EVENT_RECEIVED");
    }
}

function GetTextUser(messages) {
    let text = "";
    const typeMessage = messages["type"];

    if (typeMessage === "text") {
        text = (messages["text"])["body"];
    } else if (typeMessage === "interactive") {
        const interactiveObject = messages["interactive"];
        const typeInteractive = interactiveObject["type"];

        if (typeInteractive === "button_reply") {
            text = (interactiveObject["button_reply"])["title"];
        } else if (typeInteractive === "list_reply") {
            text = (interactiveObject["list_reply"])["title"];
        } else {
            myConsole.log("No messages!");
        }
    } else {
        myConsole.log("No messages!");
    }

    return text;
}

module.exports = {
    VerifyToken,
    ReceivedMessage
}
