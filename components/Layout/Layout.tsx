import React from "react";
import { Categories } from "../../types";
import Navbar from "../Navbar/Navbar";
import styles from "./layout.module.scss";

type Props = {
  children: React.ReactNode;
  categories: Categories;
};

const Layout: React.FC<Props> = (props) => {
  const { children, categories } = props;
  return (
    <div className={styles.flow}>
      <Navbar categories={categories} />
      {children}
    </div>
  );
};
export default Layout;
