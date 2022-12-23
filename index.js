require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
//DB connection
const connectDB = require('./db/connectDB');
//routers
const topMoviesRouter = require('./routes/topMovies');
const topTvSeriesRouter = require('./routes/topTvSeries');
const authRouter = require('./routes/auth');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');
const notFoundMiddleware = require('./middleware/notFound');

app.use(cors());
app.use(express.json());

//routes
app.get('/', (req, res) => {
	res.send('hello world');
});
app.use('/api/topmovies', topMoviesRouter);
app.use('/api/toptvseries', topTvSeriesRouter);
app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/posts', commentsRouter);
app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3001;
const start = async () => {
	try {
		await connectDB(process.env.MONGODB_URI);
		app.listen(PORT, () => {
			console.log(`server started on port: ${PORT}`);
		});
	} catch (error) {
		console.log(error);
	}
};

start();
