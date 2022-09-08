import React from "react";
import TagStyle from "./tag.module.scss";

type Props = { text: string };

const Tag: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <span className={`${TagStyle.tag}`}>{text}</span>
    </div>
  );
};

export default Tag;
