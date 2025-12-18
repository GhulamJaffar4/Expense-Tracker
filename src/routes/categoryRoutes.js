const express = require('express');
const { body, query, param } = require('express-validator');

const validate = require('../middlewares/validate');
const categoryController = require('../controllers/categoryController');

const router = express.Router();

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 */
router.post(
  '/',
  [
    body('name')
      .notEmpty()
      .withMessage('Category name is required'),
    body('userId')
      .notEmpty()
      .withMessage('User ID is required')
  ],
  validate,
  categoryController.createCategory
);

/**
 * @route   GET /api/categories?userId=123
 * @desc    Get all categories for a user
 */
router.get(
  '/',
  [
    query('userId')
      .notEmpty()
      .withMessage('User ID is required')
  ],
  validate,
  categoryController.getCategories
);

/**
 * @route   DELETE /api/categories/:id?userId=123
 * @desc    Delete a category
 */
router.delete(
  '/:id',
  [
    param('id')
      .isMongoId()
      .withMessage('Invalid category ID'),
    query('userId')
      .notEmpty()
      .withMessage('User ID is required')
  ],
  validate,
  categoryController.deleteCategory
);

module.exports = router;
