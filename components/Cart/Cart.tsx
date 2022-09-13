import Image from "next/image";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/app/store";
import { CartProduct } from "../../lib/features/cart/cartSlice";
import Utils from "../../styles/utils.module.scss";
import CartItem from "../CartItem/CartItem";
import CartStyle from "./cart.module.scss";
import { useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  removeProduct,
} from "../../lib/features/cart/cartSlice";

// type Props = {}

const Cart: React.FC = () => {
  const store = useSelector((state: RootState) => state.cart);
  const { products, openOverlay } = store;
  const dispatch = useDispatch();

  const remove = (product: CartProduct) => {
    if (product.quantity === 1) return dispatch(removeProduct(product));
    return dispatch(removeItem(product));
  };
  const add = (product: CartProduct) => dispatch(addItem(product));

  const total = products.reduce((currentTotal: any, item: any) => {
    return Number(item.price) * item.quantity + currentTotal;
  }, 0);
  const roundTotal = () => Math.ceil(total * 100) / 100;

  const totalPrice = () => {};

  return (
    <>
      {products.length === 0 ? (
        <div
          className={`${CartStyle.cart} ${openOverlay && CartStyle.open} ${
            CartStyle.noProducts
          }`}
        >
          <h1 className={`${Utils.colorDark} ${Utils.fw400}`}>
            Nothing to see here
          </h1>
        </div>
      ) : (
        <div className={`${CartStyle.cart}  ${openOverlay && CartStyle.open} `}>
          {products.map((product) => {
            const { id, quantity, title, price, image } = product;
            return (
              <CartItem key={id} product={product} add={add} remove={remove} />
            );
          })}
          <div className={`${Utils.fsLarge} ${Utils.colorDark}`}>
            <span className={``}>TOTAL</span>{" "}
            <span className={` ${Utils.fw700} `}>{`$${roundTotal()}`}</span>
          </div>
        </div>
      )}
    </>
  );
};
export default Cart;
