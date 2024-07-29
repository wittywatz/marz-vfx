import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MemoryRouter } from "react-router-dom";
import {
  ALL_PRODUCTS_URL,
  INPIPELINE_URL,
  UPDATE_PRODUCT_STATUS_URL,
  UPDATE_STATUS_URL,
} from "../ApiHelper";
import ProductsPage from "./ProductsPage";
import { Product, Status } from "../../components/interfaces";

export default {
  title: "Product Page",
  component: ProductsPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

const dummyProductList = (status: Status) =>
  Array.from({ length: 3 }).map((_, index) => ({
    ProductID: `${index + 1}-${status}`,
    ProductName: "Hat",
    ProductPhotoURL: "https://i.imghippo.com/files/OwfHU1722122788.jpg",
    ProductStatus: status,
  }));

export const GetDataSuccess = Template.bind({});
GetDataSuccess.parameters = {
  mockData: [
    {
      url: ALL_PRODUCTS_URL,
      method: "GET",
      status: 200,
      response: {
        data: [
          ...dummyProductList(Status.Active),
          ...dummyProductList(Status.InActive),
        ],
        message: "",
      },
    },
    {
      url: UPDATE_PRODUCT_STATUS_URL,
      method: "POST",
      status: 200,
      response: {
        data: {
          message: "Success",
        },
      },
    },
  ],
};

export const GetDataSuccessEmpty = Template.bind({});
GetDataSuccessEmpty.parameters = {
  mockData: [
    {
      url: ALL_PRODUCTS_URL,
      method: "GET",
      status: 200,
      response: {
        data: [],
        message: "",
      },
    },
    {
      url: UPDATE_PRODUCT_STATUS_URL,
      method: "POST",
      status: 200,
      response: {
        data: {
          message: "Success",
        },
      },
    },
  ],
};

export const GetDataError = Template.bind({});
GetDataError.parameters = {
  mockData: [
    {
      url: ALL_PRODUCTS_URL,
      method: "GET",
      status: 500,
      response: {
        data: [],
        message: "Error",
      },
    },
    {
      url: UPDATE_PRODUCT_STATUS_URL,
      method: "POST",
      status: 200,
      response: {
        data: {
          message: "Success",
        },
      },
    },
  ],
};
