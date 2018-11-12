'use strict';
const { User } = require('../models');

module.exports = class Users {
  constructor(router) {
    this.router = router;
  }

  expose() {
    this.findUsersAll();
    this.user();
    this.createUser();
    this.update();
    this.delete();
  }

  findUsersAll() {
    this.router.get('/users', (req, res) => {
      User.findAll()
        .then(users => {
          res.json(users)
        })
        .catch(err => {
          res.json(err)
        })
    });
  }

  user() {
    this.router.get('/users/:id', (req, res) => {
      User.find({ where: { id: req.params.id } })
        .then(users => {
          res.json(users)
        })
        .catch(err => {
          res.json(err)
        })
    });
  }

  createUser() {
    this.router.post('/users', (req, res) => {
      User.create(req.body)
        .then(users => {
          res.json(users)
        })
        .catch(err => {
          res.json(err)
        })
    });
  }

  update() {
    this.router.put('/users/:id', (req, res) => {
      User.find({ where: { id: req.params.id } })
        .then(user => {
          return user.updateAttributes(req.body)
            .then(response => {
              res.json(response)              
            })
        })
        .catch(error => {
          res.json(error)
        })
    });
  }

  delete() {
    this.router.delete('/users/:id', (req, res) => {
      User.destroy({ where: { id: req.params.id } })
        .then(users => {
          res.json({Resposta: "Deletado"})
        })
        .catch(error => {
          res.json(error)
        })
    });
  }
};