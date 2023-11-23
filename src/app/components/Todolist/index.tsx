"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { notification, Tooltip } from "antd";
import { CheckCircleFilled, EditFilled, DeleteFilled } from "@ant-design/icons";
import type { NotificationPlacement } from "antd/es/notification/interface";
import axios from "axios";

import Button from "../../molecules/Button";
import Checkbox from "../../molecules/Checkbox";
import Input from "../../molecules/Input";
import Tabs from "../../molecules/Tabs";
import {
  FilterMap,
  TodolistContext,
  TodolistItem,
} from "../../../interfaces/interfaces";
import useGetRequest from "../../../hooks/useGetRequest";

const FILTER_MAP: FilterMap = {
  all: () => true,
  done: (task: TodolistItem) => task?.done,
  undone: (task: TodolistItem) => !task?.done,
};

const EMPTY_TASK = { id: "", content: "", created_at: "", done: false };

const TodolistContext = createContext<TodolistContext>({
  tabFilter: "",
  changeTabFilter: () => {},
});

export const useTodolistContext = () => useContext(TodolistContext);

const Todolist = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [sortedItems, setSortedItems] = useState<TodolistItem[]>([]);
  const [editingTodo, setEditingTodo] = useState<TodolistItem>();
  const [editingInputValue, setEditingInputValue] = useState<string>(
    editingTodo?.content || ""
  );
  const [tabFilter, setTabFilter] = useState<string>("all");
  const [api, contextHolder] = notification.useNotification();
  // const { response, error, loading } = useGetRequest("/api/get-todo");
  // console.log("response ", response);

  const openNotification = (
    placement: NotificationPlacement,
    type: string,
    message: string
  ) => {
    api.info({
      message: type,
      description: message,
      placement,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleEditingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingInputValue(e.target.value);
  };

  const handleCheckedChange = (index: number) => {
    const itemToSwitch = sortedItems.map((item, i) => {
      return index === i
        ? {
            id: item?.id,
            content: item?.content,
            created_at: item?.created_at,
            done: !item?.done,
          }
        : item;
    });

    setSortedItems(itemToSwitch);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      content: inputValue,
      created_at: new Date().toLocaleString(),
      done: false,
    };

    createTodoInDatabase(newItem);
    setSortedItems([...sortedItems, newItem]);
    setInputValue("");
  };

  const changeTabFilter = (filter: string) => {
    setTabFilter(filter);
  };

  const getTodolistItemsFromDatabase = () => {
    axios
      .get("/api/get-todo")
      .then((response) => {
        setSortedItems(response.data.result);
        openNotification(
          "bottom",
          "Récupération des tâches",
          "Les tâches ont bien été récupérées !"
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const createTodoInDatabase = (todoToCreate: TodolistItem) => {
    console.log("create");
    axios
      .post("/api/create-todo", todoToCreate)
      .then((response) => {
        openNotification(
          "bottom",
          "Création d'une tâche",
          "La tâche a bien été créée !"
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteTodolistItemFromDatabase = (idOfTodoToDelete: string) => {
    axios
      .post("/api/delete-todo", { idOfTodoToDelete })
      .then((response) => {
        setSortedItems((todoItems) =>
          todoItems.filter((item) => item.id !== idOfTodoToDelete)
        );
        openNotification(
          "bottom",
          "Suppression d'une tâche",
          "La tâche a bien été supprimée !"
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const updateTodolistItemFromDatabase = (todoToUpdate: TodolistItem) => {
    const objectToUpdate = {
      id: todoToUpdate?.id,
      content: editingInputValue,
      created_at: todoToUpdate?.created_at,
      done: todoToUpdate?.done,
    };

    axios
      .post("/api/update-todo", objectToUpdate)
      .then((response) => {
        const objectToUpdateSwitch = sortedItems.map((item, i) => {
          return editingTodo?.id === item?.id ? objectToUpdate : item;
        });

        setSortedItems(objectToUpdateSwitch);
        setEditingInputValue("");
        setEditingTodo(EMPTY_TASK);
        openNotification(
          "bottom",
          "Edition d'une tâche",
          "La tâche a bien été éditée !"
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getTodolistItemsFromDatabase();
  }, []);

  useEffect(() => {
    setEditingInputValue(editingTodo?.content || "");
  }, [editingTodo]);

  return (
    <TodolistContext.Provider value={{ tabFilter, changeTabFilter }}>
      {contextHolder}
      <Tabs items={sortedItems} />
      <ul className="my-24">
        {sortedItems
          ?.filter(FILTER_MAP[tabFilter])
          .map((item: TodolistItem, index: number) => (
            <li key={item?.id} className="mb-6 flex">
              {editingTodo?.id === item?.id ? (
                <Input
                  inputValue={editingInputValue}
                  changeInput={handleEditingInputChange}
                />
              ) : (
                <div className="max-w-[300px] w-[300px]">
                  <Tooltip
                    title={`${item?.content} crée le ${item?.created_at
                      .split(" ")
                      .join(" à ")}`}
                  >
                    <span className="overflow-hidden whitespace-no-wrap text-ellipsis cursor-pointer">
                      {item?.content}
                    </span>
                  </Tooltip>
                </div>
              )}
              <Checkbox
                isChecked={item?.done}
                changeChecked={() => handleCheckedChange(index)}
                disabled={editingTodo?.id !== item?.id}
              />
              <Tooltip title="Editer la tâche">
                <EditFilled
                  onClick={() =>
                    setEditingTodo((editingTodo) =>
                      !editingTodo?.id ? item : EMPTY_TASK
                    )
                  }
                  style={{ color: "#414141" }}
                  className="ml-12"
                />
              </Tooltip>
              <Tooltip title="Supprimer la tâche">
                <DeleteFilled
                  onClick={() => deleteTodolistItemFromDatabase(item?.id)}
                  style={{ color: "red" }}
                  className="ml-4"
                />
              </Tooltip>
              {editingTodo?.id === item?.id && (
                <CheckCircleFilled
                  onClick={() => updateTodolistItemFromDatabase(item)}
                  style={{ color: "green" }}
                  className="ml-4"
                />
              )}
            </li>
          ))}
      </ul>
      <div className="flex">
        <Input inputValue={inputValue} changeInput={handleInputChange} />
        <Button value="Envoyer" click={submitForm} />
      </div>
    </TodolistContext.Provider>
  );
};

export default Todolist;
