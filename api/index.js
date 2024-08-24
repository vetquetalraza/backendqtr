const path = require('path');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const fs = require('fs');

const { logErrors,  errorHandler, boomErrorHandler } = require('./middlewares/error.handle')

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

const whitelist = ['http://localhost:3000','http://localhost:3001/public','https://quetalraza.com','https://api-vet-2utn.onrender.com/','https://front-vet.onrender.com'];
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
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, path.join(__dirname, 'uploads/'));
//   },
//   filename: (req, file, cb) => {
//       cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
//   }
// })

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/')); // Carpeta donde se almacenarán los archivos
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // Nombre del archivo
  }
});

const upload = multer({ storage });

// Middleware para servir archivos estáticos
app.use('/uploads', express.static('uploads'));

// Ruta para subir archivos
app.post('/upload', upload.single('photo'), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

//END

app.listen(port, () => {
  console.log('Listening on ' + port);
});






