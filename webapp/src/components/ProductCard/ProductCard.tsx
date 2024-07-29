import React from "react";
type ProductProps = {
  name: string;
  id: number;
  imageUrl: string;
  loading: boolean;
};

const ProductCard: React.FC<ProductProps> = ({
  name,
  id,
  imageUrl,
  loading,
}) => {
  if (loading) {
    return <ProductCardSkeleton />;
  }
  return (
    <div className="flex">
      <div className="bg-white flex items-center min-h-[24rem] justify-center rounded-lg p-2 m-1 w-full shadow-md overflow-hidden">
        <img
          data-testid={`draggable-product-image`}
          src={imageUrl}
          alt={name}
          className={`w-96  object-cover`}
        />

        {/* <img src={imageUrl} alt={name} className="w-96  object-cover" /> */}
        <div className="p-10 flex flex-col items-center justify-between">
          <h1
            data-testid={`draggable-product-header`}
            className="text-xl font-extrabold text-gray-800"
          >
            {name}
          </h1>
          <p
            data-testid={`draggable-product-id-${id}`}
            className="text-lg text-gray-600"
          >
            ID: {id}
          </p>
        </div>
      </div>
    </div>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="flex" data-testid={`draggable-product-skeleton`}>
      <div className="bg-white h-96 flex items-center justify-center rounded-lg p-2 m-1 shadow-md overflow-hidden animate-pulse w-full">
        <div className="w-96 h-64 bg-gray-300"></div>
        <div className="p-4">
          <div className="p-5 w-24 flex flex-col items-center justify-between h-1 bg-gray-300 rounded mb-2"></div>
          <div className="p-4 h-1 w-16 bg-gray-300 mx-auto rounded"></div>
        </div>
      </div>
    </div>
  );
};
export const ProductCardError = () => {
  return (
    <div
      className="flex flex-row justify-center w-full pt-4 text-3xl font-bold text-white"
      data-testid="error-container"
    >
      An error occured fetching the data!
    </div>
  );
};

export default ProductCard;
