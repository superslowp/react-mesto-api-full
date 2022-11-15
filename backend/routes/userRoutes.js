/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { getUsers, getUserById, updateUser, updateAvatar, getUserInfo } = require('../controllers/userController');
const { validateUserId, validateUserInfo, validateAvatar } = require('../utils/validators/userValidator');

router.get('/', getUsers);

router.get('/me', getUserInfo);

router.get('/:id', validateUserId, getUserById);

router.patch('/me', validateUserInfo, updateUser);

router.patch('/me/avatar', validateAvatar, updateAvatar);

module.exports = router;
