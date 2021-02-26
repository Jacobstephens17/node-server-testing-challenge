const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");
const checkDept = require("../auth/check-role-middleware.js")

router.get("/", (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});


router.post('/', (req,res) => {
    const person = req.body
    Users.add(person)
    .then((user) => {
        res.status(201).json(user)
    })
    .catch((err) => {
        res.status(500).json({message:err.message})
    })
})


router.delete('/:id', (req,res) => {
    const { id } = req.params
    Users.remove(id)
    .then(() => {
        res.status(200).json({message: 'successfully deleted'})
    })
    .catch((err) => {

    })
})
module.exports = router;
