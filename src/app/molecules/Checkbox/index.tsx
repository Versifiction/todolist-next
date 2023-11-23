"use client";

import React from "react";
import { Checkbox } from "antd";

import { CheckboxProps } from "../../../interfaces/interfaces";

const CheckboxComponent: React.FC<CheckboxProps> = (props) => {
  const { disabled, isChecked, changeChecked } = props;

  return (
    <Checkbox
      type="checkbox"
      className="ml-4"
      checked={isChecked}
      onChange={changeChecked}
      disabled={disabled}
    ></Checkbox>
  );
};

export default CheckboxComponent;
