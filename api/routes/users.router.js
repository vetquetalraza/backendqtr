const express = require('express');
const UsersService = require('./../services/users.service');
const router = express.Router();
const service = new UsersService();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middlewares/authMiddleware');

const SECRET = process.env.JWT_SECRET || 'a45ghn890';

router.get('/', authMiddleware, async (req,res,next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', authMiddleware, async (req,res,next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', authMiddleware, async (req, res,next)  => {
    try {
      const body = req.body;
      console.log(body)
      const newUser = await service.create(body);
      res.status(201).json(newUser)
    } catch (error) {
      next(error);
    }
  }
);

router.post('/login', async (req, res,next)  => {

    try {
      const body = req.body;
      const login = await service.authenticate(body);

      if (login.length == 0) return res.status(404).json({ message: 'Usuario y/o contraseña incorrecta' });

      //const passwordIsValid = bcrypt.compareSync(body.password, login[0].passworduser);
      //if (!passwordIsValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

      if (body.password !== login[0].passworduser) return res.status(401).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: login.iduser }, SECRET, { expiresIn: '1h' });
      const username = login[0].nameuser;
      console.log(username)
      res.json({ token , username});

    } catch (error) {
      next(error)
    }

}
);

router.patch('/:id', authMiddleware, async (req, res,next)  => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);
      res.json(user)
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id', authMiddleware, async (req, res, next)  => {
  try {
    const { id } = req.params;
    const rpta = await service.delete(id);
    res.json(rpta);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
