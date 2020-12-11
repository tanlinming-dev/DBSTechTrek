const express = require('express');
const bodyParser = require('body-parser'); // To Parse JSON etc
const axios = require('axios'); // Use to send HTTP Post/Get/...
const multer = require('multer'); // Middleware to receive form-data etc
const FormData = require('form-data'); // To Create a Form Data request in NodeJS
const path = require('path'); // To locate path

const port = process.env.PORT || 5000; // Specifying Port

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const upload = multer();

// Include React Build Static files
if (process.env.NODE_ENV != 'dev') {
	app.use(express.static(path.join(__dirname, '/build')));
}

app.get('/api', (req, res) => {
	res.send({ express: 'Hello From Express' });
});

// Direct other points that not exist in backend to React Static Files
if (process.env.NODE_ENV != 'dev') {
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/build/index.html'));
	});
}

app.listen(port, () => console.log(`Listening on port ${port}`));