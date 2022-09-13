import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Categories } from "../../types";
import Utils from "../../styles/utils.module.scss";
import NavbarStyle from "./navbar.module.scss";
import Image from "next/image";
import cart from "../../public/black-empty-cart.svg";
import HamburguerMenu from "../HamburguerMenu/HamburguerMenu";
import Cart from "../Cart/Cart";
import { useDispatch, useSelector } from "react-redux";
import { toggleOverlay } from "../../lib/features/cart/cartSlice";
import { RootState } from "../../lib/app/store";
import useClickOutside from "../../hooks/useClickOutside";
import { Router, useRouter } from "next/router";

type Props = {
  categories: Categories;
};

const Navbar: React.FC<Props> = ({ categories }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { openOverlay } = useSelector((state: RootState) => state.cart);
  const hamburguerMenu = useRef<HTMLDivElement>(null);
  const nav = useRef<HTMLElement>(null);
  const cartButton = useRef<HTMLDivElement>(null);
  const cartElement = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (
        !hamburguerMenu.current?.contains(event.target) &&
        !nav.current?.contains(event.target)
      ) {
        console.log("hamburguer");
        setOpen(false);
      }
      if (
        !cartButton.current?.contains(event.target) &&
        !cartElement.current?.contains(event.target)
      ) {
        dispatch(toggleOverlay(false));
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [dispatch]);

  return (
    <header className={`${NavbarStyle.navbar} `}>
      <div className={`${Utils.container} ${NavbarStyle.relative}`}>
        <HamburguerMenu ref={hamburguerMenu} setOpen={setOpen} open={open} />
        <nav ref={nav}>
          <ul
            role="list"
            className={`${Utils.flexCenter} ${NavbarStyle.navigation} ${
              open && NavbarStyle.open
            }`}
          >
            {categories.map((category: string) => (
              <li key={category}>
                <Link href={`/${category}`}>
                  <a
                    className={`${Utils.uppercase} ${Utils.colorMedium} ${Utils.fsSmall} ${Utils.fw500} `}
                  >
                    {category}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div ref={cartButton}>
          <Image
            onClick={() => dispatch(toggleOverlay(!openOverlay))}
            src={cart}
            alt="Shopping Cart"
            height={28}
            width={28}
          />
        </div>
        <Cart ref={cartElement} />
      </div>
    </header>
  );
};

export default Navbar;
