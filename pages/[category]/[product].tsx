import { GetStaticPaths, GetStaticProps, NextPage } from "next";

import React from "react";

import { ParsedUrlQuery } from "querystring";

import Utils from "../../styles/utils.module.scss";

import { Categories, Product } from "../../types";
import Image from "next/image";

import Layout from "../../components/Layout/layout.module.scss";
import Tag from "../../components/Tag/Tag";

type Props = {
  categories: Categories;
  params: string;
  product: Product;
};

interface Params extends ParsedUrlQuery {
  product: string;
}

const Product: NextPage<Props> = ({
  product: { id, title, price, category, description, image },
  params,
}) => {
  console.log();
  return (
    <div
      className={`${Utils.container} ${Utils.gridAutoColumns} ${Utils.gap2}`}
    >
      <div className={`${Utils.imageContainer}`}>
        <Image src={image} alt="product" layout="fill" />
      </div>
      <div className={`${Layout.flow} ${Layout.flowSpaceLarge}`}>
        <h1 className={`${Utils.colorDark} ${Utils.fsXl} ${Utils.fw500}`}>
          {title}
        </h1>
        <p
          className={`${Utils.fw700} ${Utils.fsLarge} ${Utils.colorDark}`}
        >{`$${price}`}</p>
        {Number(price) >= 30 && <Tag text="FREE SHIPPING!" />}
        <p className={`${Utils.colorNeutralDark}`}>{description}</p>

        <button className={`${Utils.btnPrimary}`}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default Product;

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;

  const productResp = await fetch(
    `https://fakestoreapi.com/products/${params.product}`
  );
  const product = await productResp.json();

  //categories for the navbar
  const categoriesResp = await fetch(
    "https://fakestoreapi.com/products/categories"
  );
  const categories = await categoriesResp.json();

  return {
    props: { product, categories, params: params.product },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await fetch("https://fakestoreapi.com/products");
  const products = await resp.json();
  return {
    paths: products.map((product: Product) => ({
      params: {
        category: product.category,
        product: product.id.toString(),
      },
    })),
    fallback: false,
  };
};
