import { useEffect, useState } from "react";
import { fetchPhotos } from "./gallery-api";

import css from "./App.module.css";

import ImageGallery from "./components/ImageGallery/ImageGallery";

export default function App() {
  const [imgs, setImgs] = useState([]);
  useEffect(() => {
    async function getPhotos() {
      const data = await fetchPhotos("cat", 1);
      setImgs(data);
    }
    getPhotos();
  }, []);
  return (
    <>
      <div className={css.container}>
        <h1 className={css.title}>Photo</h1>
        {imgs.length > 0 && <ImageGallery items={imgs} />}
      </div>
    </>
  );
}
