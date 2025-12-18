const Transaction = require('../models/Transaction'); // adjust path if needed

// CREATE TRANSACTION
const createTransaction = async (req, res, next) => {
  try {
    const { userId, type, amount, category, date } = req.body;

    const transaction = await Transaction.create({
      userId,
      type,
      amount,
      category,
      date: date || new Date()
    });

    res.status(201).json(transaction);
  } catch (error) {
    next(error);
  }
};

// GET ALL TRANSACTIONS WITH FILTERS
const getTransactions = async (req, res, next) => {
  try {
    const { userId, category, type } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const filter = { userId };

    if (category) filter.category = category;
    if (type) filter.type = type;

    const transactions = await Transaction.find(filter).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    next(error);
  }
};

// GET MONTHLY SUMMARY
const getMonthlySummary = async (req, res, next) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    const summary = await Transaction.aggregate([
      { $match: { userId } },
      {
        $group: {
          _id: { month: { $month: "$date" }, year: { $year: "$date" }, type: "$type" },
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};

// EXPORT CONTROLLER FUNCTIONS
module.exports = {
  createTransaction,
  getTransactions,
  getMonthlySummary
};
