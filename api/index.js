const path = require('path');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');


const { logErrors,  errorHandler, boomErrorHandler } = require('./middlewares/error.handle')

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const whitelist = ['http://localhost:3000','https://quetalraza.com','https://api-vet-2utn.onrender.com/','https://front-vet.onrender.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  }
}
app.use(cors(options));

app.get('/api', (req,res) => {
  res.send('Hello world')
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


//SUBIR FOTOGRAFIAS
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'images/')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

app.post('/public/upload', upload.single('file'),(req, res) => {
  console.log(req.file.filename)
  return res.json(req.file.filename)
})
//END

app.listen(port, () => {
  console.log('Listening on ' + port);
});






