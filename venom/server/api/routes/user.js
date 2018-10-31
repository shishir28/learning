const User = require('../../models/user')

module.exports = function (router) {
  router.get('/user/:id', function (req, res) {
    User.findById(req.params.id).exec()
      .then(docs => res.status(200)
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })

  router.get('/user/email/:email', function (req, res) {
    User.find({ 'email': req.params.email }).exec()
      .then(docs => res.status(200) 
        .json(docs))
      .catch(err => res.status(500)
        .json({
          message: 'Error finding user',
          error: err
        }))
  })

  router.post('/user', function (req, res) {
    let user = new User(req.body)
    user.save(function (err, user) {
      if (err) return console.log(err)
      res.status(200).json(user)
    })
  })

  router.put('/user/:id', function (req, res) {
    let qry = { _id: req.params.id }
    let doc = {
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: req.body.password,
      isActive: req.body.isActive
    }
    User.update(qry, doc, function (err, respRaw) {
      if (err) return console.log(err)
      res.status(200).json(respRaw)
    })
  })
}
