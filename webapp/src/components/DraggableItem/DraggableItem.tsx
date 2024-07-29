import React from "react";
import { DraggableItemProps, Order, Product } from "../interfaces";
import ProductCard from "../ProductCard/ProductCard";
import OrderCard from "../OrderCard/OrderCard";

const isOrder = (item: any): item is Order => {
  return (item as Order).OrderID !== undefined;
};

const isProduct = (item: any): item is Product => {
  return (item as Product).ProductName !== undefined;
};

export const DraggableItem = <T extends { id: number }>({
  item,
  loading,
  draggableProvided,
  processItem,
}: DraggableItemProps<T>) => {
  return (
    <div
      ref={draggableProvided.innerRef}
      {...draggableProvided.draggableProps}
      {...draggableProvided.dragHandleProps}
      className="items-center justify-center align-middle"
      data-testid={`draggable-container-${item.id}`}
    >
      {isOrder(item) ? (
        <OrderCard
          processItem={() => processItem(item)}
          OrderID={item.OrderID}
          CustomerID={item.CustomerID}
          ProductID={item.ProductID}
          OrderStatus={item.OrderStatus}
        />
      ) : isProduct(item) ? (
        <ProductCard
          loading={loading ? loading : false}
          name={item.ProductName}
          id={item.ProductID}
          imageUrl={item.ProductPhotoURL}
        />
      ) : (
        <div>Unknown item</div>
      )}
    </div>
  );
};

export default DraggableItem;
