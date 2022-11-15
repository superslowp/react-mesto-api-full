/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { validateCardData, validateCardId } = require('../utils/validators/cardValidator');
const { getCards, addCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cardController');

router.get('/', getCards);

router.post('/', validateCardData, addCard);

router.delete('/:cardId', validateCardId, deleteCard);

router.put('/:cardId/likes', validateCardId, likeCard);

router.delete('/:cardId/likes', validateCardId, dislikeCard);

module.exports = router;
