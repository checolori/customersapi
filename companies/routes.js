const { Router } = require('express')
const Company = require('./model')

const router = new Router()

router.get('/companies', (req, res, next) => {
  Company
    .findAll()
    .then(companies => {
      res.send({ companies })
    })
    .catch(error => next(error))
})

router.get('/companies/:id', (req, res, next) => {
  Company
    .findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: `Company does not exist`
        })
      }
      return res.send(company)
    })
    .catch(error => next(error))
})

router.post('/companies', (req, res, next) => {
  Company
    .create(req.body)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: `Company does not exist`
        })
      }
      return res.status(201).send(company)
    })
    .catch(error => next(error))
})

router.put('/companies/:id', (req, res, next) => {
  Company
    .findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: `Company does not exist`
        })
      }
      return company.update(req.body).then(company => res.send(company))
    })
    .catch(error => next(error))
})

router.delete('/companies/:id', (req, res, next) => {
  Company
    .findById(req.params.id)
    .then(company => {
      if (!company) {
        return res.status(404).send({
          message: `Company does not exist`
        })
      }
      return company.destroy().then(() => res.send({
        message: `Company was deleted`
      }))
    })
    .catch(error => next(error))
})

module.exports = router