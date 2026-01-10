const path = require('path');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors,  errorHandler, boomErrorHandler } = require('./middlewares/error.handle')

const app = express();
const port = process.env.PORT || 3001;

const whitelist = ['http://localhost:3000','http://localhost:3001','https://vetadmin.quetalraza.com','https://quetalraza.com','https://front-vet.onrender.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
  credentials: false,
  methods: ['GET', 'POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition']
}

app.use(cors(options));
app.options('*', cors());

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Listening on ' + port);
});






