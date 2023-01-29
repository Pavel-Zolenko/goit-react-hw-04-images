import { useState, useEffect } from 'react';
import Searchbar from 'components/Searchbar';
import Loader from 'components/Loader';
import ImageGallery from 'components/ImageGallery';
import Button from 'components/Button';
import { fetchImages } from 'services/api';
import { ToastContainer } from 'react-toastify';

function App() {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [totalFound, setTotalFound] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [showLoader, setShowLoader] = useState(false);

 useEffect(() => {
    if (!query) {
      return;
    }
  setShowLoader(true);
    try {
      fetchImages(query, page).then(data => {
        if (!data.hits.length) {
          alert('No images found due to your search inquiry');
          setShowLoader(false);
        } else {
          
          setImages(prevState => {
            return [...prevState, ...data.hits];
          });
          setTotalFound(data.totalHits);
          setShowLoader(false);
          setScroll(document.documentElement.scrollHeight);
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, [page, query]);

  useEffect(() => {
    if (!scroll || page === 1) {
      return;
    }
    window.scrollBy({
      top: window.innerHeight - 240,
      behavior: 'smooth',
    });
  }, [page, scroll]);

  const searchQuery = newQuery => {
    if (newQuery.trim() !== query) {
      setPage(1)
      setQuery(newQuery.trim())
      setImages([])
    }
  };

 
  const loadMore = () => {
    setPage(prevPage => prevPage + 1,);
  };

  
    return (
      <>
        <Searchbar onSubmit={searchQuery} />
        <ToastContainer autoClose={3000} />
        <ImageGallery images={images} />
        {showLoader && <Loader />}
        {images.length > 0 && images.length < totalFound && (
          <Button loadMore={loadMore} />
        )}
      </>
    );
  }


export { App };