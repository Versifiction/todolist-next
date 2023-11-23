import { MouseEventHandler } from "react";

export interface ButtonProps {
  value: string;
  click: MouseEventHandler<HTMLButtonElement>;
}

export interface CheckboxProps {
  isChecked: boolean;
  changeChecked: () => void;
  disabled: boolean;
}

export interface FilterMap {
  [key: string]: (task: TodolistItem) => boolean;
}

export interface InputProps {
  inputValue: string;
  changeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TodolistItem {
  id: string;
  content: string;
  created_at: string;
  done: boolean;
}

export interface TabsFilters {
  [key: number]: string;
}

export interface TabsItemsProps {
  key: string;
  label: string;
  children: string;
}

export interface TabsProps {
  items: TodolistItem[];
}

export interface TodolistContext {
  tabFilter: TabsFilters;
  changeTabFilter: (filter: string) => void;
}
