const User = require("../models/user");
const { Parser } = require("json2csv");

// CREATE
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// GET WITH PAGINATION + SEARCH
exports.getUsers = async (req, res) => {
  const { page = 1, limit = 5, search = "" } = req.query;

  const query = {
    name: { $regex: search, $options: "i" }
  };

  const users = await User.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await User.countDocuments(query);

  res.json({
    users,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit)
  });
};

// GET SINGLE USER
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
};

// UPDATE
exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  res.json(user);
};

// DELETE
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
};

// EXPORT CSV
exports.exportCSV = async (req, res) => {
  const users = await User.find();
  const parser = new Parser();
  const csv = parser.parse(users);

  res.header("Content-Type", "text/csv");
  res.attachment("users.csv");
  res.send(csv);
};
