const express = require('express');
const router = express.Router();
const donorOngController = require('../controllers/donorOngController');

router.post('/', donorOngController.createDonorOng);
router.get('/:id', donorOngController.getDonorOng);
router.put('/:id', donorOngController.updateDonorOng);
router.delete('/:id', donorOngController.deleteDonorOng);

module.exports = router;
