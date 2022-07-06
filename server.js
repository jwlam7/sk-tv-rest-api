require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
	res.send('hello world');
});

const PORT = process.env.PORT || 3001;
const start = () => {
	try {
		app.listen(PORT, () => {
			console.log(`server started on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
