const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;
const genl_routes_async = require('./router/asyncGeneral.js').general;

const app = express();

app.use(express.json());

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))


app.use("/customer/auth/*", function auth(req, res, next) {
    if(req.session.authorization) {
        const token = req.session.authorization['accessToken']; // Access Token
        
        jwt.verify(token, "process.env.JWT_SECRET", (err,user)=>{
            if(!err){
                req.user = user;
                next();
            }
            else{
                return res.status(403).json({message: "User not authenticated"})
            }
         });

     } else {
         return res.status(403).json({message: "User not logged in"})
     }
});

 
const PORT =5000;

app.use((error, req, res, next) => {
    res.status(500).json({ message: error.message });
});

app.use("/customer", customer_routes);
app.use("/", genl_routes);
app.use("/async", genl_routes_async);


app.listen(PORT,()=>console.log("Server is running"));
