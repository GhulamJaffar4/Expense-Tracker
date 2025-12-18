const Category = require('../models/Category');


exports.createCategory = async (data) => {
return await Category.create(data);
};


exports.getCategoriesByUser = async (userId) => {
return await Category.find({ userId }).sort({ name: 1 });
};


exports.deleteCategory = async (id, userId) => {
return await Category.findOneAndDelete({ _id: id, userId });
};