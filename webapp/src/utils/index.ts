import {
  Order,
  Product,
  TransformedOrder,
  TransformedProduct,
} from "../components/interfaces";

export const transformedOrders = (orders: Order[]) => {
  return orders.reduce<TransformedOrder[]>(
    (acc: TransformedOrder[], value: Order) => {
      acc.push({ id: value.OrderID, ...value });
      return acc;
    },
    []
  );
};

export const transformedProducts = (products: Product[]) => {
  return products.reduce<TransformedProduct[]>(
    (acc: TransformedProduct[], value: Product) => {
      acc.push({ id: value.ProductID, ...value });
      return acc;
    },
    []
  );
};
