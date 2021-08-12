import React, { useState, useContext } from "react";
import Button from "../common/Button";

import { GroceryInputContext } from "../context/context";

function GroceryInput() {
    const [groceryItem, setGroceryItem] = useState("");
    
    const { addGrocery, setSortOrder, handleSortByPurchased } =
    useContext(GroceryInputContext);
    
    const handleOnSubmit = (e) => {
        e.preventDefault();
        
        addGrocery(groceryItem);
    };
    
    const sortByPurchased = (newSortOrder) => {
        handleSortByPurchased(newSortOrder);
    };
    
    return (
        <div>
        <div>
        <form onSubmit={handleOnSubmit}>
        <input
        type="text"
        value={groceryItem}
        onChange={(e) => setGroceryItem(e.target.value)}
        />
        <button type="submit">Submit</button>
        </form>
        <div>{/* error message div */}</div>
        </div>
        <div>
        <Button
        buttonName="Sort by date added - Oldest to Newest"
        clickFunc={() => {
            setSortOrder("desc");
        }}
        />
        <Button
        buttonName="Sort by date added - Newest to Oldest"
        clickFunc={() => {
            setSortOrder("asc");
        }}
        />
        <Button
        buttonName="Sort by Purchased"
        clickFunc={() => {
            sortByPurchased(true);
        }}
        />
        <Button
        buttonName="Sort by Not Purchased"
        clickFunc={() => {
            sortByPurchased(false);
        }}
        />
        </div>
        </div>
        );
    }
    
    export default GroceryInput;