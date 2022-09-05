import React, { Dispatch, SetStateAction } from "react";
import HamburguerStyle from "./hamburguer-menu.module.scss";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const HamburguerMenu: React.FC<Props> = ({ open, setOpen }) => {
  return (
    <div
      className={`${HamburguerStyle.hamburguerMenu} ${
        open && HamburguerStyle.open
      }`}
      onClick={() => setOpen(!open)}
    >
      <span />
    </div>
  );
};

export default HamburguerMenu;
