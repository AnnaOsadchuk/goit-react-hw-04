import { useEffect, useState } from "react";
import { fetchPhotos } from "./gallery-api";

import css from "./App.module.css";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";

export default function App() {
  const [imgs, setImgs] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <SearchBar />
        {imgs.length > 0 && <ImageGallery items={imgs} />}
        {loading && <Loader />}
      </div>
    </>
  );
}
