import React, { Dispatch, forwardRef, SetStateAction } from "react";
import HamburguerStyle from "./hamburguer-menu.module.scss";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const HamburguerMenu = forwardRef<HTMLDivElement, Props>(
  ({ open, setOpen }, ref) => {
    // const {open, setOpen} = props
    return (
      <div
        ref={ref}
        className={`${HamburguerStyle.hamburguerMenu} ${
          open && HamburguerStyle.open
        }`}
        onClick={() => setOpen(!open)}
      >
        <span />
      </div>
    );
  }
);
HamburguerMenu.displayName = "HamburguerMenu";

export default HamburguerMenu;
