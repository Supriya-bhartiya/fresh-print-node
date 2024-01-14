import http from 'http';
import express, { Express } from 'express';
import routes from '../src/api/routes/index';

const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
	// set the CORS policy
	res.header('Access-Control-Allow-Origin', '*');
	// set the CORS headers
	res.header(
	  'Access-Control-Allow-Headers',
	  'origin,X-Requested-With,Content-Type,Accept,Authorization'
	);
	// set the CORS method headers
	if (req.method === 'OPTIONS') {
	  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
	  return res.status(200).json({});
	}
	next();
  });


app.use('/api/v1/', routes);

/** Error handling */
app.use((_, res) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message,
  });
});

// Start that server
const httpServer = http.createServer(app);
const PORT: string | number = process.env.PORT ?? 3000;
httpServer.listen(PORT, () =>
  console.log(`API server alive and kicking on port ${PORT}`)
);