import {
  faSquareCheck,
  faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Order } from "../interfaces";

export interface OrderCardProps extends Order {
  processItem: () => void;
}
const OrderCard = ({
  OrderID,
  CustomerID,
  ProductID,
  OrderStatus,
  processItem,
}: OrderCardProps) => {
  return (
    <div className="bg-neutral-300 flex flex-row items-center justify-between mt-1 p-3 rounded w-full">
      <span data-testid={`draggable-customerID-${OrderID}`}>{CustomerID}</span>
      <span data-testid={`draggable-productID-${OrderID}`}>{ProductID}</span>
      <button onClick={processItem}>
        <FontAwesomeIcon
          icon={OrderStatus === "QA" ? faSquareCheck : faSquareXmark}
          className={`${
            OrderStatus === "QA" ? "text-green-600" : "text-red-600"
          } fa-lg`}
          data-testid={`draggable-btn-${OrderID}`}
        />
      </button>
    </div>
  );
};

export default OrderCard;
