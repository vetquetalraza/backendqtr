const express = require('express');
const UsersService = require('./../services/users.service')
const router = express.Router();
const service = new UsersService();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET = '123456';

router.get('/', async (req,res,next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req,res,next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/', async (req, res,next)  => {
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
      console.log(body);
      const login = await service.authenticate(body);

      if (login.length == 0) return res.status(404).json({ message: 'Usuario y/o contraseña incorrecta' });

      //const passwordIsValid = bcrypt.compareSync(body.password, login[0].passworduser);
      //if (!passwordIsValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

      if (body.password !== login[0].passworduser) return res.status(401).json({ message: 'Contraseña incorrecta' });

      const token = jwt.sign({ id: login.iduser }, SECRET, { expiresIn: '1h' });

      res.json({ token });

    } catch (error) {
      next(error)
    }

}
);

router.patch('/:id', async (req, res,next)  => {
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

router.delete('/:id', async (req, res, next)  => {
  try {
    const { id } = req.params;
    const rpta = await service.delete(id);
    res.json(rpta);
  } catch (error) {
    next(error);
  }

});

module.exports = router;
