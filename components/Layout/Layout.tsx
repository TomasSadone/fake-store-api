import React from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./layout.module.scss";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.flow}>
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
