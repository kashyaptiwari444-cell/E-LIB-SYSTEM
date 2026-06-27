let router = require('express').Router();

let {
    showHome,
    showDetailsPage,
    addUser,
    editUser,
    deleteUser
} = require('../controllers/userController.js');

router.get('/', showHome);
router.get('/show-details/:id', showDetailsPage);

router.post('/add-user', addUser);

router.put('/edit-user/:id', editUser);

router.delete('/delete-user/:id', deleteUser);

module.exports = router;