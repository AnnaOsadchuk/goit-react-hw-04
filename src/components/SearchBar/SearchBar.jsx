import toast, { Toaster } from "react-hot-toast";
import { Formik, Form, Field } from "formik";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  const handleSubmit = (values, actions) => {
    if (!values.queryImg) {
      toast.error("Please, enter your request!");
    } else {
      onSearch(values.queryImg);
      actions.resetForm();
    }
  };
  return (
    <header className={css.container}>
      <Formik initialValues={{ queryImg: "" }} onSubmit={handleSubmit}>
        <Form className={css.form}>
          <Field
            className={css.input}
            type="text"
            name="queryImg"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.btn} type="submit">
            Search
          </button>
          <Toaster />
        </Form>
      </Formik>
    </header>
  );
}
