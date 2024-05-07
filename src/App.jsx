import { useState } from "react";
import { fetchPhotos } from "./gallery-api";

import css from "./App.module.css";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";

export default function App() {
  const [imgs, setImgs] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (newImg) => {
    setQuery(newImg);
    setPage(1);
    setImgs([]);
    try {
      setLoading(true);
      setError(false);
      const data = await fetchPhotos(newImg, 1);
      setImgs(data);
    } catch (error) {
      setError(true);
      setImgs([]); // Очистити зображення, якщо виникає помилка
    } finally {
      setLoading(false);
    }
  };
  const handleLoadMore = async () => {
    try {
      setLoading(true);
      const newPage = page + 1;
      const newImages = await fetchPhotos(query, newPage);
      setImgs((prevImgs) => [...prevImgs, ...newImages]);
      setPage(newPage);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className={css.container}>
        <SearchBar onSearch={handleSearch} />
        {error && <ErrorMessage />}
        {imgs.length > 0 && <ImageGallery items={imgs} />}
        {loading && <Loader />}
        {imgs.length > 0 && !loading && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
      </div>
    </>
  );
}
