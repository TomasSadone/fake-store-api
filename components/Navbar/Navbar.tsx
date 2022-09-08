import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Categories } from "../../types";
import Utils from "../../styles/utils.module.scss";
import NavbarStyle from "./navbar.module.scss";
import Image from "next/image";
import cart from "../../public/black-empty-cart.svg";
import HamburguerMenu from "../HamburguerMenu/HamburguerMenu";

type Props = {
  categories: Categories;
};

const Navbar: React.FC<Props> = ({ categories }) => {
  const [open, setOpen] = useState(false);

  return (
    <header className={`${NavbarStyle.navbar} `}>
      <div className={`${Utils.container}`}>
        <HamburguerMenu setOpen={setOpen} open={open} />
        <nav>
          <ul
            role="list"
            className={`${Utils.flexCenter} ${NavbarStyle.navigation} ${
              open && NavbarStyle.open
            }`}
          >
            {categories.map((item: string) => (
              <li key={item}>
                <Link href={`/${item}`}>
                  <a
                    className={`${Utils.uppercase} ${Utils.colorMedium} ${Utils.fsSmall} ${Utils.fw500}`}
                  >
                    {item}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Image src={cart} alt="Shopping Cart" height={28} width={28} />
      </div>
    </header>
  );
};

export default Navbar;
