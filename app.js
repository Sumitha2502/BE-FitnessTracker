// require express
const express = require('express');

// import the user routes
const userRouter = require('./routes/userRoutes');

// create an express app
const app = express();

// require cors
const cors = require('cors');

// require cookie-parser
const cookieParser = require('cookie-parser');

// require morgan
const morgan = require('morgan');

// use the cors middleware
app.use(cors({
    origin: 'https://splendid-sable-ded7c2.netlify.app', 
    credentials: true
}));

// use the cookie-parser middleware
app.use(cookieParser());


// use the morgan middleware
app.use(morgan('dev'));

// use the express json middleware
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.head('/api', (req, res) => {
    res.send('Welcome to JustFit');
});

// define the endpoints
app.use('/api/users', userRouter);

// export the app module
module.exports = app;

