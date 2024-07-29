import React from "react";
import { create, ReactTestRenderer } from "react-test-renderer";
import OrderCard from "./OrderCard";

describe("OrderCard", () => {
  let tree: ReactTestRenderer;
  const props = {
    OrderID: 1234,
    CustomerID: 2345,
    ProductID: 3456,
    OrderStatus: "QA",
    processItem: () => {},
  };
  beforeEach(() => {
    tree = create(<OrderCard {...props} />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it("rendersOrderCard", async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({
      "data-testid": `draggable-customerID-${props.OrderID}`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-productID-${props.OrderID}`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-btn-${props.OrderID}`,
    });
  });
});
