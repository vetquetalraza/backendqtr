const path = require('path');
const multer = require('multer');
const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');
const fs = require('fs');

const { logErrors,  errorHandler, boomErrorHandler } = require('./middlewares/error.handle')

const app = express();
const port = process.env.PORT || 3001;

const whitelist = ['http://localhost:3000','http://localhost:3001','https://vetadmin.quetalraza.com','https://quetalraza.com','https://api-vet-2utn.onrender.com/','https://front-vet.onrender.com'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('No permitido'));
    }
  },
  credentials: true,
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

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

routerApi(app);

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
    cb(null, file.originalname); // Nombre del archivo
  }
});

const upload = multer({ storage });

// Middleware para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta para subir archivos
app.post('/upload', upload.single('photo'), (req, res) => {
  res.send({ filePath: `/uploads/${req.file.filename}` });
});

// app.get('/uploads', (req, res) => {
//   fs.readdir(uploadDir, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: 'Error leyendo la carpeta uploads' });
//     }
//     res.json({ files });
//   });
// });

//END

app.listen(port, () => {
  console.log('Listening on ' + port);
});






