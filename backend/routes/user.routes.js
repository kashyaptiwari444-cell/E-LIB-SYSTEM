let router = require('express').Router();

const {
    showHome,
    showDetailsPage,
    addUser,
    editUser,
    deleteUser,
    loginUser
} = require("../controllers/userController");

router.get('/', showHome);
router.get('/show-details/:id', showDetailsPage);

router.post('/add-user', addUser);

router.put('/edit-user/:id', editUser);

router.delete('/delete-user/:id', deleteUser);

router.post("/login", loginUser);

module.exports = router;
