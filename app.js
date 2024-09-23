const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Set up Handlebars as the view engine
app.engine('handlebars', engine());
app.set('view engine', 'handlebars'); 

// Middleware to serve static files from the "public" directory
app.use(express.static('public'));

// Sample route using Handlebars
app.get('/', (req, res) => {
    res.render('index.handlebars', { title: 'Welcome', message: 'Hello, Express Handlebars!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
