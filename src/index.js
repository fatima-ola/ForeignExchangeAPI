import express from 'express';
import bodyParser from 'body-parser';

import currencyRouter from './routes/index';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//API routes
app.use('/api', currencyRouter);


// Handle non existing routes
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Wrong request. Route does not exist',
  });
});

// handles 500 error
app.use((err, req, res, next) => {
  if (err) {
  return res.status(500).json({
    status: 500,
    error: 'Something went wrong',
  });
}
return next();
});
  
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

export default app;
