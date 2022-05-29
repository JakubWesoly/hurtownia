import React, { useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

const Modal = ({ show, changeVisibility, children }) => {
  useEffect(() => {
    const fn = function (e) {
      if (e.key === 'Escape') changeVisibility(false);
    };
    document.addEventListener('keydown', fn, false);
    return () => {
      document.removeEventListener('keydown', fn, false);
    };
  }, [changeVisibility]);

  useEffect(() => {
    document.body.style.overflow = show ? 'hidden' : 'auto';
    if (show) window.scrollTo({ top: 0 });
  }, [show]);

  return (
    <>
      {show && (
        <>
          <div className='login-modal'>
            <AiOutlineClose
              class='login-modal-close'
              onClick={() => changeVisibility(false)}
            />
            {children}
          </div>
          <div
            className='login-modal-shadow'
            onClick={() => changeVisibility(false)}
          />
        </>
      )}
    </>
  );
};

export default Modal;
