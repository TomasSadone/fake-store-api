import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/app/store";
import { Categories } from "../../types";
import Utils from "../../styles/utils.module.scss";
import NavbarStyle from "./navbar.module.scss";
import Image from "next/image";
import cart from "../../public/black-empty-cart.svg";
import HamburguerMenu from "../HamburguerMenu/HamburguerMenu";

// type Props = {};

const Navbar = () => {
  const navbarItems = useSelector((state: RootState) => state.navbar.value);
  const [categories, setCategories] = useState<Categories>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setCategories(navbarItems);
  }, [navbarItems]);

  return (
    <header>
      <div className={`${NavbarStyle.navbar} ${Utils.container}`}>
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
                <Link href={item}>
                  <a
                    className={`${Utils.colorAccent1} ${Utils.fsSmall} ${Utils.fw500}`}
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
