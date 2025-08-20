import PlusIcon from "../assets/plus-large-svgrepo-com.svg";
import MinusIcon from "../assets/minus-svgrepo-com.svg";
import { useState } from "react";

interface ProductProp {
  productName: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
}

export default function ItemCard({
  productName,
  productImage,
  productPrice,
  productQuantity,
}: ProductProp) {
  const [productQuantityState, setproductQuantity] = useState(productQuantity);
  return (
    <>
      <li className="list-row ">
        <div className="col-auto">
          <div>
            <img
              className="size-10 rounded-box"
              src="https://img.daisyui.com/images/profile/demo/1@94.webp"
            />
          </div>
          <div>
            <div>{productName}</div>
            <div className="text-xs uppercase font-semibold opacity-60">
              {productPrice}
            </div>
          </div>
          <button
            className="btn btn-square btn-ghost"
            onClick={() => {
              setproductQuantity(productQuantityState + 1);
            }}
          >
            <img src={PlusIcon} alt="Plus" className="size-[1.2em] invert" />
          </button>
          <div>{productQuantityState} U</div>
          <button
            className="btn btn-square btn-ghost"
            onClick={() =>
              setproductQuantity(Math.max(0, productQuantityState - 1))
            }
          >
            <img src={MinusIcon} alt="Minus" className="size-[1.2em] invert" />
          </button>
        </div>
      </li>
    </>
  );
}
