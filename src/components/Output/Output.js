import React from "react";
import "./Output.css";

const Output = ({children}) => {

    return <div className="Output">
        <input
          type="text"
          value={children}
          disabled
        />
    </div>
};

export default Output;