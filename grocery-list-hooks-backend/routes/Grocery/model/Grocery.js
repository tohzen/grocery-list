const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema({
  grocery: {
    type: String,
  },
  purchased: {
    type: Boolean,
  },
  Date: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Grocery", grocerySchema);