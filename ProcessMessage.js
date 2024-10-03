const WhatsappModels = require("./WhatsappModels");
const WhatsappService = require("./WhatsappService");
const { getTable } = require("./dbqueries");

async function Process(textUser, number){
    textUser = textUser.toLowerCase();
    var models = [];

    if(textUser.includes("hello") || textUser.includes("hi") || textUser.includes("hey")){
        
        var modelbutton = WhatsappModels.MessageButtons(number);
        models.push(modelbutton);
    }
    else if (textUser.includes("query") || textUser.includes("data")) {
        try {
            const rows = await getTable(); 
            console.log("Database Results:", rows); // Log results to VS Code terminal

            if (rows.length > 0) {
                const messageText = formatResults(rows); // Format the results
                console.log("Formatted Message Text:", messageText); // Log formatted message
                var model = WhatsappModels.MessageText(messageText, number);
                models.push(model);
            } else {
                var noDataMessage = WhatsappModels.MessageText("No data found in the database.", number);
                models.push(noDataMessage);
            }
        } catch (err) {
            console.error("Detailed SQL error:", err); // Log the detailed error
            var errorMessage = WhatsappModels.MessageText("Failed to fetch data from the database.", number);
            models.push(errorMessage);
        }
    }
    else if(textUser.includes("thankyou") || textUser.includes("thanks")){
        var model = WhatsappModels.MessageText("We are happy that we could help!", number);
        models.push(model);
    }
    else if(textUser.includes("bye") || textUser.includes("goodbye")){
        var model = WhatsappModels.MessageText("We hope that you have a wonderful day ahead!", number);
        models.push(model);
    }
    else if(textUser.includes("✅yes")){
        var modelList = WhatsappModels.MessageList(number);
        models.push(modelList);
    }
    else if(textUser.includes("❌ no")){
        var modelList = WhatsappModels.MessageList(number);
        models.push(modelList);
    }
    else if(textUser.includes("location")){
        var modelLocation = WhatsappModels.MessageLocation(number);
        models.push(modelLocation);
    }
    else if(textUser.includes("experience")){
        var modelList2 = WhatsappModels.MessageList2(number);
        models.push(modelList2);
    }
    else if(textUser.includes("excellent!")){
        var model = WhatsappModels.MessageText("We are glad to hear that! Kudos to our team!", number);
        models.push(model);
    }
    else if(textUser.includes("good!")){
        var model = WhatsappModels.MessageText("We are happy to hear that, but let's make it much more better!", number);
        models.push(model);
    }
    else if(textUser.includes("average..")){
        var model = WhatsappModels.MessageText("We will try to make things better for you!", number);
        models.push(model);
    }
    else if(textUser.includes("website")){
        var model = WhatsappModels.MessageText("Please wait...", number);
        models.push(model);
        var modelurl = WhatsappModels.Messageurl1(number);
        models.push(modelurl);
    }
    else if(textUser.includes("portal")){
        var model = WhatsappModels.MessageText("Please wait...", number);
        models.push(model);
        var modelurl2 = WhatsappModels.Messageurl2(number);
        models.push(modelurl2);
    }
    else{
        var model = WhatsappModels.MessageText("We did not understand what you meant!", number);
        models.push(model);
    }
    
    models.forEach(model => {
        WhatsappService.SendMessageWhatsapp(model);

    });
    
}

function formatResults(rows) {
    let message = "Here are the results:\n\n";
    rows.forEach(row => {
        message += `Id: ${row[0]}, Name: ${row[1]}\n`;
    });
    return message;
}

module.exports = {
    Process
};