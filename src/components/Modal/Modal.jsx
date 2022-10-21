import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';


export const Modal = ({ src, alt, closeModal }) => {
useEffect(() => {
const closeByEscape = ({ code }) => {
    if (code === 'Escape') {
        closeModal();
    }
}
window.addEventListener('keydown', closeByEscape);

return () => {
window.removeEventListener('keydown', closeByEscape);
}}, [closeModal]) 
    
const closeByBackdrop = evt => {
    if (evt.currentTarget === evt.target) {
        closeModal();
        }
    };

return (
    <div className={css.overlay} onClick={closeByBackdrop}>
        <div className={css.modal}>
            <img src={src} alt={alt} />
        </div>
    </div>
)
}


Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
};
