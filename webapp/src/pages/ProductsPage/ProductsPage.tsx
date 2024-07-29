import React, { useCallback, useEffect, useMemo, useState } from "react";
import PageWrapper from "../PageWrapper";
import {
  DATA_STATES,
  Product,
  ProductData,
  Status,
} from "../../components/interfaces";
import { getAllProducts, updateProductStatus } from "../ApiHelper";
import { DragDropContext } from "react-beautiful-dnd";
import DraggableList from "../../components/DraggableList/DraggableList";
import { transformedProducts } from "../../utils";
import { ProductCardError } from "../../components/ProductCard/ProductCard";

interface IdList {
  "0": string;
  "1": string;
}

const ID_LIST_MAP: IdList = {
  "0": Status.Active,
  "1": Status.InActive,
};
const dummyProductList: Product[] = Array.from({ length: 3 }).map(
  (_, index) => ({
    ProductID: index,
    ProductName: "",
    ProductPhotoURL: "",
    ProductStatus: Status.Active,
  })
);

const ProductsPage: React.FC = () => {
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);
  const [data, setData] = useState({
    Active: [],
    InActive: [],
  } as ProductData);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    setLoadingState(DATA_STATES.waiting);
    const { productData, errorOccured } = await getAllProducts();
    setData(productData);
    setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
  };

  const handleDragEnd = useCallback(
    async (result: any) => {
      const { source, destination } = result;

      if (!destination) return;

      const sourceKey = ID_LIST_MAP[
        source.droppableId as keyof IdList
      ] as keyof ProductData;
      const sourceIndex = source.index;

      const destKey = ID_LIST_MAP[
        destination.droppableId as keyof IdList
      ] as keyof ProductData;
      const destIndex = destination.index;

      if (sourceKey === destKey) {
        const sourceClone = Array.from(data[sourceKey]);
        const [removed] = sourceClone.splice(sourceIndex, 1);
        sourceClone.splice(destIndex, 0, removed);
        setData({ ...data, [sourceKey]: sourceClone });
      } else {
        setLoadingState(DATA_STATES.waiting);
        const sourceClone = Array.from(data[sourceKey]);
        const destClone = Array.from(data[destKey]);
        const [removed] = sourceClone.splice(sourceIndex, 1);

        const productStatusUpdated = await updateProductStatus(
          removed,
          destKey
        );

        if (productStatusUpdated) {
          destClone.splice(destIndex, 0, removed);
          destClone[destIndex].ProductStatus = destKey;
          setData({
            ...data,
            [sourceKey]: sourceClone,
            [destKey]: destClone,
          });
        }
        setLoadingState(DATA_STATES.loaded);
      }
    },
    [data]
  );

  const renderProductData: ProductData = useMemo(() => {
    if (loadingState === DATA_STATES.waiting) {
      return {
        Active: dummyProductList,
        InActive: dummyProductList,
      };
    }
    if (loadingState === DATA_STATES.loaded) {
      return data;
    }
    return {
      Active: [],
      InActive: [],
    };
  }, [loadingState, data]);

  const RenderProductPage = useCallback(
    ({ productData }: { productData: ProductData }) => {
      return (
        <>
          {" "}
          <h1 className="text-3xl font-bold text-white mb-6">Our Products</h1>
          <div className="flex flex-row justify-center w-full pt-4">
            {loadingState === DATA_STATES.error ? (
              <ProductCardError />
            ) : (
              <div
                className="flex flex-row justify-center w-full pt-4"
                data-testid="pipeline-container"
              >
                <DragDropContext onDragEnd={handleDragEnd}>
                  <DraggableList
                    ID="0"
                    loading={loadingState === DATA_STATES.waiting}
                    listTitle={ID_LIST_MAP[0]}
                    processItem={() => {}}
                    items={transformedProducts(productData.Active)}
                  />
                  <DraggableList
                    ID="1"
                    loading={loadingState === DATA_STATES.waiting}
                    listTitle={ID_LIST_MAP[1]}
                    processItem={() => {}}
                    items={transformedProducts(productData.InActive)}
                  />
                </DragDropContext>
              </div>
            )}
          </div>
        </>
      );
    },
    [handleDragEnd, loadingState]
  );

  return (
    <PageWrapper>
      <RenderProductPage productData={renderProductData} />
    </PageWrapper>
  );
};

export default ProductsPage;
