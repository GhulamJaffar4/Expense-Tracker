const express = require('express');
const { body } = require('express-validator');
const validate = require('../middlewares/validate'); // your validation middleware
const controller = require('../controllers/transactionController');

const router = express.Router();

// CREATE TRANSACTION
router.post(
  '/',
  [
    body('userId').notEmpty().withMessage('userId is required'),
    body('type').isIn(['income', 'expense']).withMessage('type must be income or expense'),
    body('amount').isNumeric().withMessage('amount must be a number'),
    body('category').notEmpty().withMessage('category is required')
  ],
  validate,
  controller.createTransaction
);

// GET TRANSACTIONS
router.get('/', controller.getTransactions);

// GET MONTHLY SUMMARY
router.get('/summary/monthly', controller.getMonthlySummary);

module.exports = router;
