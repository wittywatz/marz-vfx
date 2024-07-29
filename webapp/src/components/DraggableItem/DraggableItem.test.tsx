import React from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { create, ReactTestRenderer } from "react-test-renderer";
import DraggableItem from "./DraggableItem";
import { Status } from "../interfaces";

describe("DraggableItem --> Order", () => {
  let tree: ReactTestRenderer;
  const ID = "1234";
  beforeEach(() => {
    const draggableProvided: DraggableProvided = {
      innerRef: () => {},
      draggableProps: {
        "data-rbd-draggable-context-id": "1",
        "data-rbd-draggable-id": "1",
      },
      dragHandleProps: null,
    };
    const props = {
      item: {
        id: 1234,
        OrderID: 1234,
        CustomerID: 2345,
        ProductID: 3456,
        OrderStatus: "QA",
      },

      draggableProvided,
      processItem: () => {},
    };
    tree = create(<DraggableItem {...props} />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it("rendersDraggableItem", async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({
      "data-testid": `draggable-container-${ID}`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-customerID-${ID}`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-productID-${ID}`,
    });
    await testInstance.findByProps({ "data-testid": `draggable-btn-${ID}` });
  });
});

describe("DraggableItem --> Product", () => {
  let tree: ReactTestRenderer;

  const id = 1;
  beforeEach(() => {
    const draggableProvided: DraggableProvided = {
      innerRef: () => {},
      draggableProps: {
        "data-rbd-draggable-context-id": "1",
        "data-rbd-draggable-id": "1",
      },
      dragHandleProps: null,
    };
    const props = {
      item: {
        ProductID: 1,
        id,
        ProductName: "Hat",
        ProductPhotoURL: "https://i.imghippo.com/files/OwfHU1722122788.jpg",
        ProductStatus: Status.Active,
      },

      draggableProvided,
      processItem: () => {},
    };
    tree = create(<DraggableItem {...props} />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it("rendersDraggableItem", async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({
      "data-testid": `draggable-container-${id}`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-product-image`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-product-header`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-product-id-${id}`,
    });
  });
});
