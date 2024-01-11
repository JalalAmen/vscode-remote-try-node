const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
/* 
  IMPORTANT:
    ***NEVER*** store credentials unencrypted like this.
    This is for demo purposes only in order to simulate a functioning API serverr.
*/
const users = {
  "dpercival@yahoo.com": {
    id:1,
    profileId:'5CehW',
    email:'dpercival@yahoo.com',
    password:'percival2345',
  },
  "fmortimer@yahoo.com": {
    id:2,
    profileId:'A6rwe',
    email:'fmortimer@yahoo.com',
    password:'mortimer12345',

  }
};
let cart = [];

// use this to add a 1 second delay to all requests
// app.use(function (req, res, next) {
//   setTimeout(next, 1000);
// });

app.get("/api/products", (req, res) => {
  let products = [
    {
      id: 1,
      description:
        "A robot head with an unusually large eye and teloscpic neck -- excellent for exploring high spaces.",
      name: "Large Cyclops",
      imageName: "head-big-eye.png",
      category: "Heads",
      price: 1220.5,
      discount: 0.2,
    },
    
  ];
  res.send(products);
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

app.post("/api/register", (req, res) =>
  setTimeout(() => {
    const user = req.body;
    console.log(user.value);
    if (user.firstName && user.lastName && user.email && user.password) {
      users[user.email] = user;
      res.status(201).send({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      });
    } else {
      res.status(500).send("Invalid user info");
    }
  }, 800)
);

app.post("/api/sign-in", (req, res) => {
  const user = users[req.body.email];
  if (user && user.password === req.body.password) {
    res.status(200).send({
      userId: user.id,
      profileId: user.profileId,
      
    });
  } else {
    res.status(401).send("Invalid user credentials.");
  }
});

app.listen(8081, () => console.log("API Server listening on port 8081!"));
