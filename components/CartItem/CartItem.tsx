import Image from "next/image";
import React from "react";
import { CartProduct } from "../../lib/features/cart/cartSlice";
import Utils from "../../styles/utils.module.scss";
import Styles from "./cartItem.module.scss";
import { addItem, removeItem } from "../../lib/features/cart/cartSlice";
import { useDispatch } from "react-redux";

type Props = {
  product: CartProduct;
  remove: (product: CartProduct) => void;
  add: (product: CartProduct) => void;
};

const CartItem: React.FC<Props> = ({ product, remove, add }) => {
  const { id, quantity, title, price, image } = product;
  const dispatch = useDispatch();

  const removeProduct = () => dispatch(removeItem(product));

  return (
    <div className={Styles.itemContainer}>
      <h2 className={`${Utils.fsLarge} ${Utils.fw500} ${Utils.colorDark}`}>
        {title}
      </h2>
      <div className={`${Styles.grid}`}>
        <div className={`${Styles.flex} `}>
          <p
            className={`${Utils.fsLarge} ${Utils.fw700}`}
          >{`$${product.price}`}</p>
          <div className={`${Styles.counter}`}>
            <button onClick={() => add(product)}>+</button>
            <p>{quantity}</p>
            <button onClick={() => remove(product)}>-</button>
          </div>
        </div>
        <div className={`${Utils.imageContainer} `}>
          <Image src={image} alt="product" layout="fill" />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
