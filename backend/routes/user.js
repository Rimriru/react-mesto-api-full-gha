const router = require('express').Router();
const {
  getUsers,
  getUser,
  getCurrentUser,
  updateUser,
  updateAvatar,
} = require('../controllers/user');
const {
  userIdValidation,
  userDataValidation,
  userAvatarValidation,
} = require('../utils/userValidationRules');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get(
  '/:id',
  userIdValidation,
  getUser,
);
router.patch(
  '/me',
  userDataValidation,
  updateUser,
);
router.patch(
  '/me/avatar',
  userAvatarValidation,
  updateAvatar,
);

module.exports = router;
