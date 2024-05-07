import { HiDownload } from "react-icons/hi";
import css from "./LoadMoreBtn.module.css";

export default function LoadMoreBtn({ onClick }) {
  return (
    <div className={css.container}>
      <button className={css.loadBtn} onClick={onClick} type="button">
        <HiDownload size="18" />
        Load more
      </button>
    </div>
  );
}
