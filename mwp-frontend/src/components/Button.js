import React from "react";
import Button from "react-bootstrap/button";

const AppButton = ({ value, onClick, type }) => {
  return (
    <div>
      <Button className="formBtn" onClick={onClick} type={type}>
        {value}
      </Button>
    </div>
  );
};

export default AppButton;
