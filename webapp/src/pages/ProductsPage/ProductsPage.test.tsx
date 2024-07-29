import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ALL_PRODUCTS_URL } from "../ApiHelper";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductsPage from "./ProductsPage";
import { Status } from "../../components/interfaces";

describe("ProductsPage", () => {
  it("shouldDisplayProductSkeleton", () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    const skeletons = screen.getAllByTestId("draggable-product-skeleton");
    expect(skeletons.length).toBeGreaterThan(0);
  });
  it("shouldDisplayPipelineContainer", async () => {
    // set up mock for axios.get
    const response = {
      data: [
        {
          ProductID: 1,
          ProductName: "Hat",
          ProductPhotoURL: "https://i.imghippo.com/files/OwfHU1722122788.jpg",
          ProductStatus: Status.Active,
        },
      ],
      message: "",
    };
    const server = setupServer(
      rest.get(ALL_PRODUCTS_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(response));
      })
    );
    server.listen();
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId(`pipeline-container`)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByTestId(`draggable-product-image`)).toBeInTheDocument();
    });
    server.close();
  });
  it("shouldDisplayErrorMessage", async () => {
    // set up mock for axios.get
    const response = {
      data: [],
      message: "Error",
    };
    const server = setupServer(
      rest.get(ALL_PRODUCTS_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json(response));
      })
    );
    server.listen();
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
    });
    server.close();
  });
});
