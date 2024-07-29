import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import ProductCard from "./ProductCard";

export default {
  title: "ProductCard",
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const ProductTemplate: ComponentStory<typeof ProductCard> = (args) => (
  <ProductCard {...args} />
);

const getArgs = (loading: boolean) => ({
  name: "Hat",
  imageUrl: "https://i.imghippo.com/files/OwfHU1722122788.jpg",
  id: 1,
  loading,
});

export const ProductCardSkeleton = ProductTemplate.bind({});
ProductCardSkeleton.args = getArgs(true);

export const ProductCardRendered = ProductTemplate.bind({});
ProductCardRendered.args = getArgs(false);
