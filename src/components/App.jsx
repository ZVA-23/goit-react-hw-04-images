import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import { fetchApi } from 'utils/fetchApi';
import { SearchBar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [images, setImages] = useState([]);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  useEffect(() => {
     if (!name) {
      return;
    }
     if (page !== 1) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
    setIsLoading(true);
    fetchApi(name, page)
      .then(imagesData => {
        setImages(prevImages => [
          ...prevImages,
          ...imagesData.data.hits,
        ]);
        setTotal(imagesData.data.total);
        if (!imagesData.data.hits.length) {
        Notiflix.Notify.failure('No images found!');
      }
      })
      .catch(error => {
        error = Notiflix.Notify.failure('No images found!');;
      })
      .finally(() => setIsLoading(false));
  }, [name, page])

    
    const handleImageSubmit = name => {
      setName(name);
      setPage(1);
      setImages([]);
      setPerPage(12);
    };

    const handleLoadMore = () => {
      setPage(prevPage => prevPage + 1);
    };

    const openModal = data => {
      setCurrentImage(data);
    }
    
    const closeModal = () => {
      setCurrentImage(null);
    }
return (
      <>
        <SearchBar onSubmit={handleImageSubmit} />
        {isLoading && <Loader />}
        {name && (<ImageGallery images={images} openModal={openModal} />)}
        {Math.ceil(total / page) > perPage &&
          <Button onLoadMore={handleLoadMore} />}
        {currentImage &&
          <Modal src={currentImage} closeModal={closeModal} />}           
      </>
  )
}


