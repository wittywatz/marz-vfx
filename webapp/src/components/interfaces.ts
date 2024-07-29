import type { DraggableProvided } from "react-beautiful-dnd";

export const DATA_STATES = {
  waiting: "WAITING",
  loaded: "LOADED",
  error: "ERROR",
};

export interface Order {
  OrderID: number;
  CustomerID: number;
  ProductID: number;
  OrderStatus: string;
}

export interface OrderData {
  Queued: Order[];
  InProgress: Order[];
  QA: Order[];
}

export interface TransformedOrder extends Order {
  id: number;
}

export interface DraggableItemProps<T> {
  item: T;
  loading?: boolean;
  draggableProvided: DraggableProvided;
  processItem: (item: T) => void;
}

export interface DraggableListProps<T> {
  ID: string;
  loading?: boolean;
  listTitle: string;
  processItem: (item: T) => void;
  items: T[];
}

export interface HeaderLink {
  label: string;
  url: string;
}

export interface HeaderProps {
  links: HeaderLink[];
}

export enum Status {
  Active = "Active",
  InActive = "InActive",
}

export interface Product {
  ProductID: number;
  ProductName: string;
  ProductPhotoURL: string;
  ProductStatus: Status;
}
export interface ProductData {
  [Status.Active]: Product[];
  [Status.InActive]: Product[];
}
export interface TransformedProduct extends Product {
  id: number;
}
