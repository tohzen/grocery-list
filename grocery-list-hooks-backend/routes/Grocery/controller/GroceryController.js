const Grocery = require("../model/Grocery");

const getAllGroceries = async function (req, res) {
    try {
      let foundGroceries = await Grocery.find({});
      res.json({ message: "success", payload: foundGroceries });
    } catch (e) {
      res.json({ message: "failure", error: e.message });
    }
  };
  
  const sortGroceryByDate = async function (req, res) {
    try {
      let sort = req.query.sort;
      let sortOrder = sort === "desc" ? -1 : 1;
      let foundGrocery = await Grocery.find({}).sort({ Date: sortOrder });
      res.json({ payload: foundGrocery });
    } catch (e) {
      res.json({ message: "failure", error: e.message });
    }
  };
  
  const sortGroceryByPurchased = async function (req, res) {
    try {
      let purchased = req.query.purchased;
      let isPurchasedOrder = purchased === "true" ? true : false;
      let foundGrocery = await Grocery.find({ purchased: isPurchasedOrder });
      res.json({ payload: foundGrocery });
    } catch (e) {
      res.json({ message: "failure", error: e.message });
    }
  };
  
  const createGrocery = async function (req, res) {
    const { grocery } = req.body;
    try {
      let createdGrocery = new Grocery({
        grocery,
        purchased: false,
      });
      await createdGrocery.save();
      res.json({ message: "success", payload: createdGrocery });
    } catch (e) {
      res.json({ message: "failure", error: e.message });
    }
  };
  
  const updateGrocery = async function (req, res) {
    const { grocery, purchased } = req.body;
  
    try {
      let updatedGrocery = await Grocery.findByIdAndUpdate(
        { _id: req.params.id },
        { grocery, purchased },
        {
          new: true,
        }
      );
      res.json({ message: "success", payload: updatedGrocery });
    } catch (e) {
      res.json({ message: "failure", error: e.message });
    }
  };
  
  const deleteGrocery = async function (req, res) {
    try {
      let deletedGrocery = await Grocery.findByIdAndRemove({
        _id: req.params.id,
      });
      res.json({ message: "success", payload: deletedGrocery });
    } catch (e) {
      res.json({ message: "failure", error: e.message });
    }
  };
  
  module.exports = {
    getAllGroceries,
    createGrocery,
    updateGrocery,
    deleteGrocery,
    sortGroceryByDate,
    sortGroceryByPurchased,
  };