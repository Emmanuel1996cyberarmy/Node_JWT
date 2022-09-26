const { request } = require("express");
const express = require("express")
const app = express();
const jwt = require("jsonwebtoken")
const port = 3000;

app.get("/api", (req, res) => {
    res.json({message: "hey there welcome to this api service"})
})

app.post("/api/posts", verifyToken, (req, res) => {
    jwt.verify(req.token, "secretkey", (err, authData) => {  //this will connect our token appropriately and we will be able to use it.
        if(err) {
            res.sendStatus(403)
        } else{
            res.json({
                message: "posts created..."
            
            });
        }
    })
    
});

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        username: "John",
        email: "john@gmail.com",
    };

    jwt.sign({user: user}, "secretkey", (err, token) => {
        res.json({
            token,
        });
    });
});
//this function will be to authorize
function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader) {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403) //forbidden
    }
}

//set the server to listen to the port.
app.listen(port, () => console.log(`server lsitening at port ${port}`));
