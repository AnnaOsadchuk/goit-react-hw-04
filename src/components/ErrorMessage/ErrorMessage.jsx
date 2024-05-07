import css from "./ErrorMessage.module.css";

export default function ErrorMassage() {
  return (
    <div className={css.containerErr}>
      <p>Whoops, something went wrong! Please try reloading this page!</p>
    </div>
  );
}
