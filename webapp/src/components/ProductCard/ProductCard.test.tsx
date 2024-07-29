import React from "react";
import { create, ReactTestRenderer } from "react-test-renderer";
import ProductCard from "./ProductCard";

describe("OrderCard", () => {
  let tree: ReactTestRenderer;

  const props = {
    name: "Hat",
    imageUrl: "https://i.imghippo.com/files/OwfHU1722122788.jpg",
    id: 1,
    loading: false,
  };
  beforeEach(() => {
    tree = create(<ProductCard {...props} />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it("rendersProductCard", async () => {
    const testInstance = tree.root;

    await testInstance.findByProps({
      "data-testid": `draggable-product-image`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-product-header`,
    });
    await testInstance.findByProps({
      "data-testid": `draggable-product-id-${props.id}`,
    });
  });
});

describe("OrderCardSkeleton", () => {
  let tree: ReactTestRenderer;

  const props = {
    name: "Hat",
    imageUrl: "https://i.imghippo.com/files/OwfHU1722122788.jpg",
    id: 1,
    loading: true,
  };
  beforeEach(() => {
    tree = create(<ProductCard {...props} />);
  });
  afterEach(() => {
    tree.unmount();
  });
  it("rendersProductCardSkeleton", async () => {
    const testInstance = tree.root;
    await testInstance.findByProps({
      "data-testid": `draggable-product-skeleton`,
    });
  });
});
