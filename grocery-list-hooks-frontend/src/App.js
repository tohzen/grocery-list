import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  GroceryInputContext,
  GroceryContext,
} from "./components/context/context";

import Header from "../src/components/Header/Header";
import Grocery from "./components/Groceries/Grocery";
import GroceryInput from "./components/Groceries/GroceryInput";

import "./App.css";

const URL = "http://localhost:8080";

function App() {
  let initialSortOrder = window.localStorage.getItem("sort")
    ? JSON.parse(window.localStorage.getItem("sort"))
    : "asc";

  let initialPurchasedOrder = window.localStorage.getItem("purchasedSort")
    ? JSON.parse(window.localStorage.getItem("purchasedSort"))
    : null;

  const [groceryArray, setGroceryArray] = useState([]);
  const [sortOrder, setSortOrder] = useState(initialSortOrder);
  const [purchasedOrder, setPurchasedOrder] = useState(initialPurchasedOrder);

  useEffect(() => {
    window.localStorage.setItem("sort", JSON.stringify(sortOrder));
    getGroceriesList(); //missing a dependency??
  }, [sortOrder]);

  useEffect(() => {
    window.localStorage.setItem(
      "purchasedSort",
      JSON.stringify(purchasedOrder)
    );
  }, [purchasedOrder]);

  //this function incorporates the functionality of sort by date in
  //addition to getting initial list to be called in use effect
  async function getGroceriesList() {
    try {
      let fetchedGroceryArray = await axios.get(
        `${URL}/api/grocery/sort-groceries-by-date/?sort=${sortOrder}`
      );
      setGroceryArray(fetchedGroceryArray.data.payload);
    } catch (e) {
      console.log(e);
    }
  }

  async function updateGroceryItem(_id, groceryItem, isPurchased) {
    try {
      let updatedGroceryItem = await axios.put(
        `${URL}/api/grocery/update-grocery-by-id/${_id}`,
        { grocery: groceryItem, purchased: isPurchased }
      );
      return updatedGroceryItem;
    } catch (e) {
      console.log(e);
    }
  }

  async function createGroceryItem(groceryItem) {
    try {
      let createdGroceryItem = await axios.post(
        `${URL}/api/grocery/create-grocery`,
        { grocery: groceryItem }
      );
      return createdGroceryItem;
    } catch (e) {
      console.log(e);
    }
  }

  async function deleteGroceryItem(_id) {
    try {
      await axios.delete(`${URL}/api/grocery/delete-grocery-by-id/${_id}`);
    } catch (e) {
      console.log(e);
    }
  }

  //seperate the dom updates from the server calls
  const addGrocery = async (groceryItem) => {
    try {
      let newGrocery = await createGroceryItem(groceryItem);
      let newGroceryArray = [
        ...groceryArray,
        {
          _id: newGrocery.data.payload._id,
          grocery: groceryItem,
          purchased: false,
        },
      ];

      setGroceryArray(newGroceryArray);
    } catch (e) {
      console.log(e);
    }
  };

  const handleEdit = async (_id, index, groceryItem, isPurchased) => {
    try {
      await updateGroceryItem(_id, groceryItem, isPurchased);
      let editedGroceryArray = [...groceryArray];
      editedGroceryArray[index].grocery = groceryItem;
      setGroceryArray(editedGroceryArray);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePurchased = async (_id, index, groceryItem, isPurchased) => {
    try {
      await updateGroceryItem(_id, groceryItem, isPurchased);
      let editedGroceryArray = [...groceryArray];
      editedGroceryArray[index].purchased = isPurchased;
      setGroceryArray(editedGroceryArray);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (_id, index) => {
    try {
      await deleteGroceryItem(_id);

      let newGroceryArray = [...groceryArray];

      newGroceryArray.splice(index, 1);

      setGroceryArray(newGroceryArray);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSortByPurchased = async (newSortOrder) => {
    try {
      let fetchedGroceryArray = await axios.get(
        `${URL}/api/grocery/sort-groceries-by-purchased/?purchased=${newSortOrder}`
      );
      setGroceryArray(fetchedGroceryArray.data.payload);
      setPurchasedOrder(newSortOrder);
    } catch (e) {
      console.log(e);
    }
  };

  function showGroceryInput() {
    return (
      <GroceryInputContext.Provider
        value={{ addGrocery, setSortOrder, handleSortByPurchased }}
      >
        <GroceryInput />
      </GroceryInputContext.Provider>
    );
  }

  function showGroceries() {
    return (
      <table
        style={{ marginLeft: "auto", marginRight: "auto", width: "400px" }}
      >
        <tbody>
          {groceryArray.map((item, index) => {
            return (
              <GroceryContext.Provider
                key={item._id}
                value={{
                  grocery: item,
                  index,
                  handleEdit,
                  handlePurchased,
                  handleDelete,
                }}
              >
                <tr>
                  <Grocery />
                </tr>
              </GroceryContext.Provider>
            );
          })}
        </tbody>
      </table>
    );
  }
  return (
    <div className="App">
      <Header />
      {showGroceryInput()}
      {showGroceries()}
    </div>
  );
}

export default App;