import React, { MouseEventHandler } from "react";
import { Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { ButtonProps } from "../../../interfaces/interfaces";

const ButtonComponent: React.FC<ButtonProps> = (props) => {
  const { click, value } = props;
  return (
    <Button
      type="primary"
      icon={<SearchOutlined />}
      onClick={click}
      className="ml-4"
    >
      {value}
    </Button>
  );
};

export default ButtonComponent;
