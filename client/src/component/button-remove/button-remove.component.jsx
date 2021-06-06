import React from "react";
import Cancel from "../../asset/cancel.png";
import "./button-remove.styles.scss";

const ButtonRemove = ({ remove, children }) => {
  return (
    <div className="button-remove">
      <img onClick={remove} src={Cancel} alt="cancel.png" />
      <div>{children}</div>
    </div>
  );
};

export default ButtonRemove;
