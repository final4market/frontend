import React from 'react';
import styles from './css/ModalPopupForm.module.css';

const ModalPopupForm = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalPopupFormOverlay} onClick={onClose}>
      <div className={styles.modalPopupFormContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalPopupForm;