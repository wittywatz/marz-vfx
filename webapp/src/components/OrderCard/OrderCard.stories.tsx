import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import OrderCard from "./OrderCard";

export default {
  title: "OrderCard",
  component: OrderCard,
} as ComponentMeta<typeof OrderCard>;

const OrderTemplate: ComponentStory<typeof OrderCard> = (args) => (
  <OrderCard {...args} />
);

const getArgs = (OrderStatus: string) => ({
  OrderID: 1234,
  CustomerID: 2345,
  ProductID: 3456,
  id: 1,
  OrderStatus,
  processItem: () => {},
});

export const NotInQA = OrderTemplate.bind({});
NotInQA.args = getArgs("InProgress");

export const InQA = OrderTemplate.bind({});
InQA.args = getArgs("QA");
