const service = require('../services/categoryService');

exports.createCategory = async (req, res, next) => {
  try {
    const category = await service.createCategory(req.body);
    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const { userId } = req.query;
    const categories = await service.getCategoriesByUser(userId);
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const deleted = await service.deleteCategory(
      req.params.id,
      req.query.userId
    );

    if (!deleted) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    next(err);
  }
};
