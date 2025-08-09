import { useState, useEffect } from "react";
import { fetchImages } from "./services/unsplash-api.js";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import ImageGallery from "./components/ImageGallery/ImageGallery.jsx";
import ImageModal from "./components/ImageModal/ImageModal.jsx";
import Loader from "./components/Loader/Loader.jsx";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage.jsx";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    if (!query) return;

    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchImages(query, page);
        const hits = data.results || [];
        setTotalPages(data.total_pages || 0);

        setImages((prev) => (page === 1 ? hits : [...prev, ...hits]));
      } catch {
        setError("Görseller alınamadı.");
        if (page === 1) setImages([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [query, page, retryTick]);

  const handleSearch = (q) => {
    if (!q) return;
    setQuery(q);
    setPage(1);
  };

  const handleLoadMore = () => setPage((p) => p + 1);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const canLoadMore = images.length > 0 && page < totalPages && !loading;

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <div style={{ padding: 16 }}>
        {loading && <Loader />}

        {error && (
          <ErrorMessage
            message={error}
            onRetry={() => {
              setError("");
              setImages([]);
              setRetryTick((t) => t + 1);
            }}
          />
        )}

        {images.length === 0 && !loading && !error && <p>Sonuç bulunamadı.</p>}

        <ImageGallery images={images} onImageClick={handleImageClick} />

        {canLoadMore && (
          <LoadMoreBtn onClick={handleLoadMore} disabled={loading} />
        )}
      </div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        image={selectedImage}
      />
    </>
  );
}

export default App;
