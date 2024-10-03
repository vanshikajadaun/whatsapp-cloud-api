const https = require("https");

function SendMessageWhatsapp(data) 
{
    const options = {
        host: "graph.facebook.com",
        path: "/v19.0/175869718952302/messages",
        method: "POST",
        body: data,
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer EAAR8Ax105LkBOx2AoWWHnmO0P3zZByRU2EojB3IvNnfVZB7ZAev0FOjROh9WFVjWt4XlQlsFVnbt5YBi5PiZBbBLUsXaEuCZBrh3teZAtrZCOYS9maVstitM8q9PrbLtg6KxMbA2D60oj9OHyZAos2Qu0BZBNqnacpuNjJVPxda5gcJzSjOTI0FkR1yPWjKyTg4IJcnM0v7vRaZBrV2YIqXfQZD"
        }
    };

    const req = https.request(options, res => {
        res.on("data", d => {
            process.stdout.write(d);
        });
    });

    req.on("error", error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

module.exports = {
    SendMessageWhatsapp
};
