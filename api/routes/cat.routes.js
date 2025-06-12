const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

router.post('/', catController.createCat);
router.get('/rescueCats', catController.getRescueCats);
router.get('/:id', catController.getCat);
router.put('/:id', catController.updateCat);
router.delete('/:id', catController.deleteCat);
router.get('/', catController.getAllCats);

module.exports = router;
