"use client";

import React from "react";
import { Input } from "antd";

import { InputProps } from "../../../interfaces/interfaces";

const InputComponent: React.FC<InputProps> = (props) => {
  const { inputValue, changeInput } = props;
  return (
    <Input
      value={inputValue}
      onChange={changeInput}
      type="text"
      placeholder="Rentrez ici la tâche"
      className="max-w-[300px] w-[300px]"
    />
  );
};

export default InputComponent;
