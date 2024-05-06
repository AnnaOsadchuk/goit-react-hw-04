import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = form.elements.searchImg.value;
    if (data.trim() === "") {
      toast.error("Please, enter your request!");
      return;
    }
    onSubmit(data.trim());
    form.reset();
  };

  return (
    <header className={css.container}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          name="searchImg"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button className={css.btn}>Load more</button>
      </form>
    </header>
  );
}
