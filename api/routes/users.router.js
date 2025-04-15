const express = require('express');
const UsersService = require('./../services/users.service')
const router = express.Router();
const service = new UsersService();
const bcrypt = require('bcryptjs');

const SECRET = 'tu_clave_secreta';

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
      const newUser = await service.create(body);
      res.status(201).json(newUser)
    } catch (error) {
      next(error);
    }
  }
);

router.post('/login', async (req, res,next)  => {

    const body = req.body;
    const user = await service.authenticate(body);

    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const passwordIsValid = bcrypt.compareSync(body.password, user.password);
    if (!passwordIsValid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.iduser }, SECRET, { expiresIn: '1h' });

    res.json({ token });
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
