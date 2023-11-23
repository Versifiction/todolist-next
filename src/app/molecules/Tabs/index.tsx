import React from "react";
import { Tabs } from "antd";

import { useTodolistContext } from "../../components/Todolist";
import {
  TabsFilters,
  TabsItemsProps,
  TabsProps,
} from "../../../interfaces/interfaces";

const tabFilters: TabsFilters = {
  0: "all",
  1: "done",
  2: "undone",
};

const tabsItems: TabsItemsProps[] = [
  {
    key: "1",
    label: "All",
    children: "",
  },
  {
    key: "2",
    label: "Done",
    children: "",
  },
  {
    key: "3",
    label: "Undone",
    children: "",
  },
];

const TabsComponent: React.FC<TabsProps> = () => {
  const todolistContext = useTodolistContext();

  const onChange = (key: string) => {
    todolistContext.changeTabFilter(tabFilters[Number(key) - 1]);
  };
  return <Tabs defaultActiveKey="1" items={tabsItems} onChange={onChange} />;
};

export default TabsComponent;
