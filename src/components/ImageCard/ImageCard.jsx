import css from "./ImageCard.module.css";
import { SiFacebook } from "react-icons/si";
import { FaUserAlt } from "react-icons/fa";

export default function ImageCard({
  item: {
    alt_description,
    urls: { small, regular },
    likes,
    user: { name },
  },
  onImgClick,
}) {
  return (
    <div
      className={css.container}
      onClick={() => onImgClick(regular, likes, name)}
    >
      <div className={css.imgWrapper}>
        <img className={css.img} src={small} alt={alt_description} />
      </div>
      <div className={css.textWrapper}>
        <SiFacebook className={css.faseBook} size="20" />
        <ul className={css.list}>
          <li className={css.item}>
            <FaUserAlt className={css.srcMan} size="14" />
            <p className={css.text}>{name}</p>
          </li>
          <li className={css.item}>
            <p className={css.text}>{likes}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
