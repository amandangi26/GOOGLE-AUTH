// app.js
const express = require('express');
const path = require('path');
require('dotenv').config();
require('./db'); // Ensure this is the path to your db.js
const session = require('express-session');
const passport = require('passport');
require('./auth'); // Ensure this is the path to your auth.js
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user=req.user;
  next();
});


app.get('/auth/google',(req,res,next)=>{
  if(req.isAuthenticated()){
   
      return res.redirect("/");
    }
    next()
},
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile'); // Redirect to the profile page or wherever you want
  }
);

app.get('/profile', (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/google');
  }
  
  console.log(req.user);
  let user=req.user
  // res.render("index.ejs",{user});
  res.redirect("/")
});

app.get('/', (req, res) => {
  res.render("index.ejs",);
});

app.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    }
    res.redirect("/");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
