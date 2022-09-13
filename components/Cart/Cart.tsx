import Image from "next/image";
import React, { forwardRef, useState } from "react";
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

const Cart = forwardRef<HTMLDivElement>((props: any, ref) => {
  const store = useSelector((state: RootState) => state.cart);
  const { products, openOverlay } = store;
  const dispatch = useDispatch();

  const remove = (product: CartProduct) => {
    if (product.quantity === 1) return dispatch(removeProduct(product));
    return dispatch(removeItem(product));
  };
  const add = (product: CartProduct) => dispatch(addItem(product));

  let total = 0;
  for (let i = 0; i < products.length; i++) {
    total = total + products[i].quantity * Number(products[i].price);
  }
  const roundTotal = () => Math.ceil(total * 100) / 100;

  return (
    <>
      {products.length === 0 ? (
        <div
          ref={ref}
          className={`${CartStyle.cart} ${openOverlay && CartStyle.open} ${
            CartStyle.noProducts
          }`}
        >
          <h1 className={`${Utils.colorDark} ${Utils.fw400}`}>
            Nothing to see here
          </h1>
        </div>
      ) : (
        <div
          ref={ref}
          className={`${CartStyle.cart}  ${openOverlay && CartStyle.open} `}
        >
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
});

Cart.displayName = "Cart";

export default Cart;
