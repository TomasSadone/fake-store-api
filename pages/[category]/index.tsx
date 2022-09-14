import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import CategoryCard from "../../components/Card/Card";
import Utils from "../../styles/utils.module.scss";
import { Categories, Product } from "../../types";

type Props = {
  products: Product[];
  categories: Categories;
  params: string;
};

interface Params extends ParsedUrlQuery {
  category: string;
}

const Category: NextPage<Props> = ({ products, params }) => {
  return (
    <div className={`${Utils.container}`}>
      <h1 className={`${Utils.uppercase}`}>{params}</h1>
      <div className={`${Utils.gridAutoColumns} ${Utils.gap1} ${Utils.mt25}`}>
        {products.map((product) => {
          const { image, id, title, price, category } = product;
          return (
            <CategoryCard
              type="product"
              category={category}
              image={image}
              key={id}
              innerText={title}
              price={price}
              id={id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;

export const getStaticProps: GetStaticProps<Props, Params> = async (
  context
) => {
  const params = context.params!;

  const productsResp = await fetch(
    `https://fakestoreapi.com/products/category/${params.category}`
  );
  const products = await productsResp.json();

  //categories for the navbar
  const categoriesResp = await fetch(
    "https://fakestoreapi.com/products/categories"
  );
  const categories = await categoriesResp.json();

  return {
    props: { products, categories, params: params.category },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const resp = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await resp.json();
  return {
    paths: categories?.map((category: string) => ({
      params: { category: category },
    })),
    fallback: false,
  };
};
