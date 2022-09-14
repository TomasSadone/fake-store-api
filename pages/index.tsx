import type { NextPage, GetStaticProps } from "next";
import Link from "next/link";
import { useDispatch } from "react-redux";
import CategoryCard from "../components/Card/Card";
import Utils from "../styles/utils.module.scss";

type Props = {
  categories: string[];
};

const Home: NextPage<Props> = ({ categories }) => {
  return (
    <main className={`${Utils.container}`}>
      <h1 className={`${Utils.fontSizeXxl} ${Utils.fw700}`}>Categories:</h1>
      <div className={`${Utils.gridAutoColumns} ${Utils.gap1} ${Utils.mt25}`}>
        {categories?.map((category) => {
          return (
            <CategoryCard
              type="category"
              id={category}
              key={category}
              innerText={category}
            />
          );
        })}
      </div>
    </main>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const resp = await fetch("https://fakestoreapi.com/products/categories");
  const categories = await resp.json();
  return {
    props: { categories },
  };
};

export default Home;
