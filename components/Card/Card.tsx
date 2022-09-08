import Link from "next/link";
import React, { useRef } from "react";
// import { Url } from "url";
import CardStyle from "./card.module.scss";
import Utils from "../../styles/utils.module.scss";
import Image from "next/image";
import { linkSync } from "fs";

type Props = {
  innerText: string;
  type: "category" | "product";
  image?: string;
  price?: string;
  category?: string;
  id: number | string;
};

const CategoryCard: React.FC<Props> = ({
  innerText,
  image,
  price,
  id,
  category,
  type,
}) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const handleCardClick = () => {
    linkRef.current?.click();
  };

  return (
    <div
      className={`${
        type === "product" ? CardStyle.productCard : CardStyle.categoryCard
      }`}
      key={innerText}
      onClick={handleCardClick}
    >
      {type === "product" && (
        <div className={Utils.imageContainer}>
          <Image src={image!} alt="product" layout="fill" />
        </div>
      )}
      <div>
        <Link href={`${type === "category" ? `/${id}` : `/${category}/${id}`}`}>
          <a
            ref={linkRef}
            className={`
            ${Utils.placeContentCenter} 
            ${type === "category" ? Utils.fw700 : Utils.fw500} 
            ${type === "category" ? Utils.fsXl : Utils.fsMedium}
            ${Utils.uppercase}
            `}
            href=""
          >
            {innerText}
          </a>
        </Link>
        {type === "product" && (
          <p className={`${Utils.fsLarge} ${Utils.fw700}`}>{`$${price}`}</p>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
