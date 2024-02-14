const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors,  errorHandler, boomErrorHandler } = require('./middlewares/error.handle')

const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080','https://quetalraza.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/', (req,res) => {
  res.send('Hello world')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Listening on ' + port);
});





