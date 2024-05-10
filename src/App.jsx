import { useState, useEffect } from "react";
import { fetchPhotos } from "./gallery-api";

import css from "./App.module.css";

import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import NotFoundError from "./components/NotFoundError/NotFoundError";

export default function App() {
  const [imgs, setImgs] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState(false);
  const [imgUrl, setImgsUrl] = useState([]);
  const [notFoundError, setNotFoundError] = useState(false);
  const [likes, setLikes] = useState(null);
  const [userName, setUserName] = useState(null);

  const handleSearch = async (newQuery) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImgs([]);
      setLoading(true);
      setError(false);
      setNotFoundError(false);

      try {
        const data = await fetchPhotos(newQuery, 1);
        if (data.length === 0) {
          setNotFoundError(true);
        }
        setImgs(data);
      } catch (error) {
        setError(true);
        setImgs([]);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!query) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(false);
      setNotFoundError(false);

      try {
        const newImgs = await fetchPhotos(query, page);
        if (newImgs.length === 0) {
          setNotFoundError(true);
        } else {
          setImgs((prevImgs) => [...prevImgs, ...newImgs]);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (page > 1) fetchImages();
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const openModal = (url, like, nameUser) => {
    setImgsUrl(url);
    setLikes(like);
    setUserName(nameUser);
    toggle();
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      <div className={css.container}>
        <SearchBar onSearch={handleSearch} />
        {imgs.length > 0 && (
          <ImageGallery items={imgs} onImgClick={openModal} />
        )}
        {notFoundError && <NotFoundError />}
        {error && <ErrorMessage />}

        {loading && <Loader />}
        {imgs.length > 0 && !loading && (
          <LoadMoreBtn onClick={handleLoadMore} />
        )}
        {modal && (
          <ImageModal
            image={imgUrl}
            imgModal={modal}
            item={imgs}
            onModalClose={toggle}
            imgLikes={likes}
            user={userName}
          />
        )}
      </div>
    </>
  );
}
