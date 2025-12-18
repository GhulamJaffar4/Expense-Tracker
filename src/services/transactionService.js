const Transaction = require('../models/Transaction');


exports.createTransaction = async (data) => {
return await Transaction.create(data);
};


exports.getUserTransactions = async (filters) => {
return await Transaction.find(filters).sort({ date: -1 });
};


exports.getMonthlySummary = async (userId, month, year) => {
const start = new Date(year, month - 1, 1);
const end = new Date(year, month, 0, 23, 59, 59);


return await Transaction.aggregate([
{ $match: { userId, date: { $gte: start, $lte: end } } },
{ $group: { _id: '$type', total: { $sum: '$amount' } } }
]);
};