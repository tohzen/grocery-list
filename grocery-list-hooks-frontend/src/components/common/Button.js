import React from "react";

function Button({ buttonName, clickFunc = () => {} }) {
    return (
        <React.Fragment>
        <button
        onClick={() => {
            clickFunc();
        }}
        >
        {buttonName}
        </button>
        </React.Fragment>
        );
    }
    
    export default Button;