import React from "react";

function TextError(props) {
  const errorDivStyle = {
    color: "red",
  };
  return (
    <div className="error" style={errorDivStyle}>
      {props.children}
    </div>
  );
}

export default TextError;
