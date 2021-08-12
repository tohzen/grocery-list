const express = require("express");
const router = express.Router();

const {
  getAllGroceries,
  createGrocery,
  updateGrocery,
  deleteGrocery,
  sortGroceryByDate,
  sortGroceryByPurchased,
} = require("./controller/GroceryController");

router.get("/get-all-groceries", getAllGroceries);

router.get("/sort-groceries-by-date", sortGroceryByDate);

router.get("/sort-groceries-by-purchased", sortGroceryByPurchased);

router.post("/create-grocery", createGrocery);

router.put("/update-grocery-by-id/:id", updateGrocery);

router.delete("/delete-grocery-by-id/:id", deleteGrocery);

module.exports = router;