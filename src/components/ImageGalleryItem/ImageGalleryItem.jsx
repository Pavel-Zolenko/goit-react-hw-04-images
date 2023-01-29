import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal';

export default function ImageGalleryItem({ image }) {
  const[showModal, setShowModal] = useState(false)
 
  const toggleModal = () => {
    setShowModal(!showModal)
  };

    return (
      <>
        <img
          src={image.webformatURL}
          alt={image.tags}
          className={css.item__img}
          onClick={toggleModal}
        />

        {showModal && (
          <Modal onClose={toggleModal}>
            <img src={image.largeImageURL} alt={image.tags} />
          </Modal>
        )}
      </>
    );
  
}


ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }).isRequired,
};