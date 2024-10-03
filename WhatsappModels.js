function MessageText(textResponse, number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "text",
        "text": {
            "body": textResponse
        }
    });
    return data;
}

function MessageButtons(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
        "header":{
            "type" : "text",
            "text": "Hello there! \nGreetings from E-Connect Solutions Pvt. Ltd."
        },
        "type": "button",
        "body": {
            "text": "Are you currently working with us?"
        },
        "action": {
            "buttons": [
                {
                    "type": "reply",
                    "reply": {
                        "id": "001",
                        "title": "✅Yes"
                    }
                },
                {
                    "type": "reply",
                    "reply": {
                        "id": "002",
                        "title": "❌ No"
                    }
                }
            ]
        }
    }
    });

    return data;
}

function MessageList2(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
        "type": "list",
        "header": {
            "type": "text",
            "text": "Hello there! This is a feedback message for our company."
        },
        "body": {
            "text": "How was your experience at E-Connect Solutions Pvt. Ltd. "
        },
        "footer": {
            "text": "E-Connect Solutions Pvt. Ltd."
        },
        "action": {
            "button": "Please click here!",
            "sections": [
                {
                    "title": "Rate us!",
                    "rows": [
                        {
                            "id": "001",
                            "title": "Excellent!",
                            "description": "I had the best experience here!"
                        },
                        {
                            "id": "002",
                            "title": "Good!",
                            "description": "Could have been better!"
                        },
                        {
                            "id": "003",
                            "title": "Average..",
                            "description": "I had high expectations"
                        }
                    ]
                }
            ]
        }
    }
    });

    return data;
}

function MessageList(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "header": {
                "type": "text",
                "text": "How can we help you today?"
            },
            "body": {
                "text": "Click the button below to select your requirement"
            },
            "footer": {
                "text": "E-Connect Solutions Pvt. Ltd."
            },
            "action": {
                "button": "Please click here!",
                "sections": [
                    {
                        "title": "Help",
                        "rows": [
                            {
                                "id": "001",
                                "title": "E-Connect Website",
                                "description": "Get an URL to visit E-Connect webiste"
                            },
                            {
                                "id": "002",
                                "title": "Visit KSBCL portal",
                                "description": "Get an URL to visit KSBCL portal"
                            },
                            {
                                "id": "003",
                                "title": "Location?",
                                "description": "Know our office location!"
                            },
                            {
                                "id": "004",
                                "title": "Rate your experience",
                                "description": "Rate your experience at E-Connect!"
                            }
                        ]
                    }
                ]
            }
        }
    });

    return data;
}

function MessageList3(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "interactive",
        "interactive": {
            "type": "list",
            "header": {
                "type": "text",
                "text": "We are happy to connect with you."
            },
            "body": {
                "text": "How can we assist you?"
            },
            "footer": {
                "text": "Please select your requirement"
            },
            "action": {
                "button": "Click here!",
                "sections": [
                    {
                        "title": "Help",
                        "rows": [
                            {
                                "id": "001",
                                "title": "E-Connect Website",
                                "description": "Get an URL to visit E-Connect webiste"
                            },
                            {
                                "id": "002",
                                "title": "About us",
                                "description": ""
                            },
                            {
                                "id": "003",
                                "title": "Location?",
                                "description": "Know our office location!"
                            },
                            {
                                "id": "004",
                                "title": "Rate your experience",
                                "description": "Rate your experience at E-Connect!"
                            }
                        ]
                    }
                ]
            }
        }
    });

    return data;
}

function Messageurl1(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "template",
        "template": {
          "name": "econnect",
          "language": {
            "code": "en_US"
          },
          "components": [
            {
              "type": "header",
              "parameters": [
                {
                  "type": "image",
                  "image": {
                    "link": "https://i.imgur.com/ui951b9.jpeg"
                  }
                }
              ]
            }
          ]
        }
      });

    return data;
}

function Messageurl2(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "template",
        "template": {
          "name": "ksbcl",
          "language": {
            "code": "en_US"
          },
          "components": [
            {
              "type": "header",
              "parameters": [
                {
                  "type": "image",
                  "image": {
                    "link": "https://i.imgur.com/noE97KY.png"
                  }
                }
              ]
            }
          ]
        }
      });

    return data;
}

function MessageLocation(number){
    const data = JSON.stringify({
        "messaging_product": "whatsapp",
        "recipient_type": "individual",
        "to": number,
        "type": "location",
        "location": {
            "latitude": "24.57944896288114",
            "longitude": "73.7403879419429",
            "name": "E-Connect Solutions Pvt. Ltd.",
            "address": "G-18, 19, 20, IT Park, M.I.A., Udaipur"
        }
    });

    return data;
}

module.exports = {
    MessageText,
    MessageButtons,
    MessageList,
    MessageLocation,
    MessageList2,
    Messageurl1,
    Messageurl2
};