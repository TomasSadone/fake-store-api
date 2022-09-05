import Link from "next/link";
import React from "react";
import { Url } from "url";
import CategoryStyle from "./category-card.module.scss";
import Utils from "../../styles/utils.module.scss";

type Props = {
  category: string;
};

const CategoryCard: React.FC<Props> = ({ category }) => {
  return (
    <div
      className={`${CategoryStyle.categoryCard}
      ${Utils.placeContentCenter} 
      ${Utils.fw700} 
      ${Utils.fsXl}`}
      key={category}
    >
      <Link href={category}>
        <a href="">{category}</a>
      </Link>
    </div>
  );
};

export default CategoryCard;
